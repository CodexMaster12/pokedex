import {
    montarInterface
} from "./interface/index.js";

import {
    configurarControlesUI
} from "./controles-ui.js";

import {
    buscarPokemons
} from "./api.js";

import {
    exibirPokemons
} from "./pokemon.js";

import {
    configurarFiltros
} from "./filtros.js";

import {
    configurarModal,
    definirPokemonsNavegacao
} from "./modal.js";


// =========================
// INICIALIZAÇÃO DA POKÉDEX
// =========================

async function iniciarPokedex() {
    try {

        // =========================
        // INTERFACE
        // =========================

        montarInterface();

        configurarControlesUI();

        configurarModal();


        // =========================
        // DADOS
        // =========================

        const pokemons =
            await buscarPokemons();


        // =========================
        // NAVEGAÇÃO DO MODAL
        // =========================

        definirPokemonsNavegacao(
            pokemons
        );


        // =========================
        // CARDS
        // =========================

        exibirPokemons(
            pokemons
        );


        // =========================
        // FILTROS
        // =========================

        configurarFiltros(
            pokemons,
            exibirPokemons
        );


    } catch (erro) {
        console.error(
            "Erro ao iniciar a Pokédex:",
            erro
        );
    }
}


// =========================
// INICIAR
// =========================

iniciarPokedex();