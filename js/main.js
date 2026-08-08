import { buscarPokemons } from "./api.js";
import { exibirPokemons } from "./pokemon.js";
import { configurarFiltros } from "./filtros.js";
import { configurarModal } from "./modal.js";


// Inicializa a Pokédex
async function iniciarPokedex() {
    try {
        // Busca os Pokémon na API
        const pokemons = await buscarPokemons();

        // Exibe os cards
        exibirPokemons(pokemons);

        // Ativa pesquisa, filtro e ordenação
        configurarFiltros(pokemons, exibirPokemons);

        // Ativa abertura e fechamento do modal
        configurarModal();

    } catch (erro) {
        console.error("Erro ao iniciar a Pokédex:", erro);
    }
}


iniciarPokedex();