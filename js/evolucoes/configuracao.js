// =========================
// CONFIGURAÇÃO DAS EVOLUÇÕES
// =========================


// Último Pokémon atualmente implementado.
// Gen 1 + Gen 2 + Gen 3.
export const LIMITE_POKEDEX_ATUAL = 386;


// Pokémon de gerações futuras que já queremos
// mostrar nas árvores como "Em breve".
export const POKEMONS_FUTUROS = new Set([

    // =========================
    // RELACIONADOS À GEN 1
    // =========================

    // Pré-evoluções posteriores
    439, // Mime Jr.
    440, // Happiny
    446, // Munchlax


    // Evoluções posteriores
    462, // Magnezone
    463, // Lickilicky
    464, // Rhyperior
    465, // Tangrowth
    466, // Electivire
    467, // Magmortar

    470, // Leafeon
    471, // Glaceon
    474, // Porygon-Z

    700, // Sylveon

    865, // Sirfetch'd
    900, // Kleavor
    979, // Annihilape


    // =========================
    // RELACIONADOS À GEN 2
    // =========================

    // Pré-evoluções posteriores
    438, // Bonsly
    458, // Mantyke


    // Evoluções posteriores
    424, // Ambipom

    429, // Mismagius
    430, // Honchkrow

    461, // Weavile

    468, // Togekiss
    469, // Yanmega

    472, // Gliscor
    473, // Mamoswine

    899, // Wyrdeer
    901, // Ursaluna

    981, // Farigiraf
    982, // Dudunsparce


    // =========================
    // RELACIONADOS À GEN 3
    // =========================

    // Pré-evoluções posteriores
    406, // Budew
    433, // Chingling


    // Evoluções posteriores
    407, // Roserade

    475, // Gallade
    476, // Probopass
    477, // Dusknoir
    478  // Froslass
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
    361  // Snorunt
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