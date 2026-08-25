// =========================
// ESTRUTURA DAS FORMAS
// =========================


// Cria uma forma no padrão
// utilizado pelo sistema.
//
// Configurações opcionais:
// - permiteShiny
export function criarForma(
    id,
    nome,
    api = null,
    configuracao = {}
) {
    const {
        permiteShiny = true
    } = configuracao;


    return Object.freeze({
        id,
        nome,
        api,
        permiteShiny
    });
}


// =========================
// FORMA NORMAL
// =========================

// Forma normal padrão
// de todos os Pokémon.
export const FORMA_NORMAL =
    criarForma(
        "normal",
        "Normal"
    );


// =========================
// LISTA DE FORMAS
// =========================

// Cria uma lista incluindo sempre
// a forma normal padrão.
export function criarListaFormas(
    ...formas
) {
    return Object.freeze([
        FORMA_NORMAL,
        ...formas
    ]);
}


// =========================
// LISTA COM NOME NORMAL
// =========================

// Cria uma lista permitindo alterar
// somente o nome visual da forma normal.
//
// Exemplos:
//
// Basculin:
// Normal → Red-Striped
//
// Darmanitan:
// Normal → Standard
//
// Shaymin:
// Normal → Land
export function criarListaFormasComNomeNormal(
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