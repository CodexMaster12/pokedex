import {
    criarEstadoAparencia,
    definirForma
} from "./aparencia.js";

import {
    obterElementosModalFormas
} from "./modal-formas/elementos.js";

import {
    criarControladorImagemForma
} from "./modal-formas/imagem.js";

import {
    criarControladorDadosForma
} from "./modal-formas/dados.js";

import {
    criarControladorAparencia
} from "./modal-formas/aparencia.js";


// =========================
// CONFIGURAÇÃO DAS FORMAS
// =========================

export function configurarFormasModal(
    pokemon
) {
    // =========================
    // ELEMENTOS
    // =========================

    const elementos =
        obterElementosModalFormas();


    const {
        imagem,
        seletorForma,
        botaoSexo,
        botaoShiny,
        botaoAnimado
    } = elementos;


    // =========================
    // ESTADO VISUAL
    // =========================

    const estadoAparencia =
        criarEstadoAparencia(
            pokemon
        );


    if (seletorForma) {
        definirForma(
            estadoAparencia,
            seletorForma.value
        );
    }


    // =========================
    // CONTROLADORES
    // =========================

    const controladorImagem =
        criarControladorImagemForma(
            pokemon,
            estadoAparencia,
            imagem
        );


    const controladorDados =
        criarControladorDadosForma(
            pokemon,
            estadoAparencia,
            elementos
        );


    const controladorAparencia =
        criarControladorAparencia(
            pokemon,
            estadoAparencia,
            elementos
        );


    // =========================
    // TROCA DE FORMA
    // =========================

    if (seletorForma) {
        seletorForma.addEventListener(
            "change",
            async () => {

                definirForma(
                    estadoAparencia,
                    seletorForma.value
                );


                controladorAparencia
                    .atualizarTudo();


                controladorImagem
                    .atualizarImagem();


                controladorImagem
                    .atualizarDestaque();


                await controladorDados
                    .atualizarDadosForma();
            }
        );
    }


    // =========================
    // SEXO
    // =========================

    if (botaoSexo) {
        botaoSexo.addEventListener(
            "click",
            () => {

                controladorAparencia
                    .trocarSexo();


                controladorImagem
                    .atualizarImagem();
            }
        );
    }


    // =========================
    // SHINY
    // =========================

    if (botaoShiny) {
        botaoShiny.addEventListener(
            "click",
            () => {

                const alterou =
                    controladorAparencia
                        .trocarShiny();


                if (!alterou) {
                    return;
                }


                controladorImagem
                    .atualizarImagem();
            }
        );
    }


    // =========================
    // ANIMAÇÃO
    // =========================

    if (botaoAnimado) {
        botaoAnimado.addEventListener(
            "click",
            () => {

                const alterou =
                    controladorAparencia
                        .trocarAnimado();


                if (!alterou) {
                    return;
                }


                controladorImagem
                    .atualizarImagem();
            }
        );
    }


    // =========================
    // ESTADO INICIAL
    // =========================

    controladorAparencia
        .atualizarTudo();
}