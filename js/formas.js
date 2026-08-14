// =========================
// FORMAS DOS POKÉMON
// =========================


// Cria uma forma no padrão usado pelo sistema
function criarForma(id, nome, api = null) {
    return Object.freeze({
        id,
        nome,
        api
    });
}


// Forma normal padrão
const FORMA_NORMAL =
    criarForma("normal", "Normal");


// =========================
// FORMAS ESPECIAIS
// =========================

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

        criarForma(
            "mega-x",
            "Mega X",
            "charizard-mega-x"
        ),

        criarForma(
            "mega-y",
            "Mega Y",
            "charizard-mega-y"
        ),

        criarForma(
            "gigantamax",
            "Gigantamax",
            "charizard-gmax"
        )
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

        criarForma(
            "alola",
            "Alola",
            "raichu-alola"
        ),

        criarForma(
            "mega-x",
            "Mega X"
        ),

        criarForma(
            "mega-y",
            "Mega Y"
        )
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
    criarForma(
        "alola",
        "Alola",
        "rattata-alola"
    )
],

20: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "raticate-alola"
    )
],

27: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "sandshrew-alola"
    )
],

28: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "sandslash-alola"
    )
],

37: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "vulpix-alola"
    )
],

38: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "ninetales-alola"
    )
],

50: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "diglett-alola"
    )
],

51: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "dugtrio-alola"
    )
],

52: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "meowth-alola"
    ),
    criarForma(
        "galar",
        "Galar"
    ),
    criarForma(
        "gigantamax",
        "Gigantamax"
    )
],

53: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "persian-alola"
    )
],

74: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "geodude-alola"
    )
],

75: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "graveler-alola"
    )
],

76: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "golem-alola"
    )
],

88: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "grimer-alola"
    )
],

89: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "muk-alola"
    )
],

103: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "exeggutor-alola"
    )
],

105: [
    FORMA_NORMAL,
    criarForma(
        "alola",
        "Alola",
        "marowak-alola"
    )
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
            "Paldea - Combat",
            "tauros-paldea-combat-breed"
        ),

        criarForma(
            "paldea-blaze",
            "Paldea - Blaze",
            "tauros-paldea-blaze-breed"
        ),

        criarForma(
            "paldea-aqua",
            "Paldea - Aqua",
            "tauros-paldea-aqua-breed"
        )
    ]

};


// =========================
// CONSULTA DE FORMAS
// =========================


// Retorna as formas disponíveis para o Pokémon
export function obterFormasPokemon(pokemon) {
    return (
        FORMAS_POKEMON[pokemon.id] ||
        [FORMA_NORMAL]
    );
}


// Retorna a forma atualmente selecionada
export function obterFormaSelecionada(
    pokemon,
    formaSelecionada
) {
    const formas =
        obterFormasPokemon(pokemon);

    return formas.find((forma) => {
        return forma.id === formaSelecionada;
    }) || FORMA_NORMAL;
}


// =========================
// IMAGENS
// =========================


// Monta o caminho da imagem correspondente
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
            ? `assets/images/pokemon/gen-1/shiny/${numero}.png`
            : `assets/images/pokemon/gen-1/normal/${numero}.png`;
    }


    // Forma especial
    const sufixoShiny =
        shiny
            ? "-shiny"
            : "";


    return (
        `assets/images/pokemon/gen-1/forms/` +
        `${numero}/` +
        `${formaSelecionada}${sufixoShiny}.png`
    );
}