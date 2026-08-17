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
// FORMAS — GERAÇÃO 1
// =========================

export const FORMAS_GEN_1 =
    Object.freeze({

        // =========================
        // VENUSAUR
        // =========================

        3: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "venusaur-mega"
            ),

            criarForma(
                "gigantamax",
                "Gigantamax",
                "venusaur-gmax"
            )
        ),


        // =========================
        // CHARIZARD
        // =========================

        6: criarListaFormas(
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
        ),


        // =========================
        // BLASTOISE
        // =========================

        9: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "blastoise-mega"
            ),

            criarForma(
                "gigantamax",
                "Gigantamax",
                "blastoise-gmax"
            )
        ),


        // Butterfree
        12: criarListaFormas(
            criarForma(
                "gigantamax",
                "Gigantamax",
                "butterfree-gmax"
            )
        ),


        // Beedrill
        15: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "beedrill-mega"
            )
        ),


        // Pidgeot
        18: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "pidgeot-mega"
            )
        ),


        // Rattata
        19: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "rattata-alola"
            )
        ),


        // Raticate
        20: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "raticate-alola"
            )
        ),


        // Pikachu
        25: criarListaFormas(
            criarForma(
                "gigantamax",
                "Gigantamax",
                "pikachu-gmax"
            )
        ),


        // =========================
        // RAICHU
        // =========================

        26: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "raichu-alola"
            ),

            criarForma(
                "mega-x",
                "Mega X",
                "raichu-mega-x"
            ),

            criarForma(
                "mega-y",
                "Mega Y",
                "raichu-mega-y"
            )
        ),


        // Sandshrew
        27: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "sandshrew-alola"
            )
        ),


        // Sandslash
        28: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "sandslash-alola"
            )
        ),


        // Clefable
        36: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "clefable-mega"
            )
        ),


        // Vulpix
        37: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "vulpix-alola"
            )
        ),


        // Ninetales
        38: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "ninetales-alola"
            )
        ),


        // Diglett
        50: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "diglett-alola"
            )
        ),


        // Dugtrio
        51: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "dugtrio-alola"
            )
        ),


        // =========================
        // MEOWTH
        // =========================

        52: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "meowth-alola"
            ),

            criarForma(
                "galar",
                "Galar",
                "meowth-galar"
            ),

            criarForma(
                "gigantamax",
                "Gigantamax",
                "meowth-gmax"
            )
        ),


        // Persian
        53: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "persian-alola"
            )
        ),


        // Growlithe
        58: criarListaFormas(
            criarForma(
                "hisui",
                "Hisui",
                "growlithe-hisui"
            )
        ),


        // Arcanine
        59: criarListaFormas(
            criarForma(
                "hisui",
                "Hisui",
                "arcanine-hisui"
            )
        ),


        // Alakazam
        65: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "alakazam-mega"
            )
        ),


        // Machamp
        68: criarListaFormas(
            criarForma(
                "gigantamax",
                "Gigantamax",
                "machamp-gmax"
            )
        ),


        // Victreebel
        71: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "victreebel-mega"
            )
        ),


        // Geodude
        74: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "geodude-alola"
            )
        ),


        // Graveler
        75: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "graveler-alola"
            )
        ),


        // Golem
        76: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "golem-alola"
            )
        ),


        // Ponyta
        77: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "ponyta-galar"
            )
        ),


        // Rapidash
        78: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "rapidash-galar"
            )
        ),


        // Slowpoke
        79: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "slowpoke-galar"
            )
        ),


        // =========================
        // SLOWBRO
        // =========================

        80: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "slowbro-mega"
            ),

            criarForma(
                "galar",
                "Galar",
                "slowbro-galar"
            )
        ),


        // Farfetch'd
        83: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "farfetchd-galar"
            )
        ),


        // Grimer
        88: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "grimer-alola"
            )
        ),


        // Muk
        89: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "muk-alola"
            )
        ),


        // =========================
        // GENGAR
        // =========================

        94: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "gengar-mega"
            ),

            criarForma(
                "gigantamax",
                "Gigantamax",
                "gengar-gmax"
            )
        ),


        // Kingler
        99: criarListaFormas(
            criarForma(
                "gigantamax",
                "Gigantamax",
                "kingler-gmax"
            )
        ),


        // Voltorb
        100: criarListaFormas(
            criarForma(
                "hisui",
                "Hisui",
                "voltorb-hisui"
            )
        ),


        // Electrode
        101: criarListaFormas(
            criarForma(
                "hisui",
                "Hisui",
                "electrode-hisui"
            )
        ),


        // Exeggutor
        103: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "exeggutor-alola"
            )
        ),


        // Marowak
        105: criarListaFormas(
            criarForma(
                "alola",
                "Alola",
                "marowak-alola"
            )
        ),


        // Weezing
        110: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "weezing-galar"
            )
        ),


        // Kangaskhan
        115: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "kangaskhan-mega"
            )
        ),


        // Starmie
        121: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "starmie-mega"
            )
        ),


        // Mr. Mime
        122: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "mr-mime-galar"
            )
        ),


        // Pinsir
        127: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "pinsir-mega"
            )
        ),


        // =========================
        // TAUROS
        // =========================

        128: criarListaFormas(
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
        ),


        // Gyarados
        130: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "gyarados-mega"
            )
        ),


        // Lapras
        131: criarListaFormas(
            criarForma(
                "gigantamax",
                "Gigantamax",
                "lapras-gmax"
            )
        ),


        // Eevee
        133: criarListaFormas(
            criarForma(
                "gigantamax",
                "Gigantamax",
                "eevee-gmax"
            )
        ),


        // Aerodactyl
        142: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "aerodactyl-mega"
            )
        ),


        // Snorlax
        143: criarListaFormas(
            criarForma(
                "gigantamax",
                "Gigantamax",
                "snorlax-gmax"
            )
        ),


        // Articuno
        144: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "articuno-galar"
            )
        ),


        // Zapdos
        145: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "zapdos-galar"
            )
        ),


        // Moltres
        146: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "moltres-galar"
            )
        ),


        // Dragonite
        149: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "dragonite-mega"
            )
        ),


        // =========================
        // MEWTWO
        // =========================

        150: criarListaFormas(
            criarForma(
                "mega-x",
                "Mega X",
                "mewtwo-mega-x"
            ),

            criarForma(
                "mega-y",
                "Mega Y",
                "mewtwo-mega-y"
            )
        )

    });