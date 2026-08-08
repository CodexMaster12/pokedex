// Preenche o filtro com os tipos disponíveis
function carregarTipos(pokemons, filtroTipo) {
    const tipos = pokemons.flatMap((pokemon) => {
        return pokemon.types.map((tipo) => tipo.type.name);
    });

    // Remove tipos repetidos e ordena alfabeticamente
    const tiposUnicos = [...new Set(tipos)].sort();

    tiposUnicos.forEach((tipo) => {
        const option = document.createElement("option");

        option.value = tipo;
        option.textContent = tipo;

        filtroTipo.appendChild(option);
    });
}


// Ordena a lista de Pokémon
function ordenarPokemons(pokemons, ordem) {
    const resultado = [...pokemons];

    if (ordem === "numero") {
        resultado.sort((a, b) => a.id - b.id);
    }

    if (ordem === "nome-az") {
        resultado.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }

    if (ordem === "nome-za") {
        resultado.sort((a, b) => {
            return b.name.localeCompare(a.name);
        });
    }

    return resultado;
}


// Configura pesquisa, filtro por tipo e ordenação
export function configurarFiltros(pokemons, exibirPokemons) {
    const campoBusca = document.getElementById("busca-pokemon");
    const filtroTipo = document.getElementById("filtro-tipo");
    const campoOrdenacao = document.getElementById("ordenacao");

    carregarTipos(pokemons, filtroTipo);


    // Aplica todos os filtros ao mesmo tempo
    function aplicarFiltros() {
        const textoBusca = campoBusca.value
            .toLowerCase()
            .trim();

        const tipoSelecionado = filtroTipo.value;
        const ordemSelecionada = campoOrdenacao.value;

        let resultado = [...pokemons];


        // Pesquisa por nome
        if (textoBusca) {
            resultado = resultado.filter((pokemon) => {
                return pokemon.name
                    .toLowerCase()
                    .includes(textoBusca);
            });
        }


        // Filtra por tipo
        if (tipoSelecionado !== "todos") {
            resultado = resultado.filter((pokemon) => {
                return pokemon.types.some((tipo) => {
                    return tipo.type.name === tipoSelecionado;
                });
            });
        }


        // Ordena o resultado final
        resultado = ordenarPokemons(
            resultado,
            ordemSelecionada
        );


        exibirPokemons(resultado);
    }


    // Executa novamente quando algum controle mudar
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