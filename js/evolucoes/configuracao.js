import {
    LIMITE_POKEDEX_ATUAL
} from "../geracoes.js";


// =========================
// CONFIGURAÇÃO DAS EVOLUÇÕES
// =========================


// =========================
// LIMITE DA POKÉDEX
// =========================

// O limite é definido centralmente
// em geracoes.js.
//
// Reexportamos aqui para manter
// compatibilidade com módulos que
// já importam esta constante através
// de evolucoes/configuracao.js.
export {
    LIMITE_POKEDEX_ATUAL
};


// =========================
// POKÉMON FUTUROS
// =========================

// Pokémon de gerações futuras que já queremos
// mostrar nas árvores normais como "Em breve".
//
// Importante:
//
// Evoluções exclusivas de formas regionais
// ou especiais não entram aqui.
//
// Elas são tratadas por regionais.js
// ou especiais.js.
export const POKEMONS_FUTUROS =
    new Set([

        // =========================
        // RELACIONADOS À GEN 1
        // =========================

        700, // Sylveon
        900, // Kleavor
        979, // Annihilape


        // =========================
        // RELACIONADOS À GEN 2
        // =========================

        899, // Wyrdeer
        901, // Ursaluna
        981, // Farigiraf
        982, // Dudunsparce


        // =========================
        // RELACIONADOS À GEN 5
        // =========================

        983 // Kingambit
    ]);


// =========================
// LAYOUT VERTICAL
// =========================

// Pokémon cujas evoluções ficam melhores
// organizadas verticalmente.
export const POKEMONS_LAYOUT_VERTICAL =
    new Set([

        // =========================
        // GERAÇÃO 1 — KANTO
        // =========================

        25,  // Pikachu
        102, // Exeggcute
        104, // Cubone
        109, // Koffing
        133, // Eevee


        // =========================
        // GERAÇÃO 2 — JOHTO
        // =========================

        236, // Tyrogue


        // =========================
        // GERAÇÃO 3 — HOENN
        // =========================

        281, // Kirlia
        361, // Snorunt


        // =========================
        // GERAÇÃO 4 — SINNOH
        // =========================

        412, // Burmy


        // =========================
        // GERAÇÃO 5 — UNOVA
        // =========================

        502, // Dewott
        548, // Petilil
        627  // Rufflet
    ]);


// =========================
// VISIBILIDADE NA ÁRVORE
// =========================

// Diz se o Pokémon deve aparecer
// na árvore normal.
export function pokemonDeveAparecer(
    id
) {
    return (
        id <= LIMITE_POKEDEX_ATUAL ||
        POKEMONS_FUTUROS.has(id)
    );
}


// =========================
// IMAGEM DISPONÍVEL
// =========================

// Diz se já temos imagem oficial dele
// dentro das gerações implementadas.
export function pokemonPossuiImagem(
    id
) {
    return (
        id <= LIMITE_POKEDEX_ATUAL
    );
}