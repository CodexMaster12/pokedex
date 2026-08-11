import {
    traduzirTipo
} from "./tipos.js";


// =========================
// TIPOS
// =========================

// Preenche o filtro com os tipos disponíveis
function carregarTipos(pokemons, filtroTipo) {
    const tipos = pokemons.flatMap((pokemon) => {
        return pokemon.types.map((tipo) => {
            return tipo.type.name;
        });
    });

    const tiposUnicos =
        [...new Set(tipos)];

    tiposUnicos.sort((a, b) => {
        return traduzirTipo(a).localeCompare(
            traduzirTipo(b),
            "pt-BR"
        );
    });

    tiposUnicos.forEach((tipo) => {
        const option =
            document.createElement("option");

        option.value = tipo;
        option.textContent =
            traduzirTipo(tipo);

        filtroTipo.appendChild(option);
    });
}


// =========================
// ORDENAÇÃO
// =========================

function ordenarPokemons(pokemons, ordem) {
    const resultado = [...pokemons];

    switch (ordem) {
        case "nome-az":
            resultado.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });

            break;

        case "nome-za":
            resultado.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });

            break;

        case "numero":
        default:
            resultado.sort((a, b) => {
                return a.id - b.id;
            });
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
        document.getElementById("busca-pokemon");

    const filtroTipo =
        document.getElementById("filtro-tipo");

    const campoOrdenacao =
        document.getElementById("ordenacao");

    carregarTipos(
        pokemons,
        filtroTipo
    );

    function aplicarFiltros() {
        const textoBusca =
            campoBusca.value
                .toLowerCase()
                .trim();

        const tipoSelecionado =
            filtroTipo.value;

        const ordemSelecionada =
            campoOrdenacao.value;

        let resultado = [...pokemons];

        if (textoBusca) {
            resultado = resultado.filter((pokemon) => {
                return pokemon.name
                    .toLowerCase()
                    .includes(textoBusca);
            });
        }

        if (tipoSelecionado !== "todos") {
            resultado = resultado.filter((pokemon) => {
                return pokemon.types.some((tipo) => {
                    return (
                        tipo.type.name ===
                        tipoSelecionado
                    );
                });
            });
        }

        resultado = ordenarPokemons(
            resultado,
            ordemSelecionada
        );

        exibirPokemons(resultado);
    }

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