// =========================
// CONTROLES DA INTERFACE
// =========================

export function configurarControlesUI() {
    const pesquisaContainer =
        document.getElementById(
            "pesquisa-container"
        );


    const botaoPesquisa =
        document.getElementById(
            "botao-pesquisa"
        );


    const campoBusca =
        document.getElementById(
            "busca-pokemon"
        );


    const botaoConfiguracoes =
        document.getElementById(
            "botao-configuracoes"
        );


    const painelConfiguracoes =
        document.getElementById(
            "painel-configuracoes"
        );


    // =========================
    // PESQUISA
    // =========================

    function definirEstadoPesquisa(
        aberta
    ) {
        pesquisaContainer.classList.toggle(
            "ativo",
            aberta
        );


        botaoPesquisa.setAttribute(
            "aria-expanded",
            String(aberta)
        );


        if (aberta) {
            setTimeout(
                () => {
                    campoBusca.focus();
                },
                200
            );
        }
    }


    function abrirPesquisa() {
        definirEstadoPesquisa(
            true
        );
    }


    function fecharPesquisa() {

        // Mantém aberta se houver
        // algum texto pesquisado.
        if (
            campoBusca.value.trim() !== ""
        ) {
            return;
        }


        definirEstadoPesquisa(
            false
        );
    }


    botaoPesquisa.addEventListener(
        "click",
        () => {

            const estaAberta =
                pesquisaContainer.classList.contains(
                    "ativo"
                );


            if (estaAberta) {
                fecharPesquisa();
            } else {
                abrirPesquisa();
            }
        }
    );


    // Fecha ao sair da área de pesquisa,
    // desde que o campo esteja vazio.
    pesquisaContainer.addEventListener(
        "focusout",
        () => {

            setTimeout(
                () => {

                    const focoPermaneceNaPesquisa =
                        pesquisaContainer.contains(
                            document.activeElement
                        );


                    if (
                        !focoPermaneceNaPesquisa
                    ) {
                        fecharPesquisa();
                    }
                },
                100
            );
        }
    );


    // =========================
    // CONFIGURAÇÕES AVANÇADAS
    // =========================

    function definirEstadoConfiguracoes(
        aberto
    ) {
        painelConfiguracoes.classList.toggle(
            "ativo",
            aberto
        );


        botaoConfiguracoes.classList.toggle(
            "ativo",
            aberto
        );


        botaoConfiguracoes.setAttribute(
            "aria-expanded",
            String(aberto)
        );


        painelConfiguracoes.setAttribute(
            "aria-hidden",
            String(!aberto)
        );
    }


    botaoConfiguracoes.addEventListener(
        "click",
        () => {

            const estaAberto =
                painelConfiguracoes.classList.contains(
                    "ativo"
                );


            definirEstadoConfiguracoes(
                !estaAberto
            );
        }
    );
}