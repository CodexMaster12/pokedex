// =========================
// ESTRUTURA DAS FORMAS
// =========================


// Cria uma forma no padrão
// utilizado pelo sistema.
export function criarForma(
    id,
    nome,
    api = null
) {
    return Object.freeze({
        id,
        nome,
        api
    });
}


// =========================
// FORMA NORMAL
// =========================

// Forma normal padrão de todos os Pokémon.
export const FORMA_NORMAL =
    criarForma(
        "normal",
        "Normal"
    );