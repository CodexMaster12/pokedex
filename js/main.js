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

        /*
            Pesquisa, geração, região e
            ordenação já funcionam usando
            somente ID e nome.

            O filtro de tipos será preenchido
            quando os detalhes terminarem.
        */
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

        /*
            Substitui a lista básica pela
            completa e reaplica os filtros
            que o usuário já estiver usando.

            Também preenche o filtro de tipos.
        */
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