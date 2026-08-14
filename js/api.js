// =========================
// CONFIGURAÇÃO DA POKÉAPI
// =========================

// Endereço principal da PokéAPI
const API_URL = "https://pokeapi.co/api/v2";


// Quantidade atual de Pokémon disponíveis no projeto
// Gen 1: #001 - #151
// Gen 2: #152 - #251
const LIMITE_POKEDEX = 251;


// =========================
// FUNÇÃO AUXILIAR
// =========================

// Faz uma requisição e retorna os dados em JSON
async function buscarDados(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(
            `Erro na PokéAPI: ${resposta.status} ${resposta.statusText}`
        );
    }

    return await resposta.json();
}


// =========================
// LISTA DE POKÉMON
// =========================

// Busca todos os Pokémon disponíveis atualmente no projeto
export async function buscarPokemons() {
    const dados = await buscarDados(
        `${API_URL}/pokemon?limit=${LIMITE_POKEDEX}&offset=0`
    );


    // Busca os detalhes de todos os Pokémon
    const pokemonsDetalhados = await Promise.all(
        dados.results.map((pokemon) => {
            return buscarDados(
                pokemon.url
            );
        })
    );


    return pokemonsDetalhados;
}


// =========================
// ESPÉCIE
// =========================

// Busca os dados da espécie do Pokémon
export async function buscarEspecie(pokemon) {
    return await buscarDados(
        pokemon.species.url
    );
}


// =========================
// EVOLUÇÕES
// =========================

// Busca a cadeia de evolução de um Pokémon
export async function buscarEvolucoes(pokemon) {
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


// =========================
// BUSCA POR NOME
// =========================

// Busca os dados de um Pokémon pelo nome
export async function buscarPokemonPorNome(nome) {
    return await buscarDados(
        `${API_URL}/pokemon/${nome}`
    );
}


// =========================
// BUSCA POR FORMA
// =========================

// Busca os dados de uma forma específica
// pelo identificador utilizado pela PokéAPI
export async function buscarPokemonPorIdentificador(
    identificador
) {
    return await buscarDados(
        `${API_URL}/pokemon/${identificador}`
    );
}