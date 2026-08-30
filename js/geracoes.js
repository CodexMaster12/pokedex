// =========================
// CONFIGURAÇÃO DAS GERAÇÕES
// =========================

const GERACOES = [
    {
        geracao: 1,
        inicio: 1,
        fim: 151,
        regiao: "Kanto"
    },
    {
        geracao: 2,
        inicio: 152,
        fim: 251,
        regiao: "Johto"
    },
    {
        geracao: 3,
        inicio: 252,
        fim: 386,
        regiao: "Hoenn"
    },
    {
        geracao: 4,
        inicio: 387,
        fim: 493,
        regiao: "Sinnoh"
    },
    {
        geracao: 5,
        inicio: 494,
        fim: 649,
        regiao: "Unova"
    },
    {
        geracao: 6,
        inicio: 650,
        fim: 721,
        regiao: "Kalos"
    },
    {
        geracao: 7,
        inicio: 722,
        fim: 809,
        regiao: "Alola"
    },
    {
        geracao: 8,
        inicio: 810,
        fim: 905,
        regiao: "Galar"
    },
    {
        geracao: 9,
        inicio: 906,
        fim: 1025,
        regiao: "Paldea"
    }
];


// =========================
// GERAÇÃO IMPLEMENTADA
// =========================

// Última geração atualmente
// disponível na Pokédex.

export const ULTIMA_GERACAO_IMPLEMENTADA = 6;


const DADOS_ULTIMA_GERACAO =
    GERACOES.find(
        (geracao) => {
            return (
                geracao.geracao ===
                ULTIMA_GERACAO_IMPLEMENTADA
            );
        }
    );


// Último número atualmente
// disponível na Pokédex.

export const LIMITE_POKEDEX_ATUAL =
    DADOS_ULTIMA_GERACAO?.fim ?? 0;


// Região da última geração
// atualmente implementada.

export const REGIAO_ATUAL =
    DADOS_ULTIMA_GERACAO?.regiao ?? "";


// =========================
// GERAÇÕES IMPLEMENTADAS
// =========================

// Retorna somente as gerações que
// já estão disponíveis no projeto.
//
// Utilizado, por exemplo, para montar
// dinamicamente o filtro da interface.

export function obterGeracoesImplementadas() {
    return GERACOES.filter(
        (geracao) => {
            return (
                geracao.geracao <=
                ULTIMA_GERACAO_IMPLEMENTADA
            );
        }
    );
}


// =========================
// GERAÇÃO
// =========================

// Retorna os dados da geração
// correspondente ao número
// da Pokédex Nacional.

function obterDadosGeracao(
    id
) {
    return (
        GERACOES.find(
            (geracao) => {
                return (
                    id >= geracao.inicio &&
                    id <= geracao.fim
                );
            }
        ) ||
        null
    );
}


// Retorna o número da geração.

export function obterGeracaoPorId(
    id
) {
    const dadosGeracao =
        obterDadosGeracao(
            id
        );

    return dadosGeracao
        ? dadosGeracao.geracao
        : null;
}


// =========================
// PASTA DA GERAÇÃO
// =========================

// Retorna o nome da pasta correspondente
// à geração do Pokémon.

export function obterPastaGeracao(
    id
) {
    const geracao =
        obterGeracaoPorId(
            id
        );

    if (!geracao) {
        return null;
    }

    return `gen-${geracao}`;
}


// =========================
// REGIÃO
// =========================

// Retorna o nome da região correspondente
// ao Pokémon pela sua geração.

export function obterRegiaoPorId(
    id
) {
    const dadosGeracao =
        obterDadosGeracao(
            id
        );

    return dadosGeracao
        ? dadosGeracao.regiao
        : "";
}