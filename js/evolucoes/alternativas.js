import {
    buscarPokemonPorIdentificador
} from "../api.js";


// =========================
// EVOLUÇÕES ALTERNATIVAS
// =========================

const EVOLUCOES_ALTERNATIVAS = {

    // =========================
    // GERAÇÃO 1
    // =========================

    // Pikachu → Raichu Alola
    25: [
        {
            numero: 26,
            nome: "raichu",
            api: "raichu-alola",
            forma: "Alola"
        }
    ],


    // Exeggcute → Exeggutor Alola
    102: [
        {
            numero: 103,
            nome: "exeggutor",
            api: "exeggutor-alola",
            forma: "Alola"
        }
    ],


    // Cubone → Marowak Alola
    104: [
        {
            numero: 105,
            nome: "marowak",
            api: "marowak-alola",
            forma: "Alola"
        }
    ],


    // Koffing → Weezing Galar
    109: [
        {
            numero: 110,
            nome: "weezing",
            api: "weezing-galar",
            forma: "Galar"
        }
    ],


    // =========================
    // GERAÇÃO 2
    // =========================

    // Quilava → Typhlosion Hisui
    156: [
        {
            numero: 157,
            nome: "typhlosion",
            api: "typhlosion-hisui",
            forma: "Hisui"
        }
    ],


    // =========================
    // GERAÇÃO 5
    // =========================

    // Dewott → Samurott Hisui
    502: [
        {
            numero: 503,
            nome: "samurott",
            api: "samurott-hisui",
            forma: "Hisui"
        }
    ],


    // Petilil → Lilligant Hisui
    548: [
        {
            numero: 549,
            nome: "lilligant",
            api: "lilligant-hisui",
            forma: "Hisui"
        }
    ],


    // Rufflet → Braviary Hisui
    627: [
        {
            numero: 628,
            nome: "braviary",
            api: "braviary-hisui",
            forma: "Hisui"
        }
    ]

};


// =========================
// CONSULTA
// =========================

export async function carregarEvolucoesAlternativas(
    pokemonId
) {
    const alternativas =
        EVOLUCOES_ALTERNATIVAS[
            pokemonId
        ] || [];


    const resultados =
        await Promise.all(
            alternativas.map(
                async (alternativa) => {
                    try {
                        const pokemon =
                            await buscarPokemonPorIdentificador(
                                alternativa.api
                            );


                        return {
                            pokemon,
                            numeroExibido:
                                alternativa.numero,
                            nomeBase:
                                alternativa.nome,
                            forma:
                                alternativa.forma,
                            evolucoes: []
                        };


                    } catch (erro) {
                        console.warn(
                            `Não foi possível carregar a forma ${alternativa.api}.`,
                            erro
                        );


                        return null;
                    }
                }
            )
        );


    return resultados.filter(
        (resultado) =>
            resultado !== null
    );
}