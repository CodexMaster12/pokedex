// Endereço principal da PokéAPI
const API_URL = "https://pokeapi.co/api/v2";

// Busca os 151 Pokémon da primeira geração
export async function buscarPokemons() {
    const resposta = await fetch(`${API_URL}/pokemon?limit=151&offset=0`);
    const dados = await resposta.json();

    // Busca os detalhes de cada Pokémon
    const pokemonsDetalhados = await Promise.all(
        dados.results.map(async (pokemon) => {
            const respostaDetalhes = await fetch(pokemon.url);
            return await respostaDetalhes.json();
        })
    );

    return pokemonsDetalhados;
}