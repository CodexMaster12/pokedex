// Endereço principal da PokéAPI
const API_URL = "https://pokeapi.co/api/v2";


// Valida se a resposta da API foi bem-sucedida
function validarResposta(resposta) {
    if (!resposta.ok) {
        throw new Error(
            `Erro na PokéAPI: ${resposta.status} ${resposta.statusText}`
        );
    }
}


// Busca os 151 Pokémon da primeira geração
export async function buscarPokemons() {
    const resposta = await fetch(
        `${API_URL}/pokemon?limit=151&offset=0`
    );

    validarResposta(resposta);

    const dados = await resposta.json();

    // Busca os detalhes de cada Pokémon
    const pokemonsDetalhados = await Promise.all(
        dados.results.map(async (pokemon) => {
            const respostaDetalhes = await fetch(pokemon.url);

            validarResposta(respostaDetalhes);

            return await respostaDetalhes.json();
        })
    );

    return pokemonsDetalhados;
}


// Busca a cadeia de evolução de um Pokémon
export async function buscarEvolucoes(pokemon) {
    // Busca os dados da espécie
    const respostaEspecie = await fetch(
        pokemon.species.url
    );

    validarResposta(respostaEspecie);

    const especie = await respostaEspecie.json();

    // Busca a cadeia de evolução
    const respostaEvolucao = await fetch(
        especie.evolution_chain.url
    );

    validarResposta(respostaEvolucao);

    const evolucao = await respostaEvolucao.json();

    return evolucao.chain;
}


// Busca os dados de um Pokémon pelo nome
export async function buscarPokemonPorNome(nome) {
    const resposta = await fetch(
        `${API_URL}/pokemon/${nome}`
    );

    validarResposta(resposta);

    return await resposta.json();
}