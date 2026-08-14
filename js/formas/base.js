// =========================
// ESTRUTURA DAS FORMAS
// =========================


// Cria uma forma no padrão usado pelo sistema
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


// Forma normal padrão
export const FORMA_NORMAL =
    criarForma(
        "normal",
        "Normal"
    );