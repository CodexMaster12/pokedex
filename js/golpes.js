import {
    traduzirTipo
} from "./tipos.js";


// =========================
// CONFIGURAÇÃO
// =========================

// Mantemos Red/Blue como referência
// para os Pokémon normais de Kanto.
const VERSAO_KANTO =
    "red-blue";


// Ordem de preferência usada
// quando uma forma não existe em Red/Blue.
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


// Quantidade máxima de golpes
// exibidos no modal.
const LIMITE_GOLPES =
    8;


// =========================
// CACHE DOS GOLPES
// =========================

// Golpes já carregados.
const CACHE_GOLPES =
    new Map();


// Requisições ainda em andamento.
//
// Evita dois fetches simultâneos
// para o mesmo golpe.
const REQUISICOES_GOLPES =
    new Map();


// =========================
// BUSCA DE GOLPES
// =========================

async function buscarDetalhesGolpe(
    url
) {
    if (!url) {
        throw new Error(
            "URL do golpe não informada."
        );
    }


    // =========================
    // CACHE
    // =========================

    if (
        CACHE_GOLPES.has(
            url
        )
    ) {
        return CACHE_GOLPES.get(
            url
        );
    }


    // =========================
    // REQUISIÇÃO EM ANDAMENTO
    // =========================

    if (
        REQUISICOES_GOLPES.has(
            url
        )
    ) {
        return await REQUISICOES_GOLPES.get(
            url
        );
    }


    // =========================
    // NOVA REQUISIÇÃO
    // =========================

    const requisicao =
        (async () => {
            const resposta =
                await fetch(
                    url
                );


            if (!resposta.ok) {
                throw new Error(
                    `Erro ao buscar golpe: ${resposta.status} ${resposta.statusText}`
                );
            }


            return await resposta.json();
        })();


    REQUISICOES_GOLPES.set(
        url,
        requisicao
    );


    try {
        const dados =
            await requisicao;


        CACHE_GOLPES.set(
            url,
            dados
        );


        return dados;


    } finally {
        REQUISICOES_GOLPES.delete(
            url
        );
    }
}


// =========================
// NOME DO GOLPE
// =========================

function obterNomeGolpe(
    golpe
) {
    if (
        !Array.isArray(
            golpe?.names
        )
    ) {
        return (
            golpe?.name ||
            "Golpe desconhecido"
        );
    }


    const nomePortugues =
        golpe.names.find(
            (nome) => {
                return (
                    nome?.language?.name ===
                        "pt-BR" ||
                    nome?.language?.name ===
                        "pt"
                );
            }
        );


    if (nomePortugues) {
        return nomePortugues.name;
    }


    const nomeIngles =
        golpe.names.find(
            (nome) => {
                return (
                    nome?.language?.name ===
                    "en"
                );
            }
        );


    return (
        nomeIngles?.name ||
        golpe.name ||
        "Golpe desconhecido"
    );
}


// =========================
// MOVIMENTOS DO POKÉMON
// =========================

function obterMovimentosPokemon(
    pokemon
) {
    return Array.isArray(
        pokemon?.moves
    )
        ? pokemon.moves
        : [];
}


// =========================
// VERSÕES DOS GOLPES
// =========================

function pokemonPossuiVersao(
    pokemon,
    versao
) {
    const movimentos =
        obterMovimentosPokemon(
            pokemon
        );


    return movimentos.some(
        (item) => {
            const detalhes =
                Array.isArray(
                    item?.version_group_details
                )
                    ? item.version_group_details
                    : [];


            return detalhes.some(
                (detalhe) => {
                    return (
                        detalhe
                            ?.version_group
                            ?.name ===
                            versao &&
                        detalhe
                            ?.move_learn_method
                            ?.name ===
                            "level-up"
                    );
                }
            );
        }
    );
}


// Procura automaticamente uma versão
// que possua golpes aprendidos por nível.
function encontrarVersaoDisponivel(
    pokemon
) {
    const movimentos =
        obterMovimentosPokemon(
            pokemon
        );


    const versoesDisponiveis =
        new Set();


    movimentos.forEach(
        (item) => {
            const detalhes =
                Array.isArray(
                    item?.version_group_details
                )
                    ? item.version_group_details
                    : [];


            detalhes.forEach(
                (detalhe) => {
                    if (
                        detalhe
                            ?.move_learn_method
                            ?.name ===
                        "level-up"
                    ) {
                        const versao =
                            detalhe
                                ?.version_group
                                ?.name;


                        if (versao) {
                            versoesDisponiveis.add(
                                versao
                            );
                        }
                    }
                }
            );
        }
    );


    return (
        PRIORIDADE_VERSOES.find(
            (versao) => {
                return versoesDisponiveis.has(
                    versao
                );
            }
        ) ||
        null
    );
}


// Escolhe a versão usada para consultar
// os golpes do Pokémon.
function obterVersaoGolpes(
    pokemon,
    usarVersaoKanto
) {
    if (
        usarVersaoKanto &&
        pokemonPossuiVersao(
            pokemon,
            VERSAO_KANTO
        )
    ) {
        return VERSAO_KANTO;
    }


    return encontrarVersaoDisponivel(
        pokemon
    );
}


// =========================
// GOLPES POR NÍVEL
// =========================

function extrairGolpesPorNivel(
    pokemon,
    versaoSelecionada
) {
    const movimentos =
        obterMovimentosPokemon(
            pokemon
        );


    return movimentos
        .map(
            (item) => {
                const detalhes =
                    Array.isArray(
                        item?.version_group_details
                    )
                        ? item.version_group_details
                        : [];


                const detalheVersao =
                    detalhes.find(
                        (detalhe) => {
                            return (
                                detalhe
                                    ?.version_group
                                    ?.name ===
                                    versaoSelecionada &&
                                detalhe
                                    ?.move_learn_method
                                    ?.name ===
                                    "level-up"
                            );
                        }
                    );


                if (
                    !detalheVersao ||
                    !item?.move?.url
                ) {
                    return null;
                }


                return {
                    url:
                        item.move.url,

                    nivel:
                        Number(
                            detalheVersao
                                .level_learned_at
                        ) || 0
                };
            }
        )
        .filter(Boolean)
        .sort(
            (a, b) => {
                return (
                    a.nivel -
                    b.nivel
                );
            }
        )
        .slice(
            0,
            LIMITE_GOLPES
        );
}


// =========================
// DETALHA UM GOLPE
// =========================

async function carregarGolpeDetalhado(
    golpe
) {
    try {
        const detalhes =
            await buscarDetalhesGolpe(
                golpe.url
            );


        const tipo =
            detalhes?.type?.name;


        if (!tipo) {
            return null;
        }


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


    } catch (erro) {

        /*
            Uma falha isolada não deve
            impedir os outros golpes de
            aparecerem no modal.
        */
        console.warn(
            `Não foi possível carregar o golpe ${golpe.url}.`,
            erro
        );


        return null;
    }
}


// =========================
// GOLPES PRINCIPAIS
// =========================

// usarVersaoKanto:
//
// true  -> tenta Red/Blue primeiro
//
// false -> escolhe uma versão compatível
//          com a forma do Pokémon.
export async function buscarGolpesPrincipais(
    pokemon,
    usarVersaoKanto = true
) {
    const movimentos =
        obterMovimentosPokemon(
            pokemon
        );


    if (
        movimentos.length === 0
    ) {
        return [];
    }


    const versaoSelecionada =
        obterVersaoGolpes(
            pokemon,
            usarVersaoKanto
        );


    if (!versaoSelecionada) {
        return [];
    }


    const golpesPorNivel =
        extrairGolpesPorNivel(
            pokemon,
            versaoSelecionada
        );


    if (
        golpesPorNivel.length === 0
    ) {
        return [];
    }


    const golpesDetalhados =
        await Promise.all(
            golpesPorNivel.map(
                carregarGolpeDetalhado
            )
        );


    return golpesDetalhados.filter(
        Boolean
    );
}


// =========================
// HTML DOS GOLPES
// =========================

// Cria o conteúdo visual
// da lista de golpes.
export function criarListaGolpes(
    golpes
) {
    if (
        !Array.isArray(golpes) ||
        golpes.length === 0
    ) {
        return `
            <p class="sem-golpes">
                Nenhum golpe por nível encontrado.
            </p>
        `;
    }


    return golpes
        .map(
            (golpe) => `
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
            `
        )
        .join("");
}