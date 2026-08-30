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
// Geração 3:
// - Forma normal completa,
//   exceto Spinda
// - Shiny completo,
//   exceto Spinda
// - Female completo
// - Formas alternativas quase completas
//
// Geração 4:
// - Forma normal completa
// - Shiny completo
// - Female quase completo
// - Formas alternativas quase completas
//
// Geração 5:
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
        // GERAÇÃO 1 — KANTO
        // =========================

        // Venusaur - Gigantamax
        "3:gigantamax:normal",
        "3:gigantamax:shiny",

        // Blastoise - Gigantamax
        "9:gigantamax:normal",
        "9:gigantamax:shiny",


        // =========================
        // PIKACHU — FORMAS ESPECIAIS
        // =========================

        // Belle
        "25:belle:normal",
        "25:belle:shiny",

        // Cosplay
        "25:cosplay:normal",
        "25:cosplay:shiny",

        // Libre
        "25:libre:normal",
        "25:libre:shiny",

        // PhD
        "25:phd:normal",
        "25:phd:shiny",

        // Pop Star
        "25:pop-star:normal",
        "25:pop-star:shiny",

        // Rock Star
        "25:rock-star:normal",
        "25:rock-star:shiny",

        // Original Cap
        "25:cap-original:normal",

        // Hoenn Cap
        "25:cap-hoenn:normal",

        // Sinnoh Cap
        "25:cap-sinnoh:normal",

        // Unova Cap
        "25:cap-unova:normal",

        // Kalos Cap
        "25:cap-kalos:normal",

        // Alola Cap
        "25:cap-alola:normal",

        // Partner Cap
        "25:cap-partner:normal",

        // World Cap
        "25:cap-world:normal",

        // Peakychu
        "25:peakychu:normal",


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
        "227:mega:shiny",


        // =========================
        // GERAÇÃO 3 — HOENN
        // =========================

        // Spinda
        // Somente versão estática.
        "327:normal:normal",
        "327:normal:shiny",

        // Chimecho - Mega
        "358:mega:normal",
        "358:mega:shiny",

        // Absol - Mega Z
        "359:mega-z:normal",
        "359:mega-z:shiny",


        // =========================
        // GERAÇÃO 4 — SINNOH
        // =========================

        // Staraptor - Mega
        "398:mega:normal",
        "398:mega:shiny",

        // Burmy - Sandy
        "412:sandy:normal",
        "412:sandy:shiny",

        // Buizel - Female
        "418:normal:female",
        "418:normal:female-shiny",

        // Floatzel - Female
        "419:normal:female",
        "419:normal:female-shiny",

        // Gabite - Female
        "444:normal:female",
        "444:normal:female-shiny",

        // Garchomp - Mega Z
        "445:mega-z:normal",
        "445:mega-z:shiny",

        // Lucario - Mega Z
        "448:mega-z:normal",
        "448:mega-z:shiny",

        // Froslass - Mega
        "478:mega:normal",
        "478:mega:shiny",

        // Heatran - Mega
        "485:mega:normal",
        "485:mega:shiny",

        // Darkrai - Mega
        "491:mega:normal",
        "491:mega:shiny",

        // Arceus - Unknown
        "493:unknown:normal",
        "493:unknown:shiny",


        // =========================
        // GERAÇÃO 5 — UNOVA
        // =========================

        // Emboar - Mega
        "500:mega:normal",
        "500:mega:shiny",

        // Excadrill - Mega
        "530:mega:normal",
        "530:mega:shiny",

        // Scolipede - Mega
        "545:mega:normal",
        "545:mega:shiny",

        // Darmanitan - Galar
        "555:galar:normal",
        "555:galar:shiny",

        // Scrafty - Mega
        "560:mega:normal",
        "560:mega:shiny",

        // Eelektross - Mega
        "604:mega:normal",
        "604:mega:shiny",

        // Chandelure - Mega
        "609:mega:normal",
        "609:mega:shiny",

        // Golurk - Mega
        "623:mega:normal",
        "623:mega:shiny",

        // Meloetta - Pirouette
        // Normal possui animação,
        // Shiny não possui.
        "648:pirouette:shiny"
    ]);


// =========================
// LIMITES DAS ANIMAÇÕES
// =========================

const PRIMEIRO_POKEMON_ANIMADO = 1;
const ULTIMO_POKEMON_ANIMADO = 649;


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
    // disponíveis da Geração 1
    // até a Geração 5.

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