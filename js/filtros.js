import {
    traduzirTipo
} from "./tipos.js";

import {
    obterGeracaoPorId
} from "./geracoes.js";

import {
    obterFormasPokemon
} from "./formas.js";

import {
    definirPokemonsNavegacao
} from "./modal.js";


// =========================
// CORES DOS TIPOS
// =========================

const CORES_TIPOS = {
    normal: "#a8a878",
    fire: "#f08030",
    water: "#6890f0",
    electric: "#d6b500",
    grass: "#4caf50",
    ice: "#5bc0c0",
    fighting: "#c03028",
    poison: "#a040a0",
    ground: "#b8943f",
    flying: "#8f79df",
    psychic: "#f85888",
    bug: "#8fa317",
    rock: "#9f8730",
    ghost: "#705898",
    dragon: "#7038f8",
    dark: "#705848",
    steel: "#8888a8",
    fairy: "#d97792"
};


// =========================
// TIPOS
// =========================

// Preenche o filtro com os tipos disponíveis.
function carregarTipos(
    pokemons,
    filtroTipo
) {
    const tipos =
        pokemons.flatMap(
            (pokemon) => {

                return pokemon.types.map(
                    (tipo) => {
                        return tipo.type.name;
                    }
                );
            }
        );


    const tiposUnicos =
        [...new Set(tipos)];


    // Ordena pelo nome traduzido.
    tiposUnicos.sort(
        (a, b) => {

            return traduzirTipo(a)
                .localeCompare(
                    traduzirTipo(b),
                    "pt-BR"
                );
        }
    );


    tiposUnicos.forEach(
        (tipo) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                tipo;


            option.textContent =
                traduzirTipo(
                    tipo
                );


            option.style.color =
                CORES_TIPOS[tipo] ||
                "#333";


            option.style.fontWeight =
                "600";


            filtroTipo.appendChild(
                option
            );
        }
    );
}


// =========================
// PESQUISA
// =========================

function filtrarPorPesquisa(
    pokemons,
    textoBusca
) {
    if (!textoBusca) {
        return pokemons;
    }


    return pokemons.filter(
        (pokemon) => {

            const nome =
                pokemon.name
                    .toLowerCase();


            const numero =
                String(
                    pokemon.id
                );


            const numeroFormatado =
                numero.padStart(
                    3,
                    "0"
                );


            return (
                nome.includes(
                    textoBusca
                ) ||

                numero ===
                    textoBusca ||

                numeroFormatado ===
                    textoBusca
            );
        }
    );
}


// =========================
// FILTRO POR TIPO
// =========================

function filtrarPorTipo(
    pokemons,
    tipoSelecionado
) {
    if (
        tipoSelecionado === "todos"
    ) {
        return pokemons;
    }


    return pokemons.filter(
        (pokemon) => {

            return pokemon.types.some(
                (tipo) => {

                    return (
                        tipo.type.name ===
                        tipoSelecionado
                    );
                }
            );
        }
    );
}


// =========================
// FILTRO POR GERAÇÃO
// =========================

function filtrarPorGeracao(
    pokemons,
    geracaoSelecionada
) {
    if (
        geracaoSelecionada === "todas"
    ) {
        return pokemons;
    }


    const numeroGeracao =
        Number(
            geracaoSelecionada
        );


    return pokemons.filter(
        (pokemon) => {

            return (
                obterGeracaoPorId(
                    pokemon.id
                ) ===
                numeroGeracao
            );
        }
    );
}


// =========================
// FILTRO POR FORMA REGIONAL
// =========================

function filtrarPorFormaRegional(
    pokemons,
    regionalSelecionado
) {
    if (
        regionalSelecionado === "todas"
    ) {
        return pokemons;
    }


    return pokemons.filter(
        (pokemon) => {

            const formas =
                obterFormasPokemon(
                    pokemon
                );


            return formas.some(
                (forma) => {

                    return (
                        forma.id ===
                            regionalSelecionado ||

                        forma.id.startsWith(
                            `${regionalSelecionado}-`
                        )
                    );
                }
            );
        }
    );
}


// =========================
// ORDENAÇÃO
// =========================

function ordenarPokemons(
    pokemons,
    ordem
) {
    const resultado =
        [...pokemons];


    if (
        ordem === "numero-asc"
    ) {
        resultado.sort(
            (a, b) => {
                return a.id - b.id;
            }
        );
    }


    if (
        ordem === "numero-desc"
    ) {
        resultado.sort(
            (a, b) => {
                return b.id - a.id;
            }
        );
    }


    if (
        ordem === "nome-az"
    ) {
        resultado.sort(
            (a, b) => {

                return a.name.localeCompare(
                    b.name
                );
            }
        );
    }


    if (
        ordem === "nome-za"
    ) {
        resultado.sort(
            (a, b) => {

                return b.name.localeCompare(
                    a.name
                );
            }
        );
    }


    return resultado;
}


// =========================
// FILTROS
// =========================

export function configurarFiltros(
    pokemons,
    exibirPokemons
) {
    const campoBusca =
        document.getElementById(
            "busca-pokemon"
        );


    const filtroTipo =
        document.getElementById(
            "filtro-tipo"
        );


    const filtroGeracao =
        document.getElementById(
            "filtro-geracao"
        );


    const filtroRegional =
        document.getElementById(
            "filtro-regional"
        );


    const campoOrdenacao =
        document.getElementById(
            "ordenacao"
        );


    carregarTipos(
        pokemons,
        filtroTipo
    );


    // =========================
    // APLICA TODOS OS FILTROS
    // =========================

    function aplicarFiltros() {
        const textoBusca =
            campoBusca.value
                .toLowerCase()
                .trim();


        const tipoSelecionado =
            filtroTipo.value;


        const geracaoSelecionada =
            filtroGeracao.value;


        const regionalSelecionado =
            filtroRegional.value;


        const ordemSelecionada =
            campoOrdenacao.value;


        let resultado =
            [...pokemons];


        resultado =
            filtrarPorPesquisa(
                resultado,
                textoBusca
            );


        resultado =
            filtrarPorTipo(
                resultado,
                tipoSelecionado
            );


        resultado =
            filtrarPorGeracao(
                resultado,
                geracaoSelecionada
            );


        resultado =
            filtrarPorFormaRegional(
                resultado,
                regionalSelecionado
            );


        resultado =
            ordenarPokemons(
                resultado,
                ordemSelecionada
            );


        // Mantém a navegação do modal
        // sincronizada com os cards visíveis.
        definirPokemonsNavegacao(
            resultado
        );


        exibirPokemons(
            resultado
        );
    }


    // =========================
    // EVENTOS
    // =========================

    campoBusca.addEventListener(
        "input",
        aplicarFiltros
    );


    filtroTipo.addEventListener(
        "change",
        aplicarFiltros
    );


    filtroGeracao.addEventListener(
        "change",
        aplicarFiltros
    );


    filtroRegional.addEventListener(
        "change",
        aplicarFiltros
    );


    campoOrdenacao.addEventListener(
        "change",
        aplicarFiltros
    );
}