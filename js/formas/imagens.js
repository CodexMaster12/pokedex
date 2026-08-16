import {
    obterPastaGeracao
} from "../geracoes.js";


// =========================
// IMAGENS DAS FORMAS
// =========================


// Normaliza os dados recebidos.
//
// Aceita:
// - estadoAparencia completo
// - formato antigo: forma + shiny
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
// FORMA NORMAL
// =========================

function obterImagemFormaNormal(
    numero,
    pastaGeracao,
    estadoAparencia
) {

    // =========================
    // FÊMEA
    // =========================

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


    // =========================
    // MACHO / PADRÃO
    // =========================

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
// FORMAS ESPECIAIS
// =========================

function obterImagemFormaEspecial(
    numero,
    pastaGeracao,
    estadoAparencia
) {
    const sufixoShiny =
        estadoAparencia.shiny
            ? "-shiny"
            : "";


    return (
        `assets/images/pokemon/` +
        `${pastaGeracao}/forms/` +
        `${numero}/` +
        `${estadoAparencia.forma}` +
        `${sufixoShiny}.png`
    );
}


// =========================
// IMAGEM ESTÁTICA
// =========================

function obterImagemEstatica(
    pokemon,
    estadoAparencia
) {
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


// =========================
// IMAGEM PRINCIPAL
// =========================

// Retorna a imagem correspondente
// ao estado visual atual.
//
// Atualmente:
// - forma funciona;
// - shiny funciona;
// - sexo funciona na forma normal;
// - animado está preparado.
//
// O formato antigo continua aceito
// para manter compatibilidade.
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


    return obterImagemEstatica(
        pokemon,
        estadoAparencia
    );
}