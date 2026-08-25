// =========================
// CONFIGURAÇÃO DA POKÉAPI
// =========================

// Endereço principal da PokéAPI
const API_URL =
    "https://pokeapi.co/api/v2";


// Último Pokémon disponível atualmente
// no projeto.
//
// Gen 1: #001 - #151
// Gen 2: #152 - #251
// Gen 3: #252 - #386
// Gen 4: #387 - #493
// Gen 5: #494 - #649
const LIMITE_POKEDEX = 649;


// =========================
// CACHE
// =========================

// Evita buscar novamente um Pokémon
// que já foi carregado anteriormente.
const CACHE_POKEMON =
    new Map();


// =========================
// FUNÇÃO AUXILIAR
// =========================

async function buscarDados(
    url
) {
    const resposta =
        await fetch(url);


    if (!resposta.ok) {
        throw new Error(
            `Erro na PokéAPI: ${resposta.status} ${resposta.statusText}`
        );
    }


    return await resposta.json();
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
// Não busca os detalhes dos 649 Pokémon.
// Isso permite montar os cards imediatamente.
export async function buscarListaPokemons() {
    const dados =
        await buscarDados(
            `${API_URL}/pokemon?limit=${LIMITE_POKEDEX}&offset=0`
        );


    return dados.results.map(
        (pokemon, indice) => {
            return {
                id:
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
        String(
            identificador
        );


    if (
        CACHE_POKEMON.has(
            chave
        )
    ) {
        return CACHE_POKEMON.get(
            chave
        );
    }


    const pokemon =
        await buscarDados(
            `${API_URL}/pokemon/${identificador}`
        );


    /*
        Guardamos tanto pelo ID quanto
        pelo nome para reutilização futura.
    */
    CACHE_POKEMON.set(
        String(pokemon.id),
        pokemon
    );

    CACHE_POKEMON.set(
        pokemon.name,
        pokemon
    );


    return pokemon;
}


// =========================
// DETALHES DA POKÉDEX
// =========================

// Carrega os detalhes em segundo plano.
//
// Existe um número limitado de workers.
// Cada worker pega um Pokémon de cada vez,
// evitando 649 fetches simultâneos.
export async function buscarPokemonsDetalhados(
    listaPokemons,
    quantidadeWorkers = 30
) {
    const resultados =
        new Array(
            listaPokemons.length
        );


    let proximoIndice = 0;


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


                resultados[
                    indice
                ] = pokemonBase;
            }
        }
    }


    const workers =
        Array.from(
            {
                length:
                    Math.min(
                        quantidadeWorkers,
                        listaPokemons.length
                    )
            },

            () => worker()
        );


    await Promise.all(
        workers
    );


    return resultados;
}


// =========================
// COMPATIBILIDADE
// =========================

// Mantemos esta função caso algum outro
// ponto do projeto ainda utilize
// buscarPokemons().
export async function buscarPokemons() {
    const lista =
        await buscarListaPokemons();


    return await buscarPokemonsDetalhados(
        lista
    );
}


// =========================
// FORMA POR IDENTIFICADOR
// =========================

export async function buscarFormaPokemonPorIdentificador(
    identificador
) {
    return await buscarDados(
        `${API_URL}/pokemon-form/${identificador}`
    );
}


// =========================
// POKÉMON POR NOME
// =========================

export async function buscarPokemonPorNome(
    nome
) {
    return await buscarPokemonPorIdentificador(
        nome
    );
}


// =========================
// ESPÉCIE
// =========================

export async function buscarEspecie(
    pokemon
) {
    return await buscarDados(
        pokemon.species.url
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


    const evolucao =
        await buscarDados(
            especie.evolution_chain.url
        );


    return evolucao.chain;
}