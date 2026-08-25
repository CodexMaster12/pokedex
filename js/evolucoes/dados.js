import {
    buscarPokemonPorIdentificador
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
function extrairIdDaUrl(
    url
) {
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

export function extrairEvolucoes(
    cadeia
) {
    if (
        !cadeia ||
        !cadeia.species
    ) {
        return null;
    }


    const evolucoes =
        Array.isArray(
            cadeia.evolves_to
        )
            ? cadeia.evolves_to
            : [];


    return {
        nome:
            cadeia.species.name,

        id:
            extrairIdDaUrl(
                cadeia.species.url
            ),

        evolucoes:
            evolucoes
                .map(
                    (proximaEvolucao) => {
                        return extrairEvolucoes(
                            proximaEvolucao
                        );
                    }
                )
                .filter(Boolean)
    };
}


// =========================
// BUSCA SEGURA
// =========================

async function buscarPokemonSeguro(
    no
) {
    try {

        /*
            Sempre que tivermos o número
            nacional, usamos o ID.

            A espécie da cadeia de evolução
            nem sempre possui exatamente
            o mesmo nome utilizado pelo
            endpoint /pokemon.

            Exemplos desse tipo de situação
            incluem formas padrão que possuem
            sufixos internos na PokéAPI.
        */
        const identificador =
            no.id ??
            no.nome;


        return await buscarPokemonPorIdentificador(
            identificador
        );


    } catch (erro) {

        /*
            Pokémon permitidos podem continuar
            aparecendo mesmo quando não for
            possível obter seus dados completos.
        */
        if (
            no.id &&
            pokemonDeveAparecer(
                no.id
            )
        ) {
            console.warn(
                `Dados completos de ${no.nome} indisponíveis. Usando placeholder.`,
                erro
            );


            return {
                id:
                    no.id,

                name:
                    no.nome,

                types:
                    [],

                placeholder:
                    true
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
    if (!no) {
        return [];
    }


    /*
        Se o Pokémon não faz parte da Pokédex
        atual nem da lista de futuros, não
        precisamos consultar /pokemon para ele.

        Ainda percorremos os descendentes,
        caso exista algum nó permitido abaixo.
    */
    if (
        no.id &&
        !pokemonDeveAparecer(
            no.id
        )
    ) {
        const descendentes =
            await Promise.all(
                no.evolucoes.map(
                    (evolucao) => {
                        return carregarDadosArvore(
                            evolucao
                        );
                    }
                )
            );


        return descendentes.flat();
    }


    const pokemon =
        await buscarPokemonSeguro(
            no
        );


    /*
        Cada descendente é tratado
        independentemente.

        Assim, uma evolução problemática
        não destrói toda a árvore.
    */
    const resultadosEvolucoes =
        await Promise.allSettled(
            no.evolucoes.map(
                (evolucao) => {
                    return carregarDadosArvore(
                        evolucao
                    );
                }
            )
        );


    let evolucoesValidas =
        resultadosEvolucoes
            .filter(
                (resultado) => {
                    return (
                        resultado.status ===
                        "fulfilled"
                    );
                }
            )
            .flatMap(
                (resultado) => {
                    return resultado.value;
                }
            );


    resultadosEvolucoes
        .filter(
            (resultado) => {
                return (
                    resultado.status ===
                    "rejected"
                );
            }
        )
        .forEach(
            (resultado) => {
                console.warn(
                    "Uma evolução não pôde ser carregada.",
                    resultado.reason
                );
            }
        );


    // =========================
    // EVOLUÇÕES ALTERNATIVAS
    // =========================

    try {
        const alternativas =
            await carregarEvolucoesAlternativas(
                pokemon.id
            );


        evolucoesValidas = [
            ...evolucoesValidas,
            ...alternativas
        ];


    } catch (erro) {

        /*
            Uma forma alternativa com problema
            também não deve destruir a árvore
            principal.
        */
        console.warn(
            `Não foi possível carregar evoluções alternativas de ${pokemon.name}.`,
            erro
        );
    }


    return [
        {
            pokemon,

            numeroExibido:
                no.id ??
                pokemon.id,

            nomeBase:
                no.nome ??
                pokemon.name,

            forma:
                null,

            evolucoes:
                evolucoesValidas
        }
    ];
}