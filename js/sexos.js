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