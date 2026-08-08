// Configura pesquisa, filtro por tipo e ordenação
export function configurarFiltros(pokemons, exibirPokemons) {
    const campoBusca = document.getElementById("busca-pokemon");
    const filtroTipo = document.getElementById("filtro-tipo");
    const campoOrdenacao = document.getElementById("ordenacao");

    // Pega todos os tipos existentes
    const tipos = pokemons.flatMap((pokemon) => {
        return pokemon.types.map((tipo) => tipo.type.name);
    });

    // Remove tipos repetidos e ordena alfabeticamente
    const tiposUnicos = [...new Set(tipos)].sort();

    // Cria as opções do filtro de tipo
    tiposUnicos.forEach((tipo) => {
        const option = document.createElement("option");

        option.value = tipo;
        option.textContent = tipo;

        filtroTipo.appendChild(option);
    });

    // Aplica todos os filtros ao mesmo tempo
    function aplicarFiltros() {
        const textoBusca = campoBusca.value.toLowerCase().trim();
        const tipoSelecionado = filtroTipo.value;
        const ordemSelecionada = campoOrdenacao.value;

        let resultado = [...pokemons];

        // Pesquisa por nome
        resultado = resultado.filter((pokemon) => {
            return pokemon.name.includes(textoBusca);
        });

        // Filtro por tipo
        if (tipoSelecionado !== "todos") {
            resultado = resultado.filter((pokemon) => {
                return pokemon.types.some((tipo) => {
                    return tipo.type.name === tipoSelecionado;
                });
            });
        }

        // Ordenação
        if (ordemSelecionada === "numero") {
            resultado.sort((a, b) => a.id - b.id);
        }

        if (ordemSelecionada === "nome-az") {
            resultado.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        }

        if (ordemSelecionada === "nome-za") {
            resultado.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
        }

        exibirPokemons(resultado);
    }

    // Executa novamente sempre que algum controle mudar
    campoBusca.addEventListener("input", aplicarFiltros);
    filtroTipo.addEventListener("change", aplicarFiltros);
    campoOrdenacao.addEventListener("change", aplicarFiltros);
}