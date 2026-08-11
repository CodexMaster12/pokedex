import {
    traduzirTipo
} from "./tipos.js";


// =========================
// CONFIGURAÇÃO
// =========================

const VERSAO_KANTO = "red-blue";


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


function obterNomeGolpe(golpe) {
    const nomePortugues = golpe.names.find((nome) => {
        return (
            nome.language.name === "pt-BR" ||
            nome.language.name === "pt"
        );
    });

    if (nomePortugues) {
        return nomePortugues.name;
    }

    const nomeIngles = golpe.names.find((nome) => {
        return nome.language.name === "en";
    });

    return nomeIngles
        ? nomeIngles.name
        : golpe.name;
}


// =========================
// GOLPES PRINCIPAIS
// =========================

export async function buscarGolpesPrincipais(pokemon) {
    const golpesPorNivel = pokemon.moves
        .map((item) => {
            const detalheKanto =
                item.version_group_details.find((detalhe) => {
                    return (
                        detalhe.version_group.name === VERSAO_KANTO &&
                        detalhe.move_learn_method.name === "level-up"
                    );
                });

            if (!detalheKanto) {
                return null;
            }

            return {
                url: item.move.url,
                nivel: detalheKanto.level_learned_at
            };
        })
        .filter((golpe) => golpe !== null)
        .sort((a, b) => a.nivel - b.nivel)
        .slice(0, 8);


    const golpesDetalhados = await Promise.all(
        golpesPorNivel.map(async (golpe) => {
            const detalhes =
                await buscarDetalhesGolpe(
                    golpe.url
                );

            const tipo =
                detalhes.type.name;

            return {
                nome: obterNomeGolpe(detalhes),

                tipo,

                tipoTraduzido:
                    traduzirTipo(tipo),

                nivel: golpe.nivel,

                poder: detalhes.power,

                precisao: detalhes.accuracy
            };
        })
    );

    return golpesDetalhados;
}