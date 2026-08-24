// =========================
// ESTRUTURA DE SEXO
// =========================


// Cria uma configuração padrão
// de diferença visual entre sexos.
export function criarDiferencaSexo(
    formas = [
        "normal"
    ],
    sexoPadrao = "male"
) {
    return Object.freeze({
        sexoPadrao,

        formas:
            Object.freeze([
                ...formas
            ])
    });
}