import {
    FORMA_NORMAL
} from "./base.js";

import {
    FORMAS_GEN_1
} from "./gen-1.js";


// =========================
// REGISTRO GLOBAL
// =========================

/*
    Cada geração terá seu próprio arquivo.

    Futuramente:

    import {
        FORMAS_GEN_2
    } from "./gen-2.js";
*/

const FORMAS_POKEMON = {
    ...FORMAS_GEN_1

    // Futuramente:
    // ...FORMAS_GEN_2,
    // ...FORMAS_GEN_3
};


// =========================
// CONSULTAS
// =========================


// Retorna todas as formas disponíveis
// para determinado Pokémon
export function obterFormasPokemon(
    pokemon
) {
    return (
        FORMAS_POKEMON[pokemon.id] ||
        [FORMA_NORMAL]
    );
}


// Retorna uma forma específica
export function obterFormaSelecionada(
    pokemon,
    formaSelecionada
) {
    const formas =
        obterFormasPokemon(
            pokemon
        );


    return (
        formas.find((forma) => {
            return (
                forma.id ===
                formaSelecionada
            );
        }) ||
        FORMA_NORMAL
    );
}