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
// Geração 2:
// - Forma normal completa
// - Shiny completo
// - Female quase completo
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
        // GERAÇÃO 1 — KANTO
        // =========================


        // Venusaur - Gigantamax
        "3:gigantamax:normal",
        "3:gigantamax:shiny",


        // Blastoise - Gigantamax
        "9:gigantamax:normal",
        "9:gigantamax:shiny",


        // Raichu - Mega X
        "26:mega-x:normal",
        "26:mega-x:shiny",

        // Raichu - Mega Y
        "26:mega-y:normal",
        "26:mega-y:shiny",


        // Clefable - Mega
        "36:mega:normal",
        "36:mega:shiny",


        // Victreebel - Mega
        "71:mega:normal",
        "71:mega:shiny",


        // Starmie - Mega
        "121:mega:normal",
        "121:mega:shiny",


        // Dragonite - Mega
        "149:mega:normal",
        "149:mega:shiny",


        // =========================
        // GERAÇÃO 2 — JOHTO
        // =========================


        // Meganium - Mega
        "154:mega:normal",
        "154:mega:shiny",


        // Feraligatr - Mega
        "160:mega:normal",
        "160:mega:shiny",


        // Quagsire - Female
        "195:normal:female",
        "195:normal:female-shiny",


        // Sneasel de Hisui - Female
        "215:hisui:female",
        "215:hisui:female-shiny",


        // Skarmory - Mega
        "227:mega:normal",
        "227:mega:shiny"
    ]);


// =========================
// LIMITES DAS ANIMAÇÕES
// =========================

const PRIMEIRO_POKEMON_ANIMADO = 1;
const ULTIMO_POKEMON_ANIMADO = 251;


// =========================
// APARÊNCIA ATUAL
// =========================

// Retorna a aparência usada na chave
// de disponibilidade da animação.
function obterAparenciaAnimacao(
    estadoAparencia
) {
    if (
        estadoAparencia.sexo ===
        "female"
    ) {
        return estadoAparencia.shiny
            ? "female-shiny"
            : "female";
    }


    return estadoAparencia.shiny
        ? "shiny"
        : "normal";
}


// =========================
// CONSULTA
// =========================

export function possuiAnimacaoPokemon(
    pokemon,
    estadoAparencia
) {

    // Atualmente as animações estão
    // disponíveis para Kanto e Johto.
    if (
        pokemon.id <
            PRIMEIRO_POKEMON_ANIMADO ||
        pokemon.id >
            ULTIMO_POKEMON_ANIMADO
    ) {
        return false;
    }


    const aparencia =
        obterAparenciaAnimacao(
            estadoAparencia
        );


    const chave =
        `${pokemon.id}:` +
        `${estadoAparencia.forma}:` +
        `${aparencia}`;


    return (
        !ANIMACOES_INDISPONIVEIS.has(
            chave
        )
    );
}