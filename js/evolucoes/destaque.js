// =========================
// DESTAQUE DA EVOLUÇÃO
// =========================

export function atualizarDestaqueEvolucao(
    pokemonId,
    formaSelecionada = "normal"
) {
    const itens =
        document.querySelectorAll(
            "#lista-evolucoes .evolucao-item"
        );


    // Remove o destaque atual.
    itens.forEach((item) => {

        item.classList.remove(
            "evolucao-atual"
        );
    });


    const formaProcurada =
        formaSelecionada === "normal"
            ? ""
            : formaSelecionada.toLowerCase();


    const itemAtual =
        Array.from(itens).find(
            (item) => {

                const idItem =
                    Number(
                        item.dataset.pokemonId
                    );


                const formaItem =
                    item.dataset.forma || "";


                return (
                    idItem === pokemonId &&
                    formaItem === formaProcurada
                );
            }
        );


    if (itemAtual) {
        itemAtual.classList.add(
            "evolucao-atual"
        );
    }
}