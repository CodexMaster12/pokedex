import {
    obterPastaGeracao
} from "../geracoes.js";


// =========================
// IMAGENS DAS FORMAS
// =========================

// Monta o caminho da imagem
// correspondente à forma selecionada.
export function obterImagemForma(
    pokemon,
    formaSelecionada = "normal",
    shiny = false
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

        return "";
    }


    // =========================
    // FORMA NORMAL
    // =========================

    if (
        formaSelecionada === "normal"
    ) {
        const aparencia =
            shiny
                ? "shiny"
                : "normal";


        return (
            `assets/images/pokemon/` +
            `${pastaGeracao}/` +
            `${aparencia}/` +
            `${numero}.png`
        );
    }


    // =========================
    // FORMAS ESPECIAIS
    // =========================

    const sufixoShiny =
        shiny
            ? "-shiny"
            : "";


    return (
        `assets/images/pokemon/` +
        `${pastaGeracao}/forms/` +
        `${numero}/` +
        `${formaSelecionada}` +
        `${sufixoShiny}.png`
    );
}