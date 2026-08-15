import {
    buscarEspecie
} from "./api.js";

import {
    buscarGolpesPrincipais
} from "./golpes.js";

import {
    calcularRelacoesDeTipo,
    criarConteudoModal
} from "./modal-conteudo.js";

import {
    carregarEvolucoesModal
} from "./modal-evolucoes.js";

import {
    configurarFormasModal
} from "./modal-formas.js";


// =========================
// ESTADO DO MODAL
// =========================

// Lista usada pela navegação anterior / próximo
let pokemonsNavegacao = [];


// Pokémon atualmente aberto
let indicePokemonAtual = -1;


// =========================
// LISTA DE NAVEGAÇÃO
// =========================

// Define quais Pokémon podem ser percorridos
// dentro do modal.
export function definirPokemonsNavegacao(
    pokemons
) {
    pokemonsNavegacao =
        [...pokemons];
}


// =========================
// BOTÕES DE NAVEGAÇÃO
// =========================

function atualizarBotoesNavegacao() {
    const botaoAnterior =
        document.getElementById(
            "pokemon-anterior"
        );


    const botaoProximo =
        document.getElementById(
            "pokemon-proximo"
        );


    if (
        !botaoAnterior ||
        !botaoProximo
    ) {
        return;
    }


    const possuiAnterior =
        indicePokemonAtual > 0;


    const possuiProximo =
        indicePokemonAtual >= 0 &&
        indicePokemonAtual <
            pokemonsNavegacao.length - 1;


    botaoAnterior.disabled =
        !possuiAnterior;


    botaoProximo.disabled =
        !possuiProximo;


    botaoAnterior.setAttribute(
        "aria-disabled",
        String(!possuiAnterior)
    );


    botaoProximo.setAttribute(
        "aria-disabled",
        String(!possuiProximo)
    );
}


// =========================
// ABERTURA DO MODAL
// =========================

// Abre o modal com os detalhes do Pokémon
export async function abrirModal(pokemon) {
    const modal =
        document.getElementById(
            "modal-pokemon"
        );


    const detalhes =
        document.getElementById(
            "detalhes-pokemon"
        );


    // Localiza o Pokémon na lista de navegação
    indicePokemonAtual =
        pokemonsNavegacao.findIndex(
            (item) => {
                return item.id === pokemon.id;
            }
        );


    // Mostra o modal
    modal.classList.add(
        "ativo"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    // Impede rolagem da página ao fundo
    document.body.style.overflow =
        "hidden";


    modal.focus();


    atualizarBotoesNavegacao();


    detalhes.innerHTML = `
        <p>
            Carregando detalhes...
        </p>
    `;


    try {
        // Carrega os dados necessários ao mesmo tempo
        const [
            especie,
            relacoesTipo,
            golpesPrincipais
        ] = await Promise.all([
            buscarEspecie(
                pokemon
            ),

            calcularRelacoesDeTipo(
                pokemon
            ),

            buscarGolpesPrincipais(
                pokemon
            )
        ]);


        // Cria o conteúdo principal
        detalhes.innerHTML =
            criarConteudoModal(
                pokemon,
                especie,
                relacoesTipo,
                golpesPrincipais
            );


        // Ativa os controles de forma
        configurarFormasModal(
            pokemon
        );


        // Carrega a cadeia evolutiva
        await carregarEvolucoesModal(
            pokemon
        );


        atualizarBotoesNavegacao();

    } catch (erro) {
        console.error(
            "Erro ao carregar detalhes:",
            erro
        );


        detalhes.innerHTML = `
            <p>
                Não foi possível carregar
                os detalhes do Pokémon.
            </p>
        `;
    }
}


// =========================
// NAVEGAÇÃO
// =========================

async function abrirPokemonAnterior() {
    if (
        indicePokemonAtual <= 0
    ) {
        return;
    }


    const pokemonAnterior =
        pokemonsNavegacao[
            indicePokemonAtual - 1
        ];


    await abrirModal(
        pokemonAnterior
    );
}


async function abrirPokemonProximo() {
    if (
        indicePokemonAtual < 0 ||
        indicePokemonAtual >=
            pokemonsNavegacao.length - 1
    ) {
        return;
    }


    const pokemonProximo =
        pokemonsNavegacao[
            indicePokemonAtual + 1
        ];


    await abrirModal(
        pokemonProximo
    );
}


// =========================
// FECHAMENTO DO MODAL
// =========================

function fecharModal() {
    const modal =
        document.getElementById(
            "modal-pokemon"
        );


    modal.classList.remove(
        "ativo"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    // Libera a rolagem da página
    document.body.style.overflow =
        "";
}


// =========================
// CONFIGURAÇÃO DO MODAL
// =========================

// Configura todas as interações do modal
export function configurarModal() {
    const modal =
        document.getElementById(
            "modal-pokemon"
        );


    const botaoFechar =
        document.getElementById(
            "fechar-modal"
        );


    const botaoAnterior =
        document.getElementById(
            "pokemon-anterior"
        );


    const botaoProximo =
        document.getElementById(
            "pokemon-proximo"
        );


    // =========================
    // FECHAR
    // =========================

    botaoFechar.addEventListener(
        "click",
        fecharModal
    );


    // Clique fora do conteúdo
    modal.addEventListener(
        "click",
        (evento) => {

            if (
                evento.target === modal
            ) {
                fecharModal();
            }
        }
    );


    // =========================
    // ANTERIOR / PRÓXIMO
    // =========================

    if (botaoAnterior) {
        botaoAnterior.addEventListener(
            "click",
            abrirPokemonAnterior
        );
    }


    if (botaoProximo) {
        botaoProximo.addEventListener(
            "click",
            abrirPokemonProximo
        );
    }


    // =========================
    // TECLADO
    // =========================

    document.addEventListener(
        "keydown",
        async (evento) => {

            if (
                !modal.classList.contains(
                    "ativo"
                )
            ) {
                return;
            }


            if (
                evento.key === "Escape"
            ) {
                fecharModal();

                return;
            }


            if (
                evento.key ===
                "ArrowLeft"
            ) {
                await abrirPokemonAnterior();
            }


            if (
                evento.key ===
                "ArrowRight"
            ) {
                await abrirPokemonProximo();
            }
        }
    );
}