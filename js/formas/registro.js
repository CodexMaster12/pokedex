import {
    FORMA_NORMAL
} from "./base.js";

import {
    FORMAS_GEN_1
} from "./gen-1.js";

import {
    FORMAS_GEN_2
} from "./gen-2.js";

import {
    FORMAS_GEN_3
} from "./gen-3.js";


// =========================
// REGISTRO GLOBAL
// =========================

// Reúne as formas cadastradas
// de todas as gerações disponíveis.
const FORMAS_POKEMON =
    Object.freeze({
        ...FORMAS_GEN_1,
        ...FORMAS_GEN_2,
        ...FORMAS_GEN_3
    });


// =========================
// CONSULTAS
// =========================

// Retorna todas as formas disponíveis
// para determinado Pokémon.
export function obterFormasPokemon(
    pokemon
) {
    return (
        FORMAS_POKEMON[pokemon.id] ||
        [FORMA_NORMAL]
    );
}


// Retorna uma forma específica.
export function obterFormaSelecionada(
    pokemon,
    formaSelecionada
) {
    const formas =
        obterFormasPokemon(
            pokemon
        );


    return (
        formas.find(
            (forma) => {
                return (
                    forma.id ===
                    formaSelecionada
                );
            }
        ) ||
        FORMA_NORMAL
    );
}