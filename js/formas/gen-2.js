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
// UNOWN
// =========================

// A forma A usa internamente "normal"
// para continuar usando:
// gen-2/normal/201.png
// gen-2/shiny/201.png
const FORMA_UNOWN_A =
    criarForma(
        "normal",
        "A"
    );


const FORMAS_UNOWN =
    Object.freeze([
        FORMA_UNOWN_A,

        ..."bcdefghijklmnopqrstuvwxyz"
            .split("")
            .map(
                (letra) => {

                    return criarForma(
                        letra,
                        letra.toUpperCase()
                    );
                }
            ),

        criarForma(
            "exclamation",
            "!"
        ),

        criarForma(
            "question",
            "?"
        )
    ]);


// =========================
// FORMAS — GERAÇÃO 2
// =========================

export const FORMAS_GEN_2 =
    Object.freeze({

        // Meganium
        154: criarListaFormas(

            // Mega recente:
            // imagem disponível,
            // dados ainda não integrados.
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // Typhlosion
        157: criarListaFormas(
            criarForma(
                "hisui",
                "Hisui",
                "typhlosion-hisui"
            )
        ),


        // Feraligatr
        160: criarListaFormas(

            // Mega recente:
            // imagem disponível,
            // dados ainda não integrados.
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // Ampharos
        181: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "ampharos-mega"
            )
        ),


        // Wooper
        194: criarListaFormas(
            criarForma(
                "paldea",
                "Paldea",
                "wooper-paldea"
            )
        ),


        // Slowking
        199: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "slowking-galar"
            )
        ),


        // Unown
        201: FORMAS_UNOWN,


        // Steelix
        208: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "steelix-mega"
            )
        ),


        // Qwilfish
        211: criarListaFormas(
            criarForma(
                "hisui",
                "Hisui",
                "qwilfish-hisui"
            )
        ),


        // Scizor
        212: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "scizor-mega"
            )
        ),


        // Heracross
        214: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "heracross-mega"
            )
        ),


        // Sneasel
        215: criarListaFormas(
            criarForma(
                "hisui",
                "Hisui",
                "sneasel-hisui"
            )
        ),


        // Corsola
        222: criarListaFormas(
            criarForma(
                "galar",
                "Galar",
                "corsola-galar"
            )
        ),


        // Skarmory
        227: criarListaFormas(

            // Mega recente:
            // imagem disponível,
            // dados ainda não integrados.
            criarForma(
                "mega",
                "Mega"
            )
        ),


        // Houndoom
        229: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "houndoom-mega"
            )
        ),


        // Tyranitar
        248: criarListaFormas(
            criarForma(
                "mega",
                "Mega",
                "tyranitar-mega"
            )
        )

    });