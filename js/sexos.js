// =========================
// DIFERENÇAS ENTRE SEXOS
// =========================
//
// Registra apenas os Pokémon
// que possuem diferença visual
// entre macho e fêmea.
//
// A diferença pode existir somente
// em determinadas formas.
// =========================


// =========================
// CONFIGURAÇÕES
// =========================

const DIFERENCAS_SEXO = {

    // =========================
    // GERAÇÃO 1 — KANTO
    // =========================

    // Venusaur
    3: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Butterfree
    12: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Rattata
    19: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Raticate
    20: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Pikachu
    25: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Raichu
    26: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Zubat
    41: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Golbat
    42: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Gloom
    44: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Vileplume
    45: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Kadabra
    64: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Alakazam
    65: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Doduo
    84: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Dodrio
    85: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Hypno
    97: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Rhyhorn
    111: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Rhydon
    112: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Goldeen
    118: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Seaking
    119: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Scyther
    123: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Magikarp
    129: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Gyarados
    130: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Eevee
    133: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // =========================
    // GERAÇÃO 2 — JOHTO
    // =========================


    // Meganium
    154: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Ledyba
    165: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Ledian
    166: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Xatu
    178: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Sudowoodo
    185: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Politoed
    186: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Aipom
    190: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Wooper
    194: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Quagsire
    195: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Murkrow
    198: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Wobbuffet
    202: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Girafarig
    203: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Gligar
    207: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Steelix
    208: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Scizor
    212: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Heracross
    214: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Sneasel
    215: {
        sexoPadrao: "male",

        formas: [
            "normal",
            "hisui"
        ]
    },


    // Ursaring
    217: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Piloswine
    221: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Octillery
    224: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Houndoom
    229: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    },


    // Donphan
    232: {
        sexoPadrao: "male",
        formas: [
            "normal"
        ]
    }

};


// =========================
// CONSULTAS
// =========================

// Retorna a configuração de sexo
// do Pokémon.
export function obterConfiguracaoSexo(
    pokemon
) {
    return (
        DIFERENCAS_SEXO[pokemon.id] ||
        null
    );
}


// Verifica se o Pokémon possui
// diferença visual de sexo
// na forma selecionada.
export function possuiDiferencaSexo(
    pokemon,
    formaSelecionada = "normal"
) {
    const configuracao =
        obterConfiguracaoSexo(
            pokemon
        );


    if (!configuracao) {
        return false;
    }


    return configuracao.formas.includes(
        formaSelecionada
    );
}


// Retorna o sexo visual padrão.
export function obterSexoPadrao(
    pokemon
) {
    const configuracao =
        obterConfiguracaoSexo(
            pokemon
        );


    return configuracao
        ? configuracao.sexoPadrao
        : "male";
}