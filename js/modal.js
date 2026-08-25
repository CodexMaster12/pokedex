import {
    buscarEspecie,
    buscarPokemonPorIdentificador
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
// DADOS COMPLETOS
// =========================

// Verifica se o objeto recebido já possui
// os dados completos do endpoint /pokemon.
function pokemonPossuiDadosCompletos(
    pokemon
) {
    return (
        pokemon &&
        pokemon.species &&
        Array.isArray(pokemon.types) &&
        pokemon.types.length > 0
    );
}


// Busca os dados completos somente quando
// eles ainda não estiverem disponíveis.
async function obterPokemonCompleto(
    pokemon
) {
    if (
        pokemonPossuiDadosCompletos(
            pokemon
        )
    ) {
        return pokemon;
    }


    return await buscarPokemonPorIdentificador(
        pokemon.id
    );
}


// =========================
// ABERTURA DO MODAL
// =========================

// Abre o modal com os detalhes do Pokémon.
export async function abrirModal(
    pokemon
) {
    const modal =
        document.getElementById(
            "modal-pokemon"
        );


    const detalhes =
        document.getElementById(
            "detalhes-pokemon"
        );


    if (
        !modal ||
        !detalhes
    ) {
        return;
    }


    // =========================
    // ÍNDICE DE NAVEGAÇÃO
    // =========================

    indicePokemonAtual =
        pokemonsNavegacao.findIndex(
            (item) => {
                return (
                    item.id ===
                    pokemon.id
                );
            }
        );


    // =========================
    // MOSTRA O MODAL IMEDIATAMENTE
    // =========================

    modal.classList.add(
        "ativo"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


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

        // =========================
        // COMPLETA O POKÉMON
        // =========================

        /*
            Se o carregamento geral ainda
            não chegou neste Pokémon,
            buscamos somente ele.

            O modal já está aberto enquanto
            essa consulta acontece.
        */
        const pokemonCompleto =
            await obterPokemonCompleto(
                pokemon
            );


        // =========================
        // ATUALIZA NAVEGAÇÃO
        // =========================

        /*
            Guardamos o objeto completo na
            própria lista de navegação.

            Assim, voltar para este Pokémon
            não exige nova consulta.
        */
        if (
            indicePokemonAtual >= 0
        ) {
            pokemonsNavegacao[
                indicePokemonAtual
            ] = pokemonCompleto;
        }


        // =========================
        // DADOS DO MODAL
        // =========================

        const [
            especie,
            relacoesTipo,
            golpesPrincipais
        ] = await Promise.all([

            buscarEspecie(
                pokemonCompleto
            ),

            calcularRelacoesDeTipo(
                pokemonCompleto
            ),

            buscarGolpesPrincipais(
                pokemonCompleto
            )

        ]);


        // =========================
        // CONTEÚDO PRINCIPAL
        // =========================

        detalhes.innerHTML =
            criarConteudoModal(
                pokemonCompleto,
                especie,
                relacoesTipo,
                golpesPrincipais
            );


        // =========================
        // FORMAS
        // =========================

        configurarFormasModal(
            pokemonCompleto
        );


        // =========================
        // EVOLUÇÕES
        // =========================

        await carregarEvolucoesModal(
            pokemonCompleto
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


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "ativo"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


// =========================
// CONFIGURAÇÃO DO MODAL
// =========================

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

    if (botaoFechar) {
        botaoFechar.addEventListener(
            "click",
            fecharModal
        );
    }


    if (modal) {
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
    }


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
                !modal ||
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