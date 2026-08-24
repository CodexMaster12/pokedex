import {
    criarForma,
    FORMA_NORMAL
} from "./base.js";


// =========================
// FUNÇÃO AUXILIAR
// =========================

// Cria a lista de formas de um Pokémon
// incluindo sempre a forma normal.
function criarListaFormas(
    ...formas
) {
    return Object.freeze([
        FORMA_NORMAL,
        ...formas
    ]);
}

// Cria a lista de formas permitindo
// personalizar somente o nome visual
// da forma normal no seletor.
function criarListaFormasComNomeNormal(
    nomeNormal,
    ...formas
) {
    return Object.freeze([
        criarForma(
            "normal",
            nomeNormal
        ),

        ...formas
    ]);
}


// =========================
// FORMAS — GERAÇÃO 4
// =========================

export const FORMAS_GEN_4 =
    Object.freeze({

        // =========================
        // STARAPTOR
        // =========================

        398: criarListaFormas(

            // Mega recente.
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // =========================
        // BURMY
        // =========================

        // Forma normal:
        // Plant Cloak
        412: criarListaFormasComNomeNormal(
            "Plant",

            criarForma(
                "sandy",
                "Sandy"
            ),

            criarForma(
                "trash",
                "Trash"
            )
        ),


        // =========================
        // WORMADAM
        // =========================

        // Forma normal:
        // Plant Cloak
        413: criarListaFormasComNomeNormal(
            "Plant",

            criarForma(
                "sandy",
                "Sandy",
                "wormadam-sandy"
            ),

            criarForma(
                "trash",
                "Trash",
                "wormadam-trash"
            )
        ),


        // =========================
        // CHERRIM
        // =========================

        // Forma normal:
        // Overcast
        421: criarListaFormasComNomeNormal(
            "Overcast",

            criarForma(
                "sunshine",
                "Sunshine",
                "cherrim-sunshine"
            )
        ),


        // =========================
        // SHELLOS
        // =========================

        // Forma normal:
        // West Sea
        422: criarListaFormasComNomeNormal(
            "West Sea",

            criarForma(
                "east",
                "East Sea"
            )
        ),


        // =========================
        // GASTRODON
        // =========================

        // Forma normal:
        // West Sea
        423: criarListaFormasComNomeNormal(
            "West Sea",

            criarForma(
                "east",
                "East Sea"
            )
        ),


        // =========================
        // LOPUNNY
        // =========================

        428: criarListaFormas(

            criarForma(
                "mega",
                "Mega",
                "lopunny-mega"
            )
        ),


        // =========================
        // GARCHOMP
        // =========================

        445: criarListaFormas(

            criarForma(
                "mega",
                "Mega",
                "garchomp-mega"
            ),

            // Mega Z recente.
            criarForma(
                "mega-z",
                "Mega Z"
            )
        ),


        // =========================
        // LUCARIO
        // =========================

        448: criarListaFormas(

            criarForma(
                "mega",
                "Mega",
                "lucario-mega"
            ),

            // Mega Z recente.
            criarForma(
                "mega-z",
                "Mega Z"
            )
        ),


        // =========================
        // ABOMASNOW
        // =========================

        460: criarListaFormas(

            criarForma(
                "mega",
                "Mega",
                "abomasnow-mega"
            )
        ),


        // =========================
        // GALLADE
        // =========================

        475: criarListaFormas(

            criarForma(
                "mega",
                "Mega",
                "gallade-mega"
            )
        ),


        // =========================
        // FROSLASS
        // =========================

        478: criarListaFormas(

            // Mega recente.
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // =========================
        // ROTOM
        // =========================

        479: criarListaFormas(

            criarForma(
                "heat",
                "Heat",
                "rotom-heat"
            ),

            criarForma(
                "wash",
                "Wash",
                "rotom-wash"
            ),

            criarForma(
                "frost",
                "Frost",
                "rotom-frost"
            ),

            criarForma(
                "fan",
                "Fan",
                "rotom-fan"
            ),

            criarForma(
                "mow",
                "Mow",
                "rotom-mow"
            )
        ),


        // =========================
        // DIALGA
        // =========================

        483: criarListaFormas(

            criarForma(
                "origin",
                "Origin",
                "dialga-origin"
            )
        ),


        // =========================
        // PALKIA
        // =========================

        484: criarListaFormas(

            criarForma(
                "origin",
                "Origin",
                "palkia-origin"
            )
        ),


        // =========================
        // HEATRAN
        // =========================

        485: criarListaFormas(

            // Mega recente.
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // =========================
        // GIRATINA
        // =========================

        // Forma normal:
        // Altered Forme
        487: criarListaFormas(

            criarForma(
                "origin",
                "Origin",
                "giratina-origin"
            )
        ),


        // =========================
        // DARKRAI
        // =========================

        491: criarListaFormas(

            // Mega recente.
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // =========================
        // SHAYMIN
        // =========================

        // Forma normal:
        // Land Forme
        492: criarListaFormasComNomeNormal(
            "Land",

            criarForma(
                "sky",
                "Sky",
                "shaymin-sky"
            )
        ),


        // =========================
        // ARCEUS
        // =========================

        // A forma Normal continua sendo
        // a forma padrão do #493.
        //
        // As demais formas representam
        // os tipos assumidos pelo Arceus.
        493: criarListaFormas(

            criarForma(
                "bug",
                "Bug"
            ),

            criarForma(
                "dark",
                "Dark"
            ),

            criarForma(
                "dragon",
                "Dragon"
            ),

            criarForma(
                "electric",
                "Electric"
            ),

            criarForma(
                "fairy",
                "Fairy"
            ),

            criarForma(
                "fighting",
                "Fighting"
            ),

            criarForma(
                "fire",
                "Fire"
            ),

            criarForma(
                "flying",
                "Flying"
            ),

            criarForma(
                "ghost",
                "Ghost"
            ),

            criarForma(
                "grass",
                "Grass"
            ),

            criarForma(
                "ground",
                "Ground"
            ),

            criarForma(
                "ice",
                "Ice"
            ),

            criarForma(
                "poison",
                "Poison"
            ),

            criarForma(
                "psychic",
                "Psychic"
            ),

            criarForma(
                "rock",
                "Rock"
            ),

            criarForma(
                "steel",
                "Steel"
            ),

            criarForma(
                "water",
                "Water"
            ),

            // Forma presente nos assets
            // para compatibilidade visual.
            criarForma(
                "unknown",
                "Unknown"
            )
        )

    });