// =========================
// DADOS MANUAIS DAS FORMAS
// =========================
//
// Formas que não possuem dados disponíveis
// diretamente pelo endpoint /pokemon
// utilizado pelo projeto.
//
// Os dados específicos são registrados
// aqui e utilizados pelo modal.
// =========================


// =========================
// FUNÇÕES AUXILIARES
// =========================

// Cria a estrutura de tipos no mesmo
// formato utilizado pela PokéAPI.
function criarTipos(
    ...tipos
) {
    return tipos.map(
        (nome, indice) => ({
            slot:
                indice + 1,

            type: {
                name: nome
            }
        })
    );
}


// Cria a estrutura de habilidades no mesmo
// formato utilizado pela PokéAPI.
function criarHabilidades(
    ...habilidades
) {
    return habilidades.map(
        (nome) => ({
            ability: {
                name: nome
            }
        })
    );
}


// Cria a estrutura de estatísticas no mesmo
// formato utilizado pela PokéAPI.
function criarStats(
    hp,
    ataque,
    defesa,
    ataqueEspecial,
    defesaEspecial,
    velocidade
) {
    return [
        {
            base_stat: hp,

            stat: {
                name: "hp"
            }
        },

        {
            base_stat: ataque,

            stat: {
                name: "attack"
            }
        },

        {
            base_stat: defesa,

            stat: {
                name: "defense"
            }
        },

        {
            base_stat:
                ataqueEspecial,

            stat: {
                name: "special-attack"
            }
        },

        {
            base_stat:
                defesaEspecial,

            stat: {
                name: "special-defense"
            }
        },

        {
            base_stat:
                velocidade,

            stat: {
                name: "speed"
            }
        }
    ];
}


// =========================
// REGISTRO
// =========================

const DADOS_FORMAS_MANUAIS = {


    // =========================
    // PIKACHU — PEAKYCHU
    // =========================
    //
    // Forma visual.
    // Utiliza os dados do Pikachu normal.
    // =========================

    "25:peakychu": {
        pokemonId: 25,
        formaId: "peakychu"
    },


    // =========================
    // RAICHU — MEGA X
    // =========================

    "26:mega-x": {
        pokemonId: 26,
        formaId: "mega-x",

        types:
            criarTipos(
                "electric"
            ),

        abilities:
            criarHabilidades(
                "electric-surge"
            ),

        stats:
            criarStats(
                60,
                135,
                95,
                90,
                95,
                110
            ),

        height: 12,
        weight: 380
    },


    // =========================
    // RAICHU — MEGA Y
    // =========================

    "26:mega-y": {
        pokemonId: 26,
        formaId: "mega-y",

        types:
            criarTipos(
                "electric"
            ),

        abilities:
            criarHabilidades(
                "no-guard"
            ),

        stats:
            criarStats(
                60,
                100,
                55,
                160,
                80,
                130
            ),

        height: 10,
        weight: 260
    },


    // =========================
    // CLEFABLE — MEGA
    // =========================

    "36:mega": {
        pokemonId: 36,
        formaId: "mega",

        types:
            criarTipos(
                "fairy",
                "flying"
            ),

        abilities:
            criarHabilidades(
                "magic-bounce"
            ),

        stats:
            criarStats(
                95,
                80,
                93,
                135,
                110,
                70
            ),

        height: 17,
        weight: 423
    },


    // =========================
    // VICTREEBEL — MEGA
    // =========================

    "71:mega": {
        pokemonId: 71,
        formaId: "mega",

        types:
            criarTipos(
                "grass",
                "poison"
            ),

        abilities:
            criarHabilidades(
                "innards-out"
            ),

        stats:
            criarStats(
                80,
                125,
                85,
                135,
                95,
                70
            ),

        height: 45,
        weight: 1255
    },


    // =========================
    // STARMIE — MEGA
    // =========================

    "121:mega": {
        pokemonId: 121,
        formaId: "mega",

        types:
            criarTipos(
                "water",
                "psychic"
            ),

        abilities:
            criarHabilidades(
                "huge-power"
            ),

        stats:
            criarStats(
                60,
                100,
                105,
                130,
                105,
                120
            ),

        height: 23,
        weight: 800
    },


    // =========================
    // DRAGONITE — MEGA
    // =========================

    "149:mega": {
        pokemonId: 149,
        formaId: "mega",

        types:
            criarTipos(
                "dragon",
                "flying"
            ),

        abilities:
            criarHabilidades(
                "multiscale"
            ),

        stats:
            criarStats(
                91,
                124,
                115,
                145,
                125,
                100
            ),

        height: 22,
        weight: 2900
    },


    // =========================
    // MEGANIUM — MEGA
    // =========================

    "154:mega": {
        pokemonId: 154,
        formaId: "mega",

        types:
            criarTipos(
                "grass",
                "fairy"
            ),

        abilities:
            criarHabilidades(
                "mega-sol"
            ),

        stats:
            criarStats(
                80,
                92,
                115,
                143,
                115,
                80
            ),

        height: 24,
        weight: 2010
    },


    // =========================
    // FERALIGATR — MEGA
    // =========================

    "160:mega": {
        pokemonId: 160,
        formaId: "mega",

        types:
            criarTipos(
                "water",
                "dragon"
            ),

        abilities:
            criarHabilidades(
                "dragonize"
            ),

        stats:
            criarStats(
                85,
                160,
                125,
                89,
                93,
                78
            ),

        height: 23,
        weight: 1088
    },


    // =========================
    // SKARMORY — MEGA
    // =========================

    "227:mega": {
        pokemonId: 227,
        formaId: "mega",

        types:
            criarTipos(
                "steel",
                "flying"
            ),

        abilities:
            criarHabilidades(
                "stalwart"
            ),

        stats:
            criarStats(
                65,
                140,
                110,
                40,
                100,
                110
            ),

        height: 17,
        weight: 404
    },


    // =========================
    // CHIMECHO — MEGA
    // =========================

    "358:mega": {
        pokemonId: 358,
        formaId: "mega",

        types:
            criarTipos(
                "psychic",
                "steel"
            ),

        abilities:
            criarHabilidades(
                "levitate"
            ),

        stats:
            criarStats(
                75,
                50,
                110,
                135,
                120,
                65
            ),

        height: 12,
        weight: 80
    },


    // =========================
    // ABSOL — MEGA Z
    // =========================

    "359:mega-z": {
        pokemonId: 359,
        formaId: "mega-z",

        types:
            criarTipos(
                "dark",
                "ghost"
            ),

        // Nenhuma habilidade oficial
        // listada para esta forma.
        abilities:
            criarHabilidades(),

        stats:
            criarStats(
                65,
                154,
                60,
                75,
                60,
                151
            ),

        height: 12,
        weight: 490
    },


    // =========================
    // STARAPTOR — MEGA
    // =========================

    "398:mega": {
        pokemonId: 398,
        formaId: "mega",

        types:
            criarTipos(
                "fighting",
                "flying"
            ),

        abilities:
            criarHabilidades(
                "contrary"
            ),

        stats:
            criarStats(
                85,
                140,
                100,
                60,
                90,
                110
            ),

        height: 19,
        weight: 500
    },


    // =========================
    // GARCHOMP — MEGA Z
    // =========================

    "445:mega-z": {
        pokemonId: 445,
        formaId: "mega-z",

        types:
            criarTipos(
                "dragon"
            ),

        // Nenhuma habilidade oficial
        // listada para esta forma.
        abilities:
            criarHabilidades(),

        stats:
            criarStats(
                108,
                130,
                85,
                141,
                85,
                151
            ),

        height: 19,
        weight: 990
    },


    // =========================
    // LUCARIO — MEGA Z
    // =========================

    "448:mega-z": {
        pokemonId: 448,
        formaId: "mega-z",

        types:
            criarTipos(
                "fighting",
                "steel"
            ),

        // Nenhuma habilidade oficial
        // listada para esta forma.
        abilities:
            criarHabilidades(),

        stats:
            criarStats(
                70,
                100,
                70,
                164,
                70,
                151
            ),

        height: 13,
        weight: 494
    },


    // =========================
    // FROSLASS — MEGA
    // =========================

    "478:mega": {
        pokemonId: 478,
        formaId: "mega",

        types:
            criarTipos(
                "ice",
                "ghost"
            ),

        abilities:
            criarHabilidades(
                "snow-warning"
            ),

        stats:
            criarStats(
                70,
                80,
                70,
                140,
                100,
                120
            ),

        height: 26,
        weight: 296
    },


    // =========================
    // HEATRAN — MEGA
    // =========================

    "485:mega": {
        pokemonId: 485,
        formaId: "mega",

        types:
            criarTipos(
                "fire",
                "steel"
            ),

        // Nenhuma habilidade oficial
        // listada para esta forma.
        abilities:
            criarHabilidades(),

        stats:
            criarStats(
                91,
                120,
                106,
                175,
                141,
                67
            ),

        height: 28,
        weight: 5700
    },


    // =========================
    // DARKRAI — MEGA
    // =========================

    "491:mega": {
        pokemonId: 491,
        formaId: "mega",

        types:
            criarTipos(
                "dark"
            ),

        // Nenhuma habilidade oficial
        // listada para esta forma.
        abilities:
            criarHabilidades(),

        stats:
            criarStats(
                70,
                120,
                130,
                165,
                130,
                85
            ),

        height: 30,
        weight: 2400
    },

    // =========================
    // EMBOAR — MEGA
    // =========================

    "500:mega": {
        pokemonId: 500,
        formaId: "mega",

        types:
            criarTipos(
                "fire",
                "fighting"
            ),

        abilities:
            criarHabilidades(
                "mold-breaker"
            ),

        stats:
            criarStats(
                110,
                148,
                75,
                110,
                110,
                75
            ),

        height: 18,
        weight: 1803
    },

    // =========================
    // EXCADRILL — MEGA
    // =========================

    "530:mega": {
        pokemonId: 530,
        formaId: "mega",

        types:
            criarTipos(
                "ground",
                "steel"
            ),

        abilities:
            criarHabilidades(
                "piercing-drill"
            ),

        stats:
            criarStats(
                110,
                165,
                100,
                65,
                65,
                103
            ),

        height: 9,
        weight: 600
    },


    // =========================
    // SCOLIPEDE — MEGA
    // =========================

    "545:mega": {
        pokemonId: 545,
        formaId: "mega",

        types:
            criarTipos(
                "bug",
                "poison"
            ),

        abilities:
            criarHabilidades(
                "shell-armor"
            ),

        stats:
            criarStats(
                60,
                140,
                149,
                75,
                99,
                62
            ),

        height: 32,
        weight: 2305
    },


    // =========================
    // SCRAFTY — MEGA
    // =========================

    "560:mega": {
        pokemonId: 560,
        formaId: "mega",

        types:
            criarTipos(
                "dark",
                "fighting"
            ),

        abilities:
            criarHabilidades(
                "intimidate"
            ),

        stats:
            criarStats(
                65,
                130,
                135,
                55,
                135,
                68
            ),

        height: 11,
        weight: 310
    },


    // =========================
    // EELEKTROSS — MEGA
    // =========================

    "604:mega": {
        pokemonId: 604,
        formaId: "mega",

        types:
            criarTipos(
                "electric"
            ),

        abilities:
            criarHabilidades(
                "eelevate"
            ),

        stats:
            criarStats(
                85,
                145,
                80,
                135,
                90,
                80
            ),

        height: 30,
        weight: 1800
    },


    // =========================
    // CHANDELURE — MEGA
    // =========================

    "609:mega": {
        pokemonId: 609,
        formaId: "mega",

        types:
            criarTipos(
                "ghost",
                "fire"
            ),

        abilities:
            criarHabilidades(
                "infiltrator"
            ),

        stats:
            criarStats(
                60,
                75,
                110,
                175,
                110,
                90
            ),

        height: 25,
        weight: 696
    },


    // =========================
    // GOLURK — MEGA
    // =========================

    "623:mega": {
        pokemonId: 623,
        formaId: "mega",

        types:
            criarTipos(
                "ground",
                "ghost"
            ),

        abilities:
            criarHabilidades(
                "unseen-fist"
            ),

        stats:
            criarStats(
                89,
                159,
                105,
                70,
                105,
                55
            ),

        height: 40,
        weight: 3300
    }

};


// =========================
// CONSULTA
// =========================

// Retorna os dados manuais de uma forma,
// quando existirem.
export function obterDadosFormaManual(
    pokemonId,
    formaId
) {
    const chave =
        `${pokemonId}:${formaId}`;


    return (
        DADOS_FORMAS_MANUAIS[chave] ||
        null
    );
}