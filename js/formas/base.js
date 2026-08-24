// =========================
// ESTRUTURA DAS FORMAS
// =========================


// Cria uma forma no padrão
// utilizado pelo sistema.
//
// Configurações opcionais:
// - permiteShiny
// =========================

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

// Forma normal padrão de todos os Pokémon.
export const FORMA_NORMAL =
    criarForma(
        "normal",
        "Normal"
    );