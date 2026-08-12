import {
    buscarPokemonPorIdentificador
} from "./api.js";

import {
    obterImagemForma,
    obterFormaSelecionada
} from "./formas.js";

import {
    criarTipos
} from "./modal-conteudo.js";

import {
    criarStats
} from "./modal-stats.js";


// =========================
// HABILIDADES
// =========================

function criarHabilidades(abilities) {
    return abilities
        .map((habilidade) => `
            <span class="habilidade">

                <span
                    class="icone-habilidade"
                    aria-hidden="true"
                >
                    ✦
                </span>

                ${habilidade.ability.name}

            </span>
        `)
        .join("");
}


// =========================
// FORMAS E SHINY
// =========================

// Configura a troca de forma e aparência
export function configurarFormasModal(
    pokemon
) {
    const imagem =
        document.getElementById(
            "imagem-pokemon-modal"
        );


    const seletorForma =
        document.getElementById(
            "seletor-forma"
        );


    const botoesAparencia =
        document.querySelectorAll(
            ".botao-aparencia"
        );


    const tiposModal =
        document.getElementById(
            "tipos-pokemon-modal"
        );


    const alturaModal =
        document.getElementById(
            "altura-pokemon"
        );


    const pesoModal =
        document.getElementById(
            "peso-pokemon"
        );


    const habilidadesModal =
        document.getElementById(
            "lista-habilidades-modal"
        );


    const statsModal =
        document.getElementById(
            "grafico-stats-modal"
        );


    let formaSelecionada =
        seletorForma
            ? seletorForma.value
            : "normal";


    let shiny = false;


    // =========================
    // IMAGEM
    // =========================

    function atualizarImagem() {
        imagem.src =
            obterImagemForma(
                pokemon,
                formaSelecionada,
                shiny
            );
    }


    // =========================
    // DADOS DA FORMA
    // =========================

    async function atualizarDadosForma() {
        const forma =
            obterFormaSelecionada(
                pokemon,
                formaSelecionada
            );


        // Forma normal ou forma ainda sem dados da API
        if (
            forma.id === "normal" ||
            !forma.api
        ) {
            tiposModal.innerHTML =
                criarTipos(
                    pokemon.types
                );


            alturaModal.textContent =
                `${pokemon.height / 10} m`;


            pesoModal.textContent =
                `${pokemon.weight / 10} kg`;


            habilidadesModal.innerHTML =
                criarHabilidades(
                    pokemon.abilities
                );


            statsModal.innerHTML =
                criarStats(
                    pokemon.stats
                );


            return;
        }


        try {
            const dadosForma =
                await buscarPokemonPorIdentificador(
                    forma.api
                );


            // Tipos
            tiposModal.innerHTML =
                criarTipos(
                    dadosForma.types
                );


            // Altura
            alturaModal.textContent =
                `${dadosForma.height / 10} m`;


            // Peso
            pesoModal.textContent =
                `${dadosForma.weight / 10} kg`;


            // Habilidades
            habilidadesModal.innerHTML =
                criarHabilidades(
                    dadosForma.abilities
                );


            // Estatísticas
            statsModal.innerHTML =
                criarStats(
                    dadosForma.stats
                );

        } catch (erro) {
            console.error(
                "Erro ao carregar dados da forma:",
                erro
            );
        }
    }


    // =========================
    // TROCA DE FORMA
    // =========================

    if (seletorForma) {
        seletorForma.addEventListener(
            "change",
            async () => {

                formaSelecionada =
                    seletorForma.value;


                atualizarImagem();


                await atualizarDadosForma();
            }
        );
    }


    // =========================
    // NORMAL / SHINY
    // =========================

    botoesAparencia.forEach((botao) => {

        botao.addEventListener(
            "click",
            () => {

                shiny =
                    botao.dataset.shiny === "true";


                botoesAparencia.forEach(
                    (item) => {

                        item.classList.remove(
                            "ativo"
                        );
                    }
                );


                botao.classList.add(
                    "ativo"
                );


                // Shiny altera somente a imagem
                atualizarImagem();
            }
        );
    });
}