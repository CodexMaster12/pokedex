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

// Lista usada pela navegação
// anterior / próximo.
let pokemonsNavegacao = [];


// Índice atualmente aberto.
let indicePokemonAtual = -1;


// ID nacional atualmente aberto.
let idPokemonAtual = null;


// Identifica cada carregamento.
//
// Impede que uma resposta antiga da API
// sobrescreva um Pokémon aberto depois.
let idCarregamentoModal = 0;


// Elemento que possuía foco antes
// da abertura do modal.
let elementoFocoAnterior = null;


// =========================
// LISTA DE NAVEGAÇÃO
// =========================

// Define quais Pokémon podem ser percorridos
// dentro do modal.
export function definirPokemonsNavegacao(
    pokemons
) {
    pokemonsNavegacao =
        Array.isArray(pokemons)
            ? [...pokemons]
            : [];


    /*
        Caso a lista seja atualizada enquanto
        um Pokémon está aberto, recalculamos
        sua posição pelo ID.

        Isso evita índices desatualizados.
    */
    if (idPokemonAtual !== null) {
        indicePokemonAtual =
            pokemonsNavegacao.findIndex(
                (pokemon) => {
                    return (
                        pokemon.id ===
                        idPokemonAtual
                    );
                }
            );


        atualizarBotoesNavegacao();
    }
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
// CONTROLE DE CARREGAMENTO
// =========================

// Verifica se uma operação assíncrona ainda
// pertence ao Pokémon atualmente aberto.
function carregamentoAindaEhAtual(
    identificadorCarregamento,
    pokemonId
) {
    return (
        identificadorCarregamento ===
            idCarregamentoModal &&
        pokemonId ===
            idPokemonAtual
    );
}


// =========================
// FOCO
// =========================

// Retorna os elementos que podem receber
// foco dentro do modal.
function obterElementosFocaveis(
    modal
) {
    const seletor = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[tabindex]:not([tabindex='-1'])"
    ].join(",");


    return [
        ...modal.querySelectorAll(
            seletor
        )
    ].filter(
        (elemento) => {
            return (
                elemento.getClientRects()
                    .length > 0
            );
        }
    );
}


// Mantém a navegação com Tab
// dentro do modal.
function controlarFocoModal(
    evento,
    modal
) {
    if (
        evento.key !== "Tab"
    ) {
        return;
    }


    const elementos =
        obterElementosFocaveis(
            modal
        );


    // =========================
    // SEM ELEMENTOS FOCÁVEIS
    // =========================

    if (
        elementos.length === 0
    ) {
        evento.preventDefault();

        modal.focus();

        return;
    }


    const primeiroElemento =
        elementos[0];


    const ultimoElemento =
        elementos[
            elementos.length - 1
        ];


    const focoAtual =
        document.activeElement;


    const focoEstaDentroDoModal =
        focoAtual instanceof Node &&
        modal.contains(
            focoAtual
        );


    // =========================
    // FOCO NO PRÓPRIO MODAL
    // =========================

    /*
        O modal recebe foco quando é aberto.

        Se o usuário pressionar Tab ou
        Shift + Tab nesse momento, enviamos
        diretamente para o primeiro ou
        último elemento interativo.

        Isso impede que o foco escape
        para a página atrás do modal.
    */
    if (
        focoAtual === modal ||
        !focoEstaDentroDoModal
    ) {
        evento.preventDefault();


        if (evento.shiftKey) {
            ultimoElemento.focus();
        } else {
            primeiroElemento.focus();
        }


        return;
    }


    // =========================
    // SHIFT + TAB
    // =========================

    if (
        evento.shiftKey &&
        focoAtual ===
            primeiroElemento
    ) {
        evento.preventDefault();

        ultimoElemento.focus();

        return;
    }


    // =========================
    // TAB
    // =========================

    if (
        !evento.shiftKey &&
        focoAtual ===
            ultimoElemento
    ) {
        evento.preventDefault();

        primeiroElemento.focus();
    }
}


// =========================
// CONTROLES INTERATIVOS
// =========================

// Evita que ← e → troquem de Pokémon
// quando o usuário estiver usando
// um campo ou seletor do modal.
function eventoVeioDeCampoInterativo(
    evento
) {
    const elemento =
        evento.target;


    if (
        !(elemento instanceof HTMLElement)
    ) {
        return false;
    }


    return (
        elemento.matches(
            "input, select, textarea"
        ) ||
        elemento.isContentEditable
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
        !detalhes ||
        !pokemon
    ) {
        return;
    }


    // =========================
    // FOCO ANTERIOR
    // =========================

    const modalJaEstavaAberto =
        modal.classList.contains(
            "ativo"
        );


    if (!modalJaEstavaAberto) {
        elementoFocoAnterior =
            document.activeElement;
    }


    // =========================
    // NOVO CARREGAMENTO
    // =========================

    const pokemonId =
        pokemon.id;


    idPokemonAtual =
        pokemonId;


    const identificadorCarregamento =
        ++idCarregamentoModal;


    // =========================
    // ÍNDICE DE NAVEGAÇÃO
    // =========================

    indicePokemonAtual =
        pokemonsNavegacao.findIndex(
            (item) => {
                return (
                    item.id ===
                    pokemonId
                );
            }
        );


    // =========================
    // MOSTRA O MODAL
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

        const pokemonCompleto =
            await obterPokemonCompleto(
                pokemon
            );


        /*
            Se outro Pokémon foi aberto
            enquanto aguardávamos a API,
            abandonamos este carregamento.
        */
        if (
            !carregamentoAindaEhAtual(
                identificadorCarregamento,
                pokemonId
            )
        ) {
            return;
        }


        // =========================
        // ATUALIZA NAVEGAÇÃO
        // =========================

        const indiceAtualizado =
            pokemonsNavegacao.findIndex(
                (item) => {
                    return (
                        item.id ===
                        pokemonCompleto.id
                    );
                }
            );


        if (
            indiceAtualizado >= 0
        ) {
            pokemonsNavegacao[
                indiceAtualizado
            ] = pokemonCompleto;


            indicePokemonAtual =
                indiceAtualizado;
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


        /*
            Outra proteção após o segundo
            grupo de operações assíncronas.
        */
        if (
            !carregamentoAindaEhAtual(
                identificadorCarregamento,
                pokemonId
            )
        ) {
            return;
        }


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


        /*
            O usuário pode ter navegado
            enquanto as evoluções carregavam.
        */
        if (
            !carregamentoAindaEhAtual(
                identificadorCarregamento,
                pokemonId
            )
        ) {
            return;
        }


        atualizarBotoesNavegacao();


    } catch (erro) {

        /*
            Erros de requisições antigas
            não devem alterar o modal atual.
        */
        if (
            !carregamentoAindaEhAtual(
                identificadorCarregamento,
                pokemonId
            )
        ) {
            return;
        }


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


    /*
        Invalida qualquer requisição
        que ainda esteja em andamento.
    */
    idCarregamentoModal++;


    modal.classList.remove(
        "ativo"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    idPokemonAtual =
        null;


    indicePokemonAtual =
        -1;


    atualizarBotoesNavegacao();


    // =========================
    // RESTAURA O FOCO
    // =========================

    if (
        elementoFocoAnterior instanceof HTMLElement &&
        elementoFocoAnterior.isConnected
    ) {
        elementoFocoAnterior.focus();
    }


    elementoFocoAnterior =
        null;
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


    if (!modal) {
        console.warn(
            "Modal da Pokédex não encontrado."
        );

        return;
    }


    // =========================
    // FECHAR
    // =========================

    if (botaoFechar) {
        botaoFechar.addEventListener(
            "click",
            fecharModal
        );
    }


    modal.addEventListener(
        "click",
        (evento) => {
            if (
                evento.target ===
                modal
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


            // =========================
            // ESCAPE
            // =========================

            if (
                evento.key ===
                "Escape"
            ) {
                evento.preventDefault();

                fecharModal();

                return;
            }


            // =========================
            // TAB
            // =========================

            if (
                evento.key ===
                "Tab"
            ) {
                controlarFocoModal(
                    evento,
                    modal
                );

                return;
            }


            // =========================
            // CAMPOS INTERATIVOS
            // =========================

            if (
                eventoVeioDeCampoInterativo(
                    evento
                )
            ) {
                return;
            }


            // =========================
            // ANTERIOR
            // =========================

            if (
                evento.key ===
                "ArrowLeft"
            ) {
                evento.preventDefault();

                await abrirPokemonAnterior();

                return;
            }


            // =========================
            // PRÓXIMO
            // =========================

            if (
                evento.key ===
                "ArrowRight"
            ) {
                evento.preventDefault();

                await abrirPokemonProximo();
            }
        }
    );
}