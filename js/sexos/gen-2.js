import {
    criarDiferencaSexo
} from "./base.js";


// =========================
// DIFERENÇAS DE SEXO — GEN 2
// =========================

export const DIFERENCAS_SEXO_GEN_2 =
    Object.freeze({

        154: criarDiferencaSexo(), // Meganium
        165: criarDiferencaSexo(), // Ledyba
        166: criarDiferencaSexo(), // Ledian
        178: criarDiferencaSexo(), // Xatu
        185: criarDiferencaSexo(), // Sudowoodo
        186: criarDiferencaSexo(), // Politoed
        190: criarDiferencaSexo(), // Aipom
        194: criarDiferencaSexo(), // Wooper
        195: criarDiferencaSexo(), // Quagsire
        198: criarDiferencaSexo(), // Murkrow
        202: criarDiferencaSexo(), // Wobbuffet
        203: criarDiferencaSexo(), // Girafarig
        207: criarDiferencaSexo(), // Gligar
        208: criarDiferencaSexo(), // Steelix
        212: criarDiferencaSexo(), // Scizor
        214: criarDiferencaSexo(), // Heracross

        // Sneasel
        //
        // Possui diferença visual
        // também na forma de Hisui.
        215: criarDiferencaSexo([
            "normal",
            "hisui"
        ]),

        217: criarDiferencaSexo(), // Ursaring
        221: criarDiferencaSexo(), // Piloswine
        224: criarDiferencaSexo(), // Octillery
        229: criarDiferencaSexo(), // Houndoom
        232: criarDiferencaSexo()  // Donphan

    });