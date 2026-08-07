import { buscarPokemons } from "./api.js";
import { exibirPokemons } from "./pokemon.js";

async function iniciarPokedex() {
    const pokemons = await buscarPokemons();

    exibirPokemons(pokemons);
}

iniciarPokedex();