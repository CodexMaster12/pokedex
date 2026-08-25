import {
    traduzirTipo
} from "./tipos.js";

import {
    formatarNomePokemon
} from "./nomes-pokemon.js";

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
// UTILIDADES
// =========================

function obterTiposPokemon(
    pokemon
) {
    if (
        !Array.isArray(
            pokemon.types
        )
    ) {
        return [];
    }


    return pokemon.types
        .map(
            (tipo) => {
                return tipo?.type?.name;
            }
        )
        .filter(Boolean);
}


function obterNomeExibicao(
    pokemon
) {
    return formatarNomePokemon(
        pokemon.name
    );
}


// =========================
// TIPOS
// =========================

function carregarTipos(
    pokemons,
    filtroTipo
) {
    const valorAtual =
        filtroTipo.value;


    // Remove apenas os tipos antigos.
    // Mantém "Todos os tipos".
    filtroTipo
        .querySelectorAll(
            'option:not([value="todos"])'
        )
        .forEach(
            (option) => {
                option.remove();
            }
        );


    const tipos =
        pokemons.flatMap(
            (pokemon) => {
                return obterTiposPokemon(
                    pokemon
                );
            }
        );


    const tiposUnicos =
        [
            ...new Set(
                tipos
            )
        ];


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


    // Preserva o tipo selecionado
    // caso ele continue disponível.
    const valorAindaExiste =
        [
            ...filtroTipo.options
        ].some(
            (option) => {
                return (
                    option.value ===
                    valorAtual
                );
            }
        );


    filtroTipo.value =
        valorAindaExiste
            ? valorAtual
            : "todos";
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


    const buscaSemCerquilha =
        textoBusca.replace(
            /^#/,
            ""
        );


    return pokemons.filter(
        (pokemon) => {
            const nomeOriginal =
                pokemon.name
                    .toLowerCase();


            const nomeExibicao =
                obterNomeExibicao(
                    pokemon
                )
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
                nomeOriginal.includes(
                    textoBusca
                ) ||
                nomeExibicao.includes(
                    textoBusca
                ) ||
                numero ===
                    buscaSemCerquilha ||
                numeroFormatado ===
                    buscaSemCerquilha
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
        tipoSelecionado ===
        "todos"
    ) {
        return pokemons;
    }


    return pokemons.filter(
        (pokemon) => {
            const tipos =
                obterTiposPokemon(
                    pokemon
                );


            return tipos.includes(
                tipoSelecionado
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
        geracaoSelecionada ===
        "todas"
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
        regionalSelecionado ===
        "todas"
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
        ordem ===
        "numero-asc"
    ) {
        resultado.sort(
            (a, b) => {
                return a.id - b.id;
            }
        );


        return resultado;
    }


    if (
        ordem ===
        "numero-desc"
    ) {
        resultado.sort(
            (a, b) => {
                return b.id - a.id;
            }
        );


        return resultado;
    }


    if (
        ordem === "nome-az" ||
        ordem === "nome-za"
    ) {
        resultado.sort(
            (a, b) => {
                const nomeA =
                    obterNomeExibicao(
                        a
                    );


                const nomeB =
                    obterNomeExibicao(
                        b
                    );


                const comparacao =
                    nomeA.localeCompare(
                        nomeB,
                        "pt-BR",
                        {
                            sensitivity:
                                "base"
                        }
                    );


                return ordem ===
                    "nome-az"
                        ? comparacao
                        : -comparacao;
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


    if (
        !campoBusca ||
        !filtroTipo ||
        !filtroGeracao ||
        !filtroRegional ||
        !campoOrdenacao
    ) {
        console.warn(
            "Não foi possível configurar todos os filtros da Pokédex."
        );

        return null;
    }


    // =========================
    // FONTE DE DADOS
    // =========================

    let pokemonsAtuais =
        Array.isArray(pokemons)
            ? [...pokemons]
            : [];


    carregarTipos(
        pokemonsAtuais,
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
            [...pokemonsAtuais];


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


        definirPokemonsNavegacao(
            resultado
        );


        exibirPokemons(
            resultado
        );
    }


    // =========================
    // ATUALIZA DADOS
    // =========================

    function atualizarPokemons(
        novosPokemons
    ) {
        if (
            !Array.isArray(
                novosPokemons
            )
        ) {
            return;
        }


        pokemonsAtuais =
            [...novosPokemons];


        // Agora que temos os detalhes,
        // podemos preencher os tipos.
        carregarTipos(
            pokemonsAtuais,
            filtroTipo
        );


        // Preserva busca, geração,
        // região, tipo e ordenação atuais.
        aplicarFiltros();
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


    // =========================
    // CONTROLADOR
    // =========================

    return {
        aplicarFiltros,
        atualizarPokemons
    };
}