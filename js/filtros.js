import {
    traduzirTipo
} from "./tipos.js";


// =========================
// TIPOS
// =========================

// Preenche o filtro com os tipos disponíveis
function carregarTipos(
    pokemons,
    filtroTipo
) {
    const tipos =
        pokemons.flatMap((pokemon) => {
            return pokemon.types.map(
                (tipo) => tipo.type.name
            );
        });


    // Remove tipos repetidos
    const tiposUnicos =
        [...new Set(tipos)];


    // Ordena pelo nome traduzido
    tiposUnicos.sort((a, b) => {
        return traduzirTipo(a).localeCompare(
            traduzirTipo(b),
            "pt-BR"
        );
    });


    tiposUnicos.forEach((tipo) => {
        const option =
            document.createElement(
                "option"
            );


        // Mantém o valor original da PokéAPI
        option.value = tipo;


        // Exibe o nome traduzido
        option.textContent =
            traduzirTipo(tipo);

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

option.style.color =
    CORES_TIPOS[tipo] || "#333";

option.style.fontWeight =
    "600";


        filtroTipo.appendChild(
            option
        );
    });
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


    // Número menor → maior
    if (ordem === "numero-asc") {
        resultado.sort(
            (a, b) => a.id - b.id
        );
    }


    // Número maior → menor
    if (ordem === "numero-desc") {
        resultado.sort(
            (a, b) => b.id - a.id
        );
    }


    // Nome A-Z
    if (ordem === "nome-az") {
        resultado.sort(
            (a, b) => {
                return a.name.localeCompare(
                    b.name
                );
            }
        );
    }


    // Nome Z-A
    if (ordem === "nome-za") {
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


        const ordemSelecionada =
            campoOrdenacao.value;


        let resultado =
            [...pokemons];


        // =========================
        // PESQUISA POR NOME OU NÚMERO
        // =========================

        if (textoBusca) {
            resultado =
                resultado.filter(
                    (pokemon) => {

                        const nome =
                            pokemon.name
                                .toLowerCase();


                        const numero =
                            String(
                                pokemon.id
                            );


                        const numeroFormatado =
                            String(
                                pokemon.id
                            ).padStart(
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

        if (
            tipoSelecionado !== "todos"
        ) {
            resultado =
                resultado.filter(
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
        // ORDENAÇÃO
        // =========================

        resultado =
            ordenarPokemons(
                resultado,
                ordemSelecionada
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


    campoOrdenacao.addEventListener(
        "change",
        aplicarFiltros
    );
}