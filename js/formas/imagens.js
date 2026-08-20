import {
    obterPastaGeracao
} from "../geracoes.js";


// =========================
// IMAGENS DAS FORMAS
// =========================


// =========================
// ESTADO
// =========================

function normalizarEstadoAparencia(
    estadoOuForma = "normal",
    shinyAntigo = false
) {
    if (
        typeof estadoOuForma === "object" &&
        estadoOuForma !== null
    ) {
        return {
            forma:
                estadoOuForma.forma ??
                "normal",

            shiny:
                Boolean(
                    estadoOuForma.shiny
                ),

            sexo:
                estadoOuForma.sexo ??
                "male",

            animado:
                Boolean(
                    estadoOuForma.animado
                )
        };
    }


    return {
        forma:
            estadoOuForma,

        shiny:
            Boolean(
                shinyAntigo
            ),

        sexo:
            "male",

        animado:
            false
    };
}


// =========================
// DADOS DA IMAGEM
// =========================

function obterDadosImagem(
    pokemon
) {
    const numero =
        String(
            pokemon.id
        ).padStart(
            3,
            "0"
        );


    const pastaGeracao =
        obterPastaGeracao(
            pokemon.id
        );


    if (!pastaGeracao) {
        console.error(
            `Geração não encontrada para o Pokémon #${pokemon.id}`
        );

        return null;
    }


    return {
        numero,
        pastaGeracao
    };
}


// =========================
// SUFIXO DE APARÊNCIA
// =========================

function obterSufixoForma(
    estadoAparencia
) {
    const feminino =
        estadoAparencia.sexo ===
        "female";


    if (
        feminino &&
        estadoAparencia.shiny
    ) {
        return "-female-shiny";
    }


    if (feminino) {
        return "-female";
    }


    if (
        estadoAparencia.shiny
    ) {
        return "-shiny";
    }


    return "";
}


// =========================
// ESTÁTICO — FORMA NORMAL
// =========================

function obterImagemFormaNormal(
    numero,
    pastaGeracao,
    estadoAparencia
) {
    if (
        estadoAparencia.sexo ===
        "female"
    ) {
        const nomeArquivo =
            estadoAparencia.shiny
                ? `${numero}-shiny.png`
                : `${numero}.png`;


        return (
            `assets/images/pokemon/` +
            `${pastaGeracao}/female/` +
            `${nomeArquivo}`
        );
    }


    const pastaAparencia =
        estadoAparencia.shiny
            ? "shiny"
            : "normal";


    return (
        `assets/images/pokemon/` +
        `${pastaGeracao}/` +
        `${pastaAparencia}/` +
        `${numero}.png`
    );
}


// =========================
// ESTÁTICO — FORMA ESPECIAL
// =========================

function obterImagemFormaEspecial(
    numero,
    pastaGeracao,
    estadoAparencia
) {
    const sufixo =
        obterSufixoForma(
            estadoAparencia
        );


    return (
        `assets/images/pokemon/` +
        `${pastaGeracao}/forms/` +
        `${numero}/` +
        `${estadoAparencia.forma}` +
        `${sufixo}.png`
    );
}


// =========================
// ANIMADO — FORMA NORMAL
// =========================

function obterAnimacaoFormaNormal(
    numero,
    pastaGeracao,
    estadoAparencia
) {
    if (
        estadoAparencia.sexo ===
        "female"
    ) {
        const nomeArquivo =
            estadoAparencia.shiny
                ? `${numero}-shiny.gif`
                : `${numero}.gif`;


        return (
            `assets/images/pokemon/` +
            `${pastaGeracao}/animated/` +
            `female/` +
            `${nomeArquivo}`
        );
    }


    const pastaAparencia =
        estadoAparencia.shiny
            ? "shiny"
            : "normal";


    return (
        `assets/images/pokemon/` +
        `${pastaGeracao}/animated/` +
        `${pastaAparencia}/` +
        `${numero}.gif`
    );
}


// =========================
// ANIMADO — FORMA ESPECIAL
// =========================

function obterAnimacaoFormaEspecial(
    numero,
    pastaGeracao,
    estadoAparencia
) {
    const sufixo =
        obterSufixoForma(
            estadoAparencia
        );


    return (
        `assets/images/pokemon/` +
        `${pastaGeracao}/animated/forms/` +
        `${numero}/` +
        `${estadoAparencia.forma}` +
        `${sufixo}.gif`
    );
}


// =========================
// IMAGEM PRINCIPAL
// =========================

export function obterImagemForma(
    pokemon,
    estadoOuForma = "normal",
    shinyAntigo = false
) {
    const estadoAparencia =
        normalizarEstadoAparencia(
            estadoOuForma,
            shinyAntigo
        );


    const dadosImagem =
        obterDadosImagem(
            pokemon
        );


    if (!dadosImagem) {
        return "";
    }


    const {
        numero,
        pastaGeracao
    } = dadosImagem;


    // =========================
    // ANIMADO
    // =========================

    if (
        estadoAparencia.animado
    ) {
        if (
            estadoAparencia.forma ===
            "normal"
        ) {
            return obterAnimacaoFormaNormal(
                numero,
                pastaGeracao,
                estadoAparencia
            );
        }


        return obterAnimacaoFormaEspecial(
            numero,
            pastaGeracao,
            estadoAparencia
        );
    }


    // =========================
    // ESTÁTICO
    // =========================

    if (
        estadoAparencia.forma ===
        "normal"
    ) {
        return obterImagemFormaNormal(
            numero,
            pastaGeracao,
            estadoAparencia
        );
    }


    return obterImagemFormaEspecial(
        numero,
        pastaGeracao,
        estadoAparencia
    );
}