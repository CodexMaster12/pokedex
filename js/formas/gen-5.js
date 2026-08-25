import {
    criarForma,
    FORMA_NORMAL
} from "./base.js";


// =========================
// FUNÇÕES AUXILIARES
// =========================

// Cria a lista de formas incluindo
// sempre a forma normal.
function criarListaFormas(
    ...formas
) {
    return Object.freeze([
        FORMA_NORMAL,
        ...formas
    ]);
}


// Permite alterar somente o nome
// visual da forma normal.
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
// FORMAS — GERAÇÃO 5
// =========================

export const FORMAS_GEN_5 =
    Object.freeze({

        // =========================
        // EMBOAR
        // =========================

        500: criarListaFormas(
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // =========================
        // SAMUROTT
        // =========================

        503: criarListaFormas(
            criarForma(
                "hisui",
                "Hisui",
                "samurott-hisui"
            )
        ),


        // =========================
        // EXCADRILL
        // =========================

        530: criarListaFormas(
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // =========================
        // AUDINO
        // =========================

        531: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "audino-mega"
            )
        ),


        // =========================
        // SCOLIPEDE
        // =========================

        545: criarListaFormas(
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // =========================
        // LILLIGANT
        // =========================

        549: criarListaFormas(
            criarForma(
                "hisui",
                "Hisui",
                "lilligant-hisui"
            )
        ),


        // =========================
        // BASCULIN
        // =========================

        // Forma normal:
        // Red-Striped Form
        550: criarListaFormasComNomeNormal(
            "Red-Striped",

            criarForma(
                "blue",
                "Blue-Striped",
                "basculin-blue-striped"
            ),

            criarForma(
                "white",
                "White-Striped",
                "basculin-white-striped"
            )
        ),


        // =========================
        // DARUMAKA
        // =========================

        554: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "darumaka-galar"
            )
        ),


        // =========================
        // DARMANITAN
        // =========================

        555: criarListaFormasComNomeNormal(
            "Standard",

            criarForma(
                "zen",
                "Zen",
                "darmanitan-zen"
            ),

            criarForma(
                "galar",
                "Galar",
                "darmanitan-galar-standard"
            ),

            criarForma(
                "galar-zen",
                "Galar Zen",
                "darmanitan-galar-zen"
            )
        ),


        // =========================
        // SCRAFTY
        // =========================

        560: criarListaFormas(
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // =========================
        // YAMASK
        // =========================

        562: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "yamask-galar"
            )
        ),


        // =========================
        // GARBODOR
        // =========================

        569: criarListaFormas(
            criarForma(
                "gmax",
                "Gigantamax",
                "garbodor-gmax"
            )
        ),


        // =========================
        // ZORUA
        // =========================

        570: criarListaFormas(
            criarForma(
                "hisui",
                "Hisui",
                "zorua-hisui"
            )
        ),


        // =========================
        // ZOROARK
        // =========================

        571: criarListaFormas(
            criarForma(
                "hisui",
                "Hisui",
                "zoroark-hisui"
            )
        ),


        // =========================
        // DEERLING
        // =========================

        // Forma normal:
        // Spring
        585: criarListaFormasComNomeNormal(
            "Spring",

            criarForma(
                "summer",
                "Summer"
            ),

            criarForma(
                "autumn",
                "Autumn"
            ),

            criarForma(
                "winter",
                "Winter"
            )
        ),


        // =========================
        // SAWSBUCK
        // =========================

        // Forma normal:
        // Spring
        586: criarListaFormasComNomeNormal(
            "Spring",

            criarForma(
                "summer",
                "Summer"
            ),

            criarForma(
                "autumn",
                "Autumn"
            ),

            criarForma(
                "winter",
                "Winter"
            )
        ),


        // =========================
        // EELEKTROSS
        // =========================

        604: criarListaFormas(
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // =========================
        // CHANDELURE
        // =========================

        609: criarListaFormas(
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // =========================
        // STUNFISK
        // =========================

        618: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "stunfisk-galar"
            )
        ),


        // =========================
        // GOLURK
        // =========================

        623: criarListaFormas(
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // =========================
        // BRAVIARY
        // =========================

        628: criarListaFormas(
            criarForma(
                "hisui",
                "Hisui",
                "braviary-hisui"
            )
        ),


        // =========================
        // TORNADUS
        // =========================

        641: criarListaFormasComNomeNormal(
            "Incarnate",

            criarForma(
                "therian",
                "Therian",
                "tornadus-therian"
            )
        ),


        // =========================
        // THUNDURUS
        // =========================

        642: criarListaFormasComNomeNormal(
            "Incarnate",

            criarForma(
                "therian",
                "Therian",
                "thundurus-therian"
            )
        ),


        // =========================
        // LANDORUS
        // =========================

        645: criarListaFormasComNomeNormal(
            "Incarnate",

            criarForma(
                "therian",
                "Therian",
                "landorus-therian"
            )
        ),


        // =========================
        // KYUREM
        // =========================

        646: criarListaFormas(
            criarForma(
                "black",
                "Black",
                "kyurem-black"
            ),

            criarForma(
                "white",
                "White",
                "kyurem-white"
            )
        ),


        // =========================
        // KELDEO
        // =========================

        647: criarListaFormasComNomeNormal(
            "Ordinary",

            criarForma(
                "resolute",
                "Resolute",
                "keldeo-resolute"
            )
        ),


        // =========================
        // MELOETTA
        // =========================

        648: criarListaFormasComNomeNormal(
            "Aria",

            criarForma(
                "pirouette",
                "Pirouette",
                "meloetta-pirouette"
            )
        ),


        // =========================
        // GENESECT
        // =========================

        649: criarListaFormas(
            criarForma(
                "burn",
                "Burn Drive"
            ),

            criarForma(
                "chill",
                "Chill Drive"
            ),

            criarForma(
                "douse",
                "Douse Drive"
            ),

            criarForma(
                "shock",
                "Shock Drive"
            )
        )

    });