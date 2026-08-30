import {
    DIFERENCAS_SEXO_GEN_1
} from "./gen-1.js";

import {
    DIFERENCAS_SEXO_GEN_2
} from "./gen-2.js";

import {
    DIFERENCAS_SEXO_GEN_3
} from "./gen-3.js";

import {
    DIFERENCAS_SEXO_GEN_4
} from "./gen-4.js";

import {
    DIFERENCAS_SEXO_GEN_5
} from "./gen-5.js";

import {
    DIFERENCAS_SEXO_GEN_6
} from "./gen-6.js";


// =========================
// REGISTRO GLOBAL
// =========================

// Reúne todas as diferenças
// visuais de sexo cadastradas
// nas gerações disponíveis.

const DIFERENCAS_SEXO =
    Object.freeze({
        ...DIFERENCAS_SEXO_GEN_1,
        ...DIFERENCAS_SEXO_GEN_2,
        ...DIFERENCAS_SEXO_GEN_3,
        ...DIFERENCAS_SEXO_GEN_4,
        ...DIFERENCAS_SEXO_GEN_5,
        ...DIFERENCAS_SEXO_GEN_6
    });


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