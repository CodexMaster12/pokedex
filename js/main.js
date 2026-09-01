import {
    montarInterface
} from "./interface/index.js";

import {
    configurarControlesUI
} from "./controles-ui.js";

import {
    buscarListaPokemons,
    buscarPokemonsDetalhados
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

import {
    aplicarTemaInicial,
    configurarTema
} from "./tema.js";


// =========================
// TEMA INICIAL
// =========================

aplicarTemaInicial();


// =========================
// INICIALIZAÇÃO DA POKÉDEX
// =========================

async function iniciarPokedex() {
    try {

        // =========================
        // INTERFACE
        // =========================

        montarInterface();

        configurarTema();

        configurarControlesUI();

        configurarModal();


        // =========================
        // LISTA RÁPIDA
        // =========================

        const listaPokemons =
            await buscarListaPokemons();


        // =========================
        // NAVEGAÇÃO IMEDIATA
        // =========================

        definirPokemonsNavegacao(
            listaPokemons
        );


        // =========================
        // CARDS IMEDIATOS
        // =========================

        exibirPokemons(
            listaPokemons
        );


        // =========================
        // FILTROS IMEDIATOS
        // =========================

        const controladorFiltros =
            configurarFiltros(
                listaPokemons,
                exibirPokemons
            );


        // =========================
        // DETALHES EM SEGUNDO PLANO
        // =========================

        const pokemonsDetalhados =
            await buscarPokemonsDetalhados(
                listaPokemons
            );


        // =========================
        // ATUALIZA FILTROS
        // =========================

        controladorFiltros
            ?.atualizarPokemons(
                pokemonsDetalhados
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