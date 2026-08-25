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
    // VALIDAÇÃO
    // =========================

    if (
        !pesquisaContainer ||
        !botaoPesquisa ||
        !campoBusca ||
        !botaoConfiguracoes ||
        !painelConfiguracoes
    ) {
        console.warn(
            "Não foi possível configurar todos os controles da interface."
        );

        return;
    }


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


        botaoPesquisa.setAttribute(
            "aria-label",
            aberta
                ? "Fechar pesquisa"
                : "Abrir pesquisa"
        );


        /*
            Quando a pesquisa está recolhida,
            o campo não deve participar da
            navegação por teclado nem ser
            anunciado por leitores de tela.
        */
        campoBusca.tabIndex =
            aberta
                ? 0
                : -1;


        campoBusca.setAttribute(
            "aria-hidden",
            String(!aberta)
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
            return false;
        }


        definirEstadoPesquisa(
            false
        );


        return true;
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


        /*
            aria-hidden remove o painel da
            árvore de acessibilidade.

            inert também impede que seus
            selects sejam alcançados pelo
            teclado enquanto ele estiver
            fechado.
        */
        painelConfiguracoes.inert =
            !aberto;
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


    // =========================
    // TECLADO
    // =========================

    document.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key !==
                "Escape"
            ) {
                return;
            }


            // =========================
            // PESQUISA
            // =========================

            const pesquisaEstaAberta =
                pesquisaContainer.classList.contains(
                    "ativo"
                );


            if (pesquisaEstaAberta) {
                const pesquisaFoiFechada =
                    fecharPesquisa();


                if (pesquisaFoiFechada) {
                    botaoPesquisa.focus();
                }
            }


            // =========================
            // CONFIGURAÇÕES
            // =========================

            if (
                painelConfiguracoes.classList.contains(
                    "ativo"
                )
            ) {
                definirEstadoConfiguracoes(
                    false
                );


                botaoConfiguracoes.focus();
            }
        }
    );


    // =========================
    // ESTADO INICIAL
    // =========================

    /*
        Garante que os estados visuais,
        atributos ARIA e navegação por
        teclado comecem sincronizados.
    */
    definirEstadoPesquisa(
        false
    );


    definirEstadoConfiguracoes(
        false
    );
}