// =========================
// CONFIGURAÇÃO DAS EVOLUÇÕES
// =========================


// Último Pokémon atualmente implementado.
// Gen 1 + Gen 2 + Gen 3 + Gen 4.
export const LIMITE_POKEDEX_ATUAL = 493;


// Pokémon de gerações futuras que já queremos
// mostrar nas árvores como "Em breve".
export const POKEMONS_FUTUROS = new Set([

    // =========================
    // RELACIONADOS À GEN 1
    // =========================

    // Evoluções posteriores à Gen 4
    700, // Sylveon

    865, // Sirfetch'd

    900, // Kleavor

    979, // Annihilape


    // =========================
    // RELACIONADOS À GEN 2
    // =========================

    // Evoluções posteriores à Gen 4
    899, // Wyrdeer

    901, // Ursaluna

    981, // Farigiraf

    982  // Dudunsparce
]);


// Pokémon cujas evoluções ficam melhores
// organizadas verticalmente.
export const POKEMONS_LAYOUT_VERTICAL = new Set([

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

    412  // Burmy
]);


// Diz se o Pokémon deve aparecer na árvore.
export function pokemonDeveAparecer(id) {
    return (
        id <= LIMITE_POKEDEX_ATUAL ||
        POKEMONS_FUTUROS.has(id)
    );
}


// Diz se já temos imagem oficial dele
// dentro das gerações implementadas.
export function pokemonPossuiImagem(id) {
    return id <= LIMITE_POKEDEX_ATUAL;
}