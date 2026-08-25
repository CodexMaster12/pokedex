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
        // LISTA RÁPIDA
        // =========================

        const listaPokemons =
            await buscarListaPokemons();


        // =========================
        // NAVEGAÇÃO IMEDIATA
        // =========================

        /*
            A navegação anterior/próximo
            já pode funcionar usando apenas
            número e nome.

            Não precisamos esperar os
            649 detalhes da PokéAPI.
        */
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
        // DETALHES EM SEGUNDO PLANO
        // =========================

        /*
            Os cards já estão visíveis.

            Agora carregamos tipos e demais
            informações sem impedir o uso
            da Pokédex.
        */
        const pokemonsDetalhados =
            await buscarPokemonsDetalhados(
                listaPokemons
            );


        // =========================
        // ATUALIZA NAVEGAÇÃO
        // =========================

        /*
            Substituímos a lista básica pela
            lista completa quando ela estiver
            pronta.
        */
        definirPokemonsNavegacao(
            pokemonsDetalhados
        );


        // =========================
        // CARDS COMPLETOS
        // =========================

        exibirPokemons(
            pokemonsDetalhados
        );


        // =========================
        // FILTROS
        // =========================

        configurarFiltros(
            pokemonsDetalhados,
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