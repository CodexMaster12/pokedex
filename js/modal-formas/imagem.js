import {
    obterImagemForma
} from "../formas.js";

import {
    atualizarDestaqueEvolucao
} from "../modal-evolucoes.js";

import {
    configurarSpindaModal
} from "../especiais/spinda.js";


// =========================
// CONTROLADOR DE IMAGEM
// =========================

export function criarControladorImagemForma(
    pokemon,
    estadoAparencia,
    imagem
) {

    // =========================
    // SPINDA
    // =========================

    const controladorSpinda =
        configurarSpindaModal(
            pokemon,
            imagem,
            estadoAparencia
        );


    // =========================
    // IMAGEM
    // =========================

    function atualizarImagem() {

        if (controladorSpinda) {
            controladorSpinda.atualizar();

            return;
        }


        imagem.src =
            obterImagemForma(
                pokemon,
                estadoAparencia
            );
    }


    // =========================
    // DESTAQUE DA EVOLUÇÃO
    // =========================

    function atualizarDestaque() {
        atualizarDestaqueEvolucao(
            pokemon.id,
            estadoAparencia.forma
        );
    }


    return {
        atualizarImagem,
        atualizarDestaque
    };
}