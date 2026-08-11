// =========================
// FORMAS DOS POKÉMON
// =========================


// Cria uma forma no padrão usado pelo sistema
function criarForma(id, nome) {
    return Object.freeze({
        id,
        nome
    });
}


// Forma normal padrão
const FORMA_NORMAL =
    criarForma("normal", "Normal");


// =========================
// FORMAS ESPECIAIS
// =========================

// Formas especiais disponíveis para Pokémon da Pokédex de Kanto.
// O número da propriedade corresponde ao ID nacional do Pokémon.
const FORMAS_POKEMON = {

    // =========================
    // MEGAS / GIGANTAMAX
    // =========================

    3: [
        FORMA_NORMAL,
        criarForma("mega", "Mega"),
        criarForma("gigantamax", "Gigantamax")
    ],

    6: [
        FORMA_NORMAL,
        criarForma("mega-x", "Mega X"),
        criarForma("mega-y", "Mega Y"),
        criarForma("gigantamax", "Gigantamax")
    ],

    9: [
        FORMA_NORMAL,
        criarForma("mega", "Mega"),
        criarForma("gigantamax", "Gigantamax")
    ],

    12: [
        FORMA_NORMAL,
        criarForma("gigantamax", "Gigantamax")
    ],

    15: [
        FORMA_NORMAL,
        criarForma("mega", "Mega")
    ],

    18: [
        FORMA_NORMAL,
        criarForma("mega", "Mega")
    ],

    25: [
        FORMA_NORMAL,
        criarForma("gigantamax", "Gigantamax")
    ],

    26: [
        FORMA_NORMAL,
        criarForma("alola", "Alola"),
        criarForma("mega-x", "Mega X"),
        criarForma("mega-y", "Mega Y")
    ],

    36: [
        FORMA_NORMAL,
        criarForma("mega", "Mega")
    ],

    65: [
        FORMA_NORMAL,
        criarForma("mega", "Mega")
    ],

    68: [
        FORMA_NORMAL,
        criarForma("gigantamax", "Gigantamax")
    ],

    71: [
        FORMA_NORMAL,
        criarForma("mega", "Mega")
    ],

    80: [
        FORMA_NORMAL,
        criarForma("mega", "Mega"),
        criarForma("galar", "Galar")
    ],

    94: [
        FORMA_NORMAL,
        criarForma("mega", "Mega"),
        criarForma("gigantamax", "Gigantamax")
    ],

    99: [
        FORMA_NORMAL,
        criarForma("gigantamax", "Gigantamax")
    ],

    115: [
        FORMA_NORMAL,
        criarForma("mega", "Mega")
    ],

    121: [
        FORMA_NORMAL,
        criarForma("mega", "Mega")
    ],

    127: [
        FORMA_NORMAL,
        criarForma("mega", "Mega")
    ],

    130: [
        FORMA_NORMAL,
        criarForma("mega", "Mega")
    ],

    131: [
        FORMA_NORMAL,
        criarForma("gigantamax", "Gigantamax")
    ],

    133: [
        FORMA_NORMAL,
        criarForma("gigantamax", "Gigantamax")
    ],

    142: [
        FORMA_NORMAL,
        criarForma("mega", "Mega")
    ],

    143: [
        FORMA_NORMAL,
        criarForma("gigantamax", "Gigantamax")
    ],

    149: [
        FORMA_NORMAL,
        criarForma("mega", "Mega")
    ],

    150: [
        FORMA_NORMAL,
        criarForma("mega-x", "Mega X"),
        criarForma("mega-y", "Mega Y")
    ],


    // =========================
    // FORMAS DE ALOLA
    // =========================

    19: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    20: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    27: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    28: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    37: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    38: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    50: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    51: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    52: [
        FORMA_NORMAL,
        criarForma("alola", "Alola"),
        criarForma("galar", "Galar"),
        criarForma("gigantamax", "Gigantamax")
    ],

    53: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    74: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    75: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    76: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    88: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    89: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    103: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],

    105: [
        FORMA_NORMAL,
        criarForma("alola", "Alola")
    ],


    // =========================
    // FORMAS DE GALAR
    // =========================

    77: [
        FORMA_NORMAL,
        criarForma("galar", "Galar")
    ],

    78: [
        FORMA_NORMAL,
        criarForma("galar", "Galar")
    ],

    79: [
        FORMA_NORMAL,
        criarForma("galar", "Galar")
    ],

    83: [
        FORMA_NORMAL,
        criarForma("galar", "Galar")
    ],

    110: [
        FORMA_NORMAL,
        criarForma("galar", "Galar")
    ],

    122: [
        FORMA_NORMAL,
        criarForma("galar", "Galar")
    ],

    144: [
        FORMA_NORMAL,
        criarForma("galar", "Galar")
    ],

    145: [
        FORMA_NORMAL,
        criarForma("galar", "Galar")
    ],

    146: [
        FORMA_NORMAL,
        criarForma("galar", "Galar")
    ],


    // =========================
    // FORMAS DE HISUI
    // =========================

    58: [
        FORMA_NORMAL,
        criarForma("hisui", "Hisui")
    ],

    59: [
        FORMA_NORMAL,
        criarForma("hisui", "Hisui")
    ],

    100: [
        FORMA_NORMAL,
        criarForma("hisui", "Hisui")
    ],

    101: [
        FORMA_NORMAL,
        criarForma("hisui", "Hisui")
    ],


    // =========================
    // FORMAS DE PALDEA
    // =========================

    128: [
        FORMA_NORMAL,

        criarForma(
            "paldea-combat",
            "Paldea - Combat"
        ),

        criarForma(
            "paldea-blaze",
            "Paldea - Blaze"
        ),

        criarForma(
            "paldea-aqua",
            "Paldea - Aqua"
        )
    ]
};


// =========================
// CONSULTA DE FORMAS
// =========================

// Retorna as formas disponíveis para um Pokémon
export function obterFormasPokemon(pokemon) {
    return (
        FORMAS_POKEMON[pokemon.id] ||
        [FORMA_NORMAL]
    );
}


// =========================
// IMAGENS
// =========================

// Monta o caminho da imagem correspondente à forma selecionada
export function obterImagemForma(
    pokemon,
    formaSelecionada = "normal",
    shiny = false
) {
    const numero =
        String(pokemon.id).padStart(3, "0");


    // Forma normal
    if (formaSelecionada === "normal") {
        return shiny
            ? `assets/images/pokemon/shiny/${numero}.png`
            : `assets/images/pokemon/${numero}.png`;
    }


    // Formas especiais
    const sufixoShiny =
        shiny
            ? "-shiny"
            : "";


    return (
        `assets/images/pokemon/forms/` +
        `${numero}/` +
        `${formaSelecionada}${sufixoShiny}.png`
    );
}