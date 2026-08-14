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
            Algumas formas, como Mega ou Gigantamax,
            podem não possuir uma lista própria de
            golpes por nível na PokéAPI.

            Nesse caso usamos os golpes do Pokémon base.
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
    // FORMA NORMAL
    // =========================

    async function restaurarDadosNormais() {

        // Tipos
        tiposModal.innerHTML =
            criarTipos(
                pokemon.types
            );


        // Altura
        alturaModal.textContent =
            `${pokemon.height / 10} m`;


        // Peso
        pesoModal.textContent =
            `${pokemon.weight / 10} kg`;


        // Habilidades
        habilidadesModal.innerHTML =
            criarHabilidades(
                pokemon.abilities
            );


        // Estatísticas
        statsModal.innerHTML =
            criarStats(
                pokemon.stats
            );


        // Fraquezas / Resistências
        await atualizarRelacoesTipo(
            pokemon
        );


        // Golpes
        await atualizarGolpes(
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


        /*
            Algumas formas mais novas ainda
            não possuem correspondência na API.

            Nesses casos:
            - imagem muda;
            - dados continuam os da forma normal.
        */
        if (!forma.api) {
            await restaurarDadosNormais();

            return;
        }


        try {
            const dadosForma =
                await buscarPokemonPorIdentificador(
                    forma.api
                );


            // =========================
            // TIPOS
            // =========================

            tiposModal.innerHTML =
                criarTipos(
                    dadosForma.types
                );


            // =========================
            // ALTURA
            // =========================

            alturaModal.textContent =
                `${dadosForma.height / 10} m`;


            // =========================
            // PESO
            // =========================

            pesoModal.textContent =
                `${dadosForma.weight / 10} kg`;


            // =========================
            // HABILIDADES
            // =========================

            habilidadesModal.innerHTML =
                criarHabilidades(
                    dadosForma.abilities
                );


            // =========================
            // ESTATÍSTICAS
            // =========================

            statsModal.innerHTML =
                criarStats(
                    dadosForma.stats
                );


            // =========================
            // FRAQUEZAS / RESISTÊNCIAS
            // =========================

            await atualizarRelacoesTipo(
                dadosForma
            );


            // =========================
            // GOLPES
            // =========================

            await atualizarGolpes(
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


                // Imagem troca imediatamente
                atualizarImagem();


                // Atualiza os demais dados
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


                /*
                    Shiny é apenas aparência.

                    Não altera:
                    - tipos
                    - stats
                    - golpes
                    - habilidades
                    - fraquezas
                    etc.
                */
                atualizarImagem();
            }
        );
    });
}