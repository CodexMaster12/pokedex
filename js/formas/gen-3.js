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


// =========================
// FORMAS — GERAÇÃO 3
// =========================

export const FORMAS_GEN_3 =
    Object.freeze({

        // =========================
        // SCEPTILE
        // =========================

        254: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "sceptile-mega"
            )
        ),


        // =========================
        // BLAZIKEN
        // =========================

        257: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "blaziken-mega"
            )
        ),


        // =========================
        // SWAMPERT
        // =========================

        260: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "swampert-mega"
            )
        ),


        // =========================
        // ZIGZAGOON
        // =========================

        263: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "zigzagoon-galar"
            )
        ),


        // =========================
        // LINOONE
        // =========================

        264: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "linoone-galar"
            )
        ),


        // =========================
        // GARDEVOIR
        // =========================

        282: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "gardevoir-mega"
            )
        ),


        // =========================
        // SABLEYE
        // =========================

        302: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "sableye-mega"
            )
        ),


        // =========================
        // MAWILE
        // =========================

        303: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "mawile-mega"
            )
        ),


        // =========================
        // AGGRON
        // =========================

        306: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "aggron-mega"
            )
        ),


        // =========================
        // MEDICHAM
        // =========================

        308: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "medicham-mega"
            )
        ),


        // =========================
        // MANECTRIC
        // =========================

        310: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "manectric-mega"
            )
        ),


        // =========================
        // SHARPEDO
        // =========================

        319: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "sharpedo-mega"
            )
        ),


        // =========================
        // CAMERUPT
        // =========================

        323: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "camerupt-mega"
            )
        ),


        // =========================
        // ALTARIA
        // =========================

        334: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "altaria-mega"
            )
        ),


        // =========================
        // CASTFORM
        // =========================

        351: criarListaFormas(
            criarForma(
                "sunny",
                "Ensolarado",
                "castform-sunny"
            ),

            criarForma(
                "rainy",
                "Chuvoso",
                "castform-rainy"
            ),

            criarForma(
                "snowy",
                "Nevando",
                "castform-snowy"
            )
        ),


        // =========================
        // BANETTE
        // =========================

        354: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "banette-mega"
            )
        ),


        // =========================
        // CHIMECHO
        // =========================

        358: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "chimecho-mega"
            )
        ),


        // =========================
        // ABSOL
        // =========================

        359: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "absol-mega"
            ),

            criarForma(
                "mega-z",
                "Mega Z",
                "absol-mega-z"
            )
        ),


        // =========================
        // GLALIE
        // =========================

        362: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "glalie-mega"
            )
        ),


        // =========================
        // SALAMENCE
        // =========================

        373: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "salamence-mega"
            )
        ),


        // =========================
        // METAGROSS
        // =========================

        376: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "metagross-mega"
            )
        ),


        // =========================
        // LATIAS
        // =========================

        380: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "latias-mega"
            )
        ),


        // =========================
        // LATIOS
        // =========================

        381: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "latios-mega"
            )
        ),


        // =========================
        // KYOGRE
        // =========================

        382: criarListaFormas(
            criarForma(
                "primal",
                "Primal",
                "kyogre-primal"
            )
        ),


        // =========================
        // GROUDON
        // =========================

        383: criarListaFormas(
            criarForma(
                "primal",
                "Primal",
                "groudon-primal"
            )
        ),


        // =========================
        // RAYQUAZA
        // =========================

        384: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "rayquaza-mega"
            )
        ),


        // =========================
        // DEOXYS
        // =========================

        386: criarListaFormas(
            criarForma(
                "attack",
                "Ataque",
                "deoxys-attack"
            ),

            criarForma(
                "defense",
                "Defesa",
                "deoxys-defense"
            ),

            criarForma(
                "speed",
                "Velocidade",
                "deoxys-speed"
            )
        )

    });