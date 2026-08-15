// =========================
// CONFIGURAÇÃO DAS EVOLUÇÕES
// =========================


// Último Pokémon atualmente implementado.
// Gen 1 + Gen 2.
export const LIMITE_POKEDEX_ATUAL = 251;


// Pokémon de gerações futuras que já queremos
// mostrar nas árvores como "Em breve".
export const POKEMONS_FUTUROS = new Set([

    // =========================
    // RELACIONADOS À GEN 1
    // =========================

    439, // Mime Jr.
    440, // Happiny
    446, // Munchlax

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

    // =========================
    // POKÉMON FUTUROS
    // =========================

    // Pré-evoluções posteriores
    298, // Azurill
    360, // Wynaut
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
    
    865, // Sirfetch'd

    899, // Wyrdeer
    900, // Kleavor
    901, // Ursaluna

    979, // Annihilape
    981, // Farigiraf
    982  // Dudunsparce
]);


// Pokémon cujas evoluções ficam melhores
// organizadas verticalmente.
export const POKEMONS_LAYOUT_VERTICAL = new Set([
    25,  // Pikachu
    102, // Exeggcute
    104, // Cubone
    109, // Koffing
    133, // Eevee
    236  // Tyrogue
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