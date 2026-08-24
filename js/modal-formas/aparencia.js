import {
    obterFormaSelecionada
} from "../formas.js";

import {
    definirAnimado,
    alternarShiny,
    alternarSexo,
    alternarAnimado
} from "../aparencia.js";

import {
    possuiDiferencaSexo
} from "../sexos.js";

import {
    possuiAnimacaoPokemon
} from "../animacoes.js";


// =========================
// CONTROLADOR DE APARÊNCIA
// =========================

export function criarControladorAparencia(
    pokemon,
    estadoAparencia,
    elementos
) {
    const {
        controleAparencia,
        botaoSexo,
        iconeSexo,
        botaoShiny,
        iconeShiny,
        botaoAnimado,
        iconeAnimado
    } = elementos;


    // =========================
    // SEXO
    // =========================

    function atualizarBotaoSexo() {
        if (
            !botaoSexo ||
            !iconeSexo
        ) {
            return;
        }


        const possuiDiferencaNaForma =
            possuiDiferencaSexo(
                pokemon,
                estadoAparencia.forma
            );


        botaoSexo.classList.toggle(
            "oculto",
            !possuiDiferencaNaForma
        );


        if (!possuiDiferencaNaForma) {
            estadoAparencia.sexo =
                "male";

            return;
        }


        const feminino =
            estadoAparencia.sexo ===
            "female";


        iconeSexo.src =
            feminino
                ? "assets/images/interface/aparencia/feminino.png"
                : "assets/images/interface/aparencia/masculino.png";


        botaoSexo.dataset.sexo =
            feminino
                ? "female"
                : "male";


        botaoSexo.title =
            feminino
                ? "Fêmea"
                : "Macho";


        botaoSexo.setAttribute(
            "aria-label",
            feminino
                ? "Exibindo forma fêmea. Clique para alterar para macho."
                : "Exibindo forma macho. Clique para alterar para fêmea."
        );
    }


    // =========================
    // SHINY
    // =========================

    function atualizarBotaoShiny() {
        if (
            !botaoShiny ||
            !iconeShiny
        ) {
            return;
        }


        const forma =
            obterFormaSelecionada(
                pokemon,
                estadoAparencia.forma
            );


        const permiteShiny =
            forma.permiteShiny !==
            false;


        botaoShiny.classList.toggle(
            "oculto",
            !permiteShiny
        );


        if (!permiteShiny) {
            estadoAparencia.shiny =
                false;


            botaoShiny.classList.remove(
                "ativo"
            );


            botaoShiny.setAttribute(
                "aria-pressed",
                "false"
            );


            return;
        }


        const shinyAtivo =
            estadoAparencia.shiny;


        iconeShiny.src =
            shinyAtivo
                ? "assets/images/interface/aparencia/shiny.png"
                : "assets/images/interface/aparencia/shinyoff.png";


        botaoShiny.classList.toggle(
            "ativo",
            shinyAtivo
        );


        botaoShiny.setAttribute(
            "aria-pressed",
            String(
                shinyAtivo
            )
        );


        botaoShiny.setAttribute(
            "aria-label",
            shinyAtivo
                ? "Desativar aparência Shiny"
                : "Ativar aparência Shiny"
        );
    }


    // =========================
    // ANIMADO
    // =========================

    function atualizarBotaoAnimado() {
        if (
            !botaoAnimado ||
            !iconeAnimado
        ) {
            return;
        }


        const possuiAnimacao =
            possuiAnimacaoPokemon(
                pokemon,
                estadoAparencia
            );


        botaoAnimado.classList.toggle(
            "oculto",
            !possuiAnimacao
        );


        if (!possuiAnimacao) {
            definirAnimado(
                estadoAparencia,
                false
            );
        }


        const animadoAtivo =
            estadoAparencia.animado;


        iconeAnimado.src =
            animadoAtivo
                ? "assets/images/interface/aparencia/animado.png"
                : "assets/images/interface/aparencia/animadooff.png";


        botaoAnimado.classList.toggle(
            "ativo",
            animadoAtivo
        );


        botaoAnimado.setAttribute(
            "aria-pressed",
            String(
                animadoAtivo
            )
        );


        botaoAnimado.setAttribute(
            "aria-label",
            animadoAtivo
                ? "Desativar animação"
                : "Ativar animação"
        );


        botaoAnimado.title =
            animadoAtivo
                ? "Animado"
                : "Estático";
    }


    // =========================
    // GRUPO APARÊNCIA
    // =========================

    function atualizarGrupoAparencia() {
        if (!controleAparencia) {
            return;
        }


        const sexoVisivel =
            botaoSexo &&
            !botaoSexo.classList.contains(
                "oculto"
            );


        const shinyVisivel =
            botaoShiny &&
            !botaoShiny.classList.contains(
                "oculto"
            );


        const animadoVisivel =
            botaoAnimado &&
            !botaoAnimado.classList.contains(
                "oculto"
            );


        controleAparencia.classList.toggle(
            "oculto",
            !(
                sexoVisivel ||
                shinyVisivel ||
                animadoVisivel
            )
        );
    }


    // =========================
    // ATUALIZA TUDO
    // =========================

    function atualizarTudo() {
        atualizarBotaoSexo();

        atualizarBotaoShiny();

        atualizarBotaoAnimado();

        atualizarGrupoAparencia();
    }


    // =========================
    // ALTERA SEXO
    // =========================

    function trocarSexo() {
        alternarSexo(
            estadoAparencia
        );


        atualizarBotaoSexo();

        atualizarBotaoAnimado();

        atualizarGrupoAparencia();
    }


    // =========================
    // ALTERA SHINY
    // =========================

    function trocarShiny() {
        const forma =
            obterFormaSelecionada(
                pokemon,
                estadoAparencia.forma
            );


        if (
            forma.permiteShiny ===
            false
        ) {
            return false;
        }


        alternarShiny(
            estadoAparencia
        );


        atualizarBotaoShiny();

        atualizarBotaoAnimado();

        atualizarGrupoAparencia();


        return true;
    }


    // =========================
    // ALTERA ANIMAÇÃO
    // =========================

    function trocarAnimado() {
        if (
            !possuiAnimacaoPokemon(
                pokemon,
                estadoAparencia
            )
        ) {
            return false;
        }


        alternarAnimado(
            estadoAparencia
        );


        atualizarBotaoAnimado();

        atualizarGrupoAparencia();


        return true;
    }


    return {
        atualizarTudo,
        trocarSexo,
        trocarShiny,
        trocarAnimado
    };
}