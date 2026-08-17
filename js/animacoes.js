// =========================
// ANIMAÇÕES DOS POKÉMON
// =========================
//
// Geração 1:
// - Forma normal completa
// - Shiny completo
// - Female completo
// - Formas alternativas quase completas
//
// Aqui registramos apenas as combinações
// que NÃO possuem animação.
// =========================


// =========================
// EXCEÇÕES
// =========================

const ANIMACOES_INDISPONIVEIS =
    new Set([

        // =========================
        // VENUSAUR
        // =========================

        // Gigantamax
        "3:gigantamax:normal",
        "3:gigantamax:shiny",


        // =========================
        // BLASTOISE
        // =========================

        // Gigantamax
        "9:gigantamax:normal",
        "9:gigantamax:shiny",


        // =========================
        // RAICHU
        // =========================

        // Mega X
        "26:mega-x:normal",
        "26:mega-x:shiny",

        // Mega Y
        "26:mega-y:normal",
        "26:mega-y:shiny",


        // =========================
        // CLEFABLE
        // =========================

        // Gigantamax
        "36:gigantamax:normal",
        "36:gigantamax:shiny",


        // =========================
        // VICTREEBEL
        // =========================

        // Mega
        "71:mega:normal",
        "71:mega:shiny",


        // =========================
        // STARMIE
        // =========================

        // Mega
        "121:mega:normal",
        "121:mega:shiny",


        // =========================
        // DRAGONITE
        // =========================

        // Mega
        "149:mega:normal",
        "149:mega:shiny"
    ]);


// =========================
// CONSULTA
// =========================

export function possuiAnimacaoPokemon(
    pokemon,
    estadoAparencia
) {

    // Por enquanto somente
    // a Geração 1 possui animações.
    if (
        pokemon.id < 1 ||
        pokemon.id > 151
    ) {
        return false;
    }


    // Formas normais da Gen 1
    // possuem animação completa:
    // normal, shiny e female.
    if (
        estadoAparencia.forma ===
        "normal"
    ) {
        return true;
    }


    const aparencia =
        estadoAparencia.shiny
            ? "shiny"
            : "normal";


    const chave =
        `${pokemon.id}:` +
        `${estadoAparencia.forma}:` +
        `${aparencia}`;


    return !ANIMACOES_INDISPONIVEIS.has(
        chave
    );
}