// =========================
// TEMA DA POKÉDEX
// =========================

const CHAVE_TEMA =
    "tema-pokedex";

const TEMA_CLARO =
    "claro";

const TEMA_ESCURO =
    "escuro";


// =========================
// TEMA ATUAL
// =========================

function obterTemaAtual() {
    return (
        document.documentElement
            .getAttribute(
                "data-tema"
            ) ||
        TEMA_CLARO
    );
}


// =========================
// APLICAR TEMA
// =========================

function aplicarTema(
    tema
) {
    document.documentElement
        .setAttribute(
            "data-tema",
            tema
        );
}


// =========================
// TEMA INICIAL
// =========================

export function aplicarTemaInicial() {
    const temaSalvo =
        localStorage.getItem(
            CHAVE_TEMA
        );


    const temaInicial =
        temaSalvo === TEMA_ESCURO
            ? TEMA_ESCURO
            : TEMA_CLARO;


    aplicarTema(
        temaInicial
    );
}


// =========================
// BOTÃO
// =========================

export function configurarTema() {
    const botaoTema =
        document.getElementById(
            "botao-tema"
        );


    if (!botaoTema) {
        console.warn(
            "Botão de tema não encontrado."
        );

        return;
    }


    function atualizarBotao() {
        const modoEscuro =
            obterTemaAtual() ===
            TEMA_ESCURO;


        botaoTema.textContent =
            modoEscuro
                ? "☀️ Modo claro"
                : "🌙 Modo escuro";


        botaoTema.setAttribute(
            "aria-pressed",
            String(modoEscuro)
        );


        botaoTema.setAttribute(
            "aria-label",
            modoEscuro
                ? "Ativar modo claro"
                : "Ativar modo escuro"
        );
    }


    botaoTema.addEventListener(
        "click",
        () => {
            const novoTema =
                obterTemaAtual() ===
                TEMA_ESCURO
                    ? TEMA_CLARO
                    : TEMA_ESCURO;


            aplicarTema(
                novoTema
            );


            localStorage.setItem(
                CHAVE_TEMA,
                novoTema
            );


            atualizarBotao();
        }
    );


    atualizarBotao();
}