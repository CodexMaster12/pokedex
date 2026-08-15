import {
    buscarPokemonPorNome
} from "../api.js";

import {
    carregarEvolucoesAlternativas
} from "./alternativas.js";

import {
    pokemonDeveAparecer
} from "./configuracao.js";


// =========================
// UTILIDADES
// =========================

// Extrai o número nacional através da URL
// da espécie retornada pela PokéAPI.
function extrairIdDaUrl(url) {
    if (!url) {
        return null;
    }


    const partes =
        url
            .split("/")
            .filter(Boolean);


    const id =
        Number(
            partes[
                partes.length - 1
            ]
        );


    return Number.isNaN(id)
        ? null
        : id;
}


// =========================
// ÁRVORE BÁSICA
// =========================

// Mantém nome e ID da espécie.
// O ID é importante caso o endpoint /pokemon
// daquela espécie não esteja disponível.
export function extrairEvolucoes(cadeia) {
    return {
        nome:
            cadeia.species.name,

        id:
            extrairIdDaUrl(
                cadeia.species.url
            ),

        evolucoes:
            cadeia.evolves_to.map(
                (proximaEvolucao) => {

                    return extrairEvolucoes(
                        proximaEvolucao
                    );
                }
            )
    };
}


// =========================
// BUSCA SEGURA
// =========================

async function buscarPokemonSeguro(no) {
    try {
        return await buscarPokemonPorNome(
            no.nome
        );

    } catch (erro) {

        /*
            Se for um Pokémon futuro que queremos
            mostrar, a ausência de dados não deve
            quebrar todo o modal.

            Exemplo atual:
            Dudunsparce.
        */

        if (
            no.id &&
            pokemonDeveAparecer(no.id)
        ) {
            console.warn(
                `Dados completos de ${no.nome} indisponíveis. Usando placeholder.`
            );


            return {
                id: no.id,

                name: no.nome,

                types: [],

                placeholder: true
            };
        }


        throw erro;
    }
}


// =========================
// CARREGAMENTO DA ÁRVORE
// =========================

export async function carregarDadosArvore(
    no
) {
    const pokemon =
        await buscarPokemonSeguro(
            no
        );


    const evolucoes =
        await Promise.all(
            no.evolucoes.map(
                (evolucao) => {

                    return carregarDadosArvore(
                        evolucao
                    );
                }
            )
        );


    let evolucoesValidas =
        evolucoes.flat();


    // Evoluções alternativas
    // Ex.: Pikachu → Raichu Alola.
    const alternativas =
        await carregarEvolucoesAlternativas(
            pokemon.id
        );


    evolucoesValidas = [
        ...evolucoesValidas,
        ...alternativas
    ];


    // Se não faz parte do projeto nem da
    // lista futura, não mostramos esse nó.
    if (
        !pokemonDeveAparecer(
            pokemon.id
        )
    ) {
        return evolucoesValidas;
    }


    return [
        {
            pokemon,

            numeroExibido:
                pokemon.id,

            nomeBase:
                pokemon.name,

            forma: null,

            evolucoes:
                evolucoesValidas
        }
    ];
}