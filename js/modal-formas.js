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

import {
    criarEstadoAparencia,
    definirForma,
    definirAnimado,
    alternarShiny,
    alternarSexo,
    alternarAnimado
} from "./aparencia.js";

import {
    possuiDiferencaSexo
} from "./sexos.js";

import {
    possuiAnimacaoPokemon
} from "./animacoes.js";

import {
    configurarSpindaModal
} from "./especiais/spinda.js";


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


    const controleAparencia =
        document.querySelector(
            ".controle-aparencia"
        );


    const botaoSexo =
        document.getElementById(
            "botao-sexo"
        );


    const iconeSexo =
        document.getElementById(
            "icone-sexo"
        );


    const botaoShiny =
        document.getElementById(
            "botao-shiny"
        );


    const iconeShiny =
        document.getElementById(
            "icone-shiny"
        );


    const botaoAnimado =
        document.getElementById(
            "botao-animado"
        );


    const iconeAnimado =
        document.getElementById(
            "icone-animado"
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

        // Spinda possui renderização própria.
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
    // APLICA DADOS
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
                estadoAparencia.forma
            );


        if (
            forma.id === "normal"
        ) {
            await restaurarDadosNormais();

            return;
        }


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
    // MACHO / FÊMEA
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


        // =========================
        // FORMA SEM SHINY
        // =========================

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


        // =========================
        // FORMA COM SHINY
        // =========================

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


        const possuiControleVisivel =
            sexoVisivel ||
            shinyVisivel ||
            animadoVisivel;


        controleAparencia.classList.toggle(
            "oculto",
            !possuiControleVisivel
        );
    }


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


                atualizarBotaoSexo();

                atualizarBotaoShiny();

                atualizarBotaoAnimado();

                atualizarGrupoAparencia();

                atualizarImagem();

                atualizarDestaque();

                await atualizarDadosForma();
            }
        );
    }


    // =========================
    // EVENTO DE SEXO
    // =========================

    if (botaoSexo) {
        atualizarBotaoSexo();


        botaoSexo.addEventListener(
            "click",
            () => {

                alternarSexo(
                    estadoAparencia
                );


                atualizarBotaoSexo();

                atualizarBotaoAnimado();

                atualizarGrupoAparencia();

                atualizarImagem();
            }
        );
    }


    // =========================
    // EVENTO DE SHINY
    // =========================

    if (botaoShiny) {
        atualizarBotaoShiny();


        botaoShiny.addEventListener(
            "click",
            () => {

                const forma =
                    obterFormaSelecionada(
                        pokemon,
                        estadoAparencia.forma
                    );


                if (
                    forma.permiteShiny ===
                    false
                ) {
                    return;
                }


                alternarShiny(
                    estadoAparencia
                );


                atualizarBotaoShiny();

                atualizarBotaoAnimado();

                atualizarGrupoAparencia();

                atualizarImagem();
            }
        );
    }


    // =========================
    // EVENTO DE ANIMAÇÃO
    // =========================

    if (botaoAnimado) {
        atualizarBotaoAnimado();


        botaoAnimado.addEventListener(
            "click",
            () => {

                if (
                    !possuiAnimacaoPokemon(
                        pokemon,
                        estadoAparencia
                    )
                ) {
                    return;
                }


                alternarAnimado(
                    estadoAparencia
                );


                atualizarBotaoAnimado();

                atualizarGrupoAparencia();

                atualizarImagem();
            }
        );
    }


    // =========================
    // ESTADO INICIAL
    // =========================

    atualizarGrupoAparencia();
}