import {
    obterPastaGeracao
} from "../geracoes.js";

import {
    pokemonPossuiImagem
} from "./configuracao.js";


// =========================
// IMAGENS DAS EVOLUÇÕES
// =========================

export function obterImagemEvolucao(
    numero,
    forma = null
) {
    // Pokémon futuro ainda não implementado.
    if (!pokemonPossuiImagem(numero)) {
        return null;
    }


    const numeroFormatado =
        String(numero).padStart(
            3,
            "0"
        );


    const pastaGeracao =
        obterPastaGeracao(
            numero
        );


    if (!pastaGeracao) {
        return null;
    }


    // Forma regional/especial.
    if (forma) {
        return (
            `assets/images/pokemon/` +
            `${pastaGeracao}/forms/` +
            `${numeroFormatado}/` +
            `${forma.toLowerCase()}.png`
        );
    }


    // Forma normal.
    return (
        `assets/images/pokemon/` +
        `${pastaGeracao}/normal/` +
        `${numeroFormatado}.png`
    );
}