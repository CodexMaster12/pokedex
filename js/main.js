import { buscarPokemons } from "./api.js";
import { exibirPokemons } from "./pokemon.js";
import { configurarFiltros } from "./filtros.js";

async function iniciarPokedex() {
    const pokemons = await buscarPokemons();

    exibirPokemons(pokemons);

    // Ativa pesquisa, filtro e ordenação
    configurarFiltros(pokemons, exibirPokemons);
}

iniciarPokedex();