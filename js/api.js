// Endereço principal da PokéAPI
const API_URL = "https://pokeapi.co/api/v2";


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


// Busca os 151 Pokémon da primeira geração
export async function buscarPokemons() {
    const dados = await buscarDados(
        `${API_URL}/pokemon?limit=151&offset=0`
    );

    // Busca os detalhes de todos os Pokémon
    const pokemonsDetalhados = await Promise.all(
        dados.results.map((pokemon) => {
            return buscarDados(pokemon.url);
        })
    );

    return pokemonsDetalhados;
}


// Busca os dados da espécie do Pokémon
export async function buscarEspecie(pokemon) {
    return await buscarDados(
        pokemon.species.url
    );
}


// Busca a cadeia de evolução de um Pokémon
export async function buscarEvolucoes(pokemon) {
    const especie = await buscarEspecie(pokemon);

    const evolucao = await buscarDados(
        especie.evolution_chain.url
    );

    return evolucao.chain;
}


// Busca os dados de um Pokémon pelo nome
export async function buscarPokemonPorNome(nome) {
    return await buscarDados(
        `${API_URL}/pokemon/${nome}`
    );
}

// Busca dados de uma forma específica pelo identificador da PokéAPI
export async function buscarPokemonPorIdentificador(identificador) {
    return await buscarDados(
        `${API_URL}/pokemon/${identificador}`
    );
}