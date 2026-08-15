import {
    buscarPokemonPorIdentificador
} from "./api.js";

import {
    obterImagemForma,
    obterFormaSelecionada
} from "./formas.js";

import {
    criarTipos,
    calcularRelacoesDeTipo,
    criarListaRelacoes
} from "./modal-conteudo.js";

import {
    criarStats
} from "./modal-stats.js";

import {
    buscarGolpesPrincipais,
    criarListaGolpes
} from "./golpes.js";

import {
    atualizarDestaqueEvolucao
} from "./modal-evolucoes.js";


// =========================
// HABILIDADES
// =========================

function criarHabilidades(
    habilidades
) {
    return habilidades
        .map(
            (habilidade) => `
                <span class="habilidade">

                    <span
                        class="icone-habilidade"
                        aria-hidden="true"
                    >
                        ✦
                    </span>

                    ${habilidade.ability.name}

                </span>
            `
        )
        .join("");
}


// =========================
// CONFIGURAÇÃO DAS FORMAS
// =========================

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


    const fraquezasModal =
        document.getElementById(
            "fraquezas-pokemon-modal"
        );


    const resistenciasModal =
        document.getElementById(
            "resistencias-pokemon-modal"
        );


    const golpesModal =
        document.querySelector(
            ".lista-golpes"
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
    // DESTAQUE DA EVOLUÇÃO
    // =========================

    function atualizarDestaque() {
        atualizarDestaqueEvolucao(
            pokemon.id,
            formaSelecionada
        );
    }


    // =========================
    // FRAQUEZAS / RESISTÊNCIAS
    // =========================

    async function atualizarRelacoesTipo(
        dadosPokemon
    ) {
        const relacoes =
            await calcularRelacoesDeTipo(
                dadosPokemon
            );


        fraquezasModal.innerHTML =
            criarListaRelacoes(
                relacoes.fraquezas
            );


        resistenciasModal.innerHTML =
            criarListaRelacoes(
                relacoes.resistencias
            );
    }


    // =========================
    // GOLPES
    // =========================

    async function atualizarGolpes(
        dadosPokemon,
        usarVersaoKanto
    ) {
        let golpes =
            await buscarGolpesPrincipais(
                dadosPokemon,
                usarVersaoKanto
            );


        /*
            Algumas formas podem não possuir
            golpes próprios disponíveis.

            Nesse caso usamos os golpes
            do Pokémon base como fallback.
        */
        if (
            golpes.length === 0 &&
            dadosPokemon !== pokemon
        ) {
            golpes =
                await buscarGolpesPrincipais(
                    pokemon,
                    true
                );
        }


        golpesModal.innerHTML =
            criarListaGolpes(
                golpes
            );
    }


    // =========================
    // APLICA DADOS DO POKÉMON
    // =========================

    async function aplicarDadosPokemon(
        dadosPokemon,
        usarVersaoKanto
    ) {
        tiposModal.innerHTML =
            criarTipos(
                dadosPokemon.types
            );


        alturaModal.textContent =
            `${dadosPokemon.height / 10} m`;


        pesoModal.textContent =
            `${dadosPokemon.weight / 10} kg`;


        habilidadesModal.innerHTML =
            criarHabilidades(
                dadosPokemon.abilities
            );


        statsModal.innerHTML =
            criarStats(
                dadosPokemon.stats
            );


        await Promise.all([
            atualizarRelacoesTipo(
                dadosPokemon
            ),

            atualizarGolpes(
                dadosPokemon,
                usarVersaoKanto
            )
        ]);
    }


    // =========================
    // FORMA NORMAL
    // =========================

    async function restaurarDadosNormais() {
        await aplicarDadosPokemon(
            pokemon,
            true
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


        // Forma normal
        if (
            forma.id === "normal"
        ) {
            await restaurarDadosNormais();

            return;
        }


        // Forma sem dados próprios na PokéAPI
        if (!forma.api) {
            await restaurarDadosNormais();

            return;
        }


        try {
            const dadosForma =
                await buscarPokemonPorIdentificador(
                    forma.api
                );


            await aplicarDadosPokemon(
                dadosForma,
                false
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

                atualizarDestaque();

                await atualizarDadosForma();
            }
        );
    }


    // =========================
    // NORMAL / SHINY
    // =========================

    botoesAparencia.forEach(
        (botao) => {

            botao.addEventListener(
                "click",
                () => {

                    shiny =
                        botao.dataset.shiny ===
                        "true";


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


                    /*
                        Shiny altera apenas
                        a aparência da imagem.
                    */
                    atualizarImagem();
                }
            );
        }
    );
}