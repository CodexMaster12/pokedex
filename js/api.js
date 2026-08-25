import {
    LIMITE_POKEDEX_ATUAL
} from "./geracoes.js";


// =========================
// CONFIGURAÇÃO DA POKÉAPI
// =========================

// Endereço principal da PokéAPI.
const API_URL =
    "https://pokeapi.co/api/v2";


// Quantidade padrão de requisições
// simultâneas durante o carregamento
// em segundo plano.
const QUANTIDADE_WORKERS_PADRAO = 30;


// =========================
// CACHE GERAL
// =========================

/*
    Guarda respostas já concluídas.

    Isso evita repetir consultas de:
    - Pokémon
    - espécies
    - evoluções
    - formas
    - lista principal
*/
const CACHE_DADOS =
    new Map();


// Requisições que ainda estão acontecendo.
//
// Se dois pontos do sistema pedirem a mesma
// URL ao mesmo tempo, ambos aguardam a mesma
// Promise em vez de criar dois fetches.
const REQUISICOES_EM_ANDAMENTO =
    new Map();


// =========================
// CACHE DE POKÉMON
// =========================

/*
    Além do cache por URL, mantemos aliases
    por ID e nome.

    Exemplo:

    25
    "25"
    "pikachu"

    podem reutilizar o mesmo objeto.
*/
const CACHE_POKEMON =
    new Map();


// =========================
// UTILIDADES
// =========================

function normalizarIdentificador(
    identificador
) {
    return String(
        identificador
    )
        .trim()
        .toLowerCase();
}


// Extrai o ID numérico de URLs como:
//
// https://pokeapi.co/api/v2/pokemon/25/
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
// FUNÇÃO AUXILIAR
// =========================

async function buscarDados(
    url
) {
    // =========================
    // CACHE CONCLUÍDO
    // =========================

    if (
        CACHE_DADOS.has(
            url
        )
    ) {
        return CACHE_DADOS.get(
            url
        );
    }


    // =========================
    // REQUISIÇÃO EM ANDAMENTO
    // =========================

    if (
        REQUISICOES_EM_ANDAMENTO.has(
            url
        )
    ) {
        return await REQUISICOES_EM_ANDAMENTO.get(
            url
        );
    }


    // =========================
    // NOVA REQUISIÇÃO
    // =========================

    const requisicao =
        (async () => {

            const resposta =
                await fetch(
                    url
                );


            if (!resposta.ok) {
                throw new Error(
                    `Erro na PokéAPI: ${resposta.status} ${resposta.statusText}`
                );
            }


            return await resposta.json();

        })();


    REQUISICOES_EM_ANDAMENTO.set(
        url,
        requisicao
    );


    try {
        const dados =
            await requisicao;


        CACHE_DADOS.set(
            url,
            dados
        );


        return dados;

    } finally {

        /*
            Mesmo se houver erro, removemos a
            Promise da lista de requisições.

            Assim uma tentativa futura poderá
            consultar novamente a API.
        */
        REQUISICOES_EM_ANDAMENTO.delete(
            url
        );
    }
}


// =========================
// LISTA RÁPIDA
// =========================

// Busca somente:
//
// - id
// - nome
// - URL
//
// Não busca os detalhes individuais.
// Isso permite montar os cards rapidamente.
export async function buscarListaPokemons() {
    const dados =
        await buscarDados(
            `${API_URL}/pokemon?limit=${LIMITE_POKEDEX_ATUAL}&offset=0`
        );


    return dados.results.map(
        (
            pokemon,
            indice
        ) => {

            const id =
                extrairIdDaUrl(
                    pokemon.url
                );


            return {
                /*
                    O fallback por índice existe
                    apenas como proteção caso a
                    PokéAPI retorne uma URL
                    inesperada.
                */
                id:
                    id ??
                    indice + 1,

                name:
                    pokemon.name,

                url:
                    pokemon.url,

                types: [],

                carregado:
                    false
            };
        }
    );
}


// =========================
// POKÉMON POR IDENTIFICADOR
// =========================

export async function buscarPokemonPorIdentificador(
    identificador
) {
    const chave =
        normalizarIdentificador(
            identificador
        );


    // =========================
    // CACHE POR ID / NOME
    // =========================

    if (
        CACHE_POKEMON.has(
            chave
        )
    ) {
        return CACHE_POKEMON.get(
            chave
        );
    }


    // =========================
    // CONSULTA
    // =========================

    const pokemon =
        await buscarDados(
            `${API_URL}/pokemon/${encodeURIComponent(chave)}`
        );


    // =========================
    // ALIASES DO CACHE
    // =========================

    CACHE_POKEMON.set(
        String(pokemon.id),
        pokemon
    );


    CACHE_POKEMON.set(
        normalizarIdentificador(
            pokemon.name
        ),
        pokemon
    );


    /*
        Também guardamos a chave solicitada.

        Isso é útil caso a PokéAPI normalize
        algum identificador recebido.
    */
    CACHE_POKEMON.set(
        chave,
        pokemon
    );


    return pokemon;
}


// =========================
// DETALHES DA POKÉDEX
// =========================

// Carrega os detalhes em segundo plano.
//
// Um número limitado de workers busca os
// Pokémon sem disparar centenas de fetches
// simultaneamente.
export async function buscarPokemonsDetalhados(
    listaPokemons,
    quantidadeWorkers =
        QUANTIDADE_WORKERS_PADRAO
) {
    if (
        !Array.isArray(
            listaPokemons
        ) ||
        listaPokemons.length === 0
    ) {
        return [];
    }


    const resultados =
        new Array(
            listaPokemons.length
        );


    let proximoIndice = 0;


    // =========================
    // QUANTIDADE DE WORKERS
    // =========================

    const quantidadeSolicitada =
        Number.isFinite(
            quantidadeWorkers
        )
            ? Math.floor(
                quantidadeWorkers
            )
            : QUANTIDADE_WORKERS_PADRAO;


    const totalWorkers =
        Math.min(
            Math.max(
                quantidadeSolicitada,
                1
            ),
            listaPokemons.length
        );


    // =========================
    // WORKER
    // =========================

    async function worker() {
        while (
            proximoIndice <
            listaPokemons.length
        ) {
            const indice =
                proximoIndice++;


            const pokemonBase =
                listaPokemons[
                    indice
                ];


            try {
                const pokemon =
                    await buscarPokemonPorIdentificador(
                        pokemonBase.id
                    );


                /*
                    Mantemos esta propriedade
                    por compatibilidade com a
                    estrutura atual do projeto.
                */
                pokemon.carregado =
                    true;


                resultados[
                    indice
                ] = pokemon;

            } catch (erro) {

                console.warn(
                    `Não foi possível carregar #${pokemonBase.id} ${pokemonBase.name}.`,
                    erro
                );


                /*
                    Uma falha individual não
                    impede o restante da Pokédex
                    de terminar o carregamento.
                */
                resultados[
                    indice
                ] = pokemonBase;
            }
        }
    }


    // =========================
    // EXECUÇÃO DOS WORKERS
    // =========================

    const workers =
        Array.from(
            {
                length:
                    totalWorkers
            },
            () => worker()
        );


    await Promise.all(
        workers
    );


    return resultados;
}


// =========================
// FORMA POR IDENTIFICADOR
// =========================

export async function buscarFormaPokemonPorIdentificador(
    identificador
) {
    const chave =
        normalizarIdentificador(
            identificador
        );


    return await buscarDados(
        `${API_URL}/pokemon-form/${encodeURIComponent(chave)}`
    );
}


// =========================
// ESPÉCIE
// =========================

export async function buscarEspecie(
    pokemon
) {
    /*
        Pokémon completos normalmente já
        possuem species.url.
    */
    if (
        pokemon?.species?.url
    ) {
        return await buscarDados(
            pokemon.species.url
        );
    }


    /*
        Proteção para objetos básicos da
        lista rápida.

        Para os Pokémon-base da Pokédex,
        o ID nacional também identifica
        corretamente /pokemon-species/.
    */
    if (
        pokemon?.id
    ) {
        return await buscarDados(
            `${API_URL}/pokemon-species/${pokemon.id}`
        );
    }


    throw new Error(
        "Não foi possível identificar a espécie do Pokémon."
    );
}


// =========================
// EVOLUÇÕES
// =========================

export async function buscarEvolucoes(
    pokemon
) {
    const especie =
        await buscarEspecie(
            pokemon
        );


    if (
        !especie?.evolution_chain?.url
    ) {
        throw new Error(
            `Cadeia evolutiva indisponível para ${pokemon?.name ?? "Pokémon desconhecido"}.`
        );
    }


    const evolucao =
        await buscarDados(
            especie.evolution_chain.url
        );


    return evolucao.chain;
}