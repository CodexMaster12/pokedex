import {
    traduzirTipo
} from "./tipos.js";


// =========================
// CONFIGURAÇÃO
// =========================

// Mantemos Red/Blue como referência
// para os Pokémon normais de Kanto
const VERSAO_KANTO = "red-blue";


// Ordem de preferência usada
// quando uma forma não existe em Red/Blue
const PRIORIDADE_VERSOES = [
    "scarlet-violet",
    "legends-arceus",
    "sword-shield",
    "ultra-sun-ultra-moon",
    "sun-moon",
    "omega-ruby-alpha-sapphire",
    "x-y",
    "black-2-white-2",
    "black-white",
    "heartgold-soulsilver",
    "platinum",
    "diamond-pearl",
    "firered-leafgreen",
    "emerald",
    "ruby-sapphire",
    "crystal",
    "gold-silver",
    "yellow",
    "red-blue"
];


// =========================
// BUSCA DE GOLPES
// =========================

async function buscarDetalhesGolpe(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(
            `Erro ao buscar golpe: ${resposta.status} ${resposta.statusText}`
        );
    }

    return await resposta.json();
}


// =========================
// NOME DO GOLPE
// =========================

function obterNomeGolpe(golpe) {
    const nomePortugues =
        golpe.names.find((nome) => {
            return (
                nome.language.name === "pt-BR" ||
                nome.language.name === "pt"
            );
        });


    if (nomePortugues) {
        return nomePortugues.name;
    }


    const nomeIngles =
        golpe.names.find((nome) => {
            return nome.language.name === "en";
        });


    return nomeIngles
        ? nomeIngles.name
        : golpe.name;
}


// =========================
// VERSÃO DOS GOLPES
// =========================

// Procura automaticamente uma versão
// que possua golpes por nível
function encontrarVersaoDisponivel(pokemon) {
    const versoesDisponiveis = new Set();


    pokemon.moves.forEach((item) => {

        item.version_group_details.forEach((detalhe) => {

            if (
                detalhe.move_learn_method.name === "level-up"
            ) {
                versoesDisponiveis.add(
                    detalhe.version_group.name
                );
            }

        });
    });


    return PRIORIDADE_VERSOES.find((versao) => {
        return versoesDisponiveis.has(versao);
    }) || null;
}


// =========================
// GOLPES PRINCIPAIS
// =========================

// usarVersaoKanto:
// true  -> tenta Red/Blue primeiro
// false -> escolhe versão compatível com a forma
export async function buscarGolpesPrincipais(
    pokemon,
    usarVersaoKanto = true
) {
    let versaoSelecionada = null;


    // Pokémon normal de Kanto
    if (usarVersaoKanto) {
        const possuiRedBlue =
            pokemon.moves.some((item) => {
                return item.version_group_details.some((detalhe) => {
                    return (
                        detalhe.version_group.name === VERSAO_KANTO &&
                        detalhe.move_learn_method.name === "level-up"
                    );
                });
            });


        if (possuiRedBlue) {
            versaoSelecionada =
                VERSAO_KANTO;
        }
    }


    // Caso Red/Blue não esteja disponível,
    // procura automaticamente outra versão
    if (!versaoSelecionada) {
        versaoSelecionada =
            encontrarVersaoDisponivel(
                pokemon
            );
    }


    // Nenhuma versão compatível
    if (!versaoSelecionada) {
        return [];
    }


    // Seleciona golpes aprendidos por nível
    const golpesPorNivel =
        pokemon.moves
            .map((item) => {

                const detalheVersao =
                    item.version_group_details.find((detalhe) => {
                        return (
                            detalhe.version_group.name === versaoSelecionada &&
                            detalhe.move_learn_method.name === "level-up"
                        );
                    });


                if (!detalheVersao) {
                    return null;
                }


                return {
                    url: item.move.url,

                    nivel:
                        detalheVersao.level_learned_at
                };
            })
            .filter((golpe) => {
                return golpe !== null;
            })
            .sort((a, b) => {
                return a.nivel - b.nivel;
            })
            .slice(0, 8);


    // Busca tipo, poder, precisão e nome
    const golpesDetalhados =
        await Promise.all(
            golpesPorNivel.map(async (golpe) => {

                const detalhes =
                    await buscarDetalhesGolpe(
                        golpe.url
                    );


                const tipo =
                    detalhes.type.name;


                return {
                    nome:
                        obterNomeGolpe(
                            detalhes
                        ),

                    tipo,

                    tipoTraduzido:
                        traduzirTipo(
                            tipo
                        ),

                    nivel:
                        golpe.nivel,

                    poder:
                        detalhes.power,

                    precisao:
                        detalhes.accuracy
                };
            })
        );


    return golpesDetalhados;
}


// =========================
// HTML DOS GOLPES
// =========================

// Cria o conteúdo visual da lista de golpes
export function criarListaGolpes(golpes) {

    if (golpes.length === 0) {
        return `
            <p class="sem-golpes">
                Nenhum golpe por nível encontrado.
            </p>
        `;
    }


    return golpes.map((golpe) => `
        <div class="golpe-item">

            <div class="golpe-cabecalho">

                <span class="tipo ${golpe.tipo}">
                    ${golpe.tipoTraduzido}
                </span>

                <span class="nome-golpe">
                    ${golpe.nome}
                </span>

            </div>


            <div class="golpe-detalhes">

                <span>
                    ${
                        golpe.nivel === 0
                            ? "Inicial"
                            : `Nv. ${golpe.nivel}`
                    }
                </span>


                <span>
                    Poder:

                    <strong>
                        ${golpe.poder ?? "—"}
                    </strong>
                </span>


                <span>
                    Precisão:

                    <strong>
                        ${golpe.precisao ?? "—"}
                    </strong>
                </span>

            </div>

        </div>
    `).join("");
}