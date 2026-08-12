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

// Configura todas as maneiras de fechar
export function configurarModal() {
    const modal =
        document.getElementById(
            "modal-pokemon"
        );


    const botaoFechar =
        document.getElementById(
            "fechar-modal"
        );


    // Botão X
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


    // Tecla ESC
    document.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key === "Escape" &&
                modal.classList.contains(
                    "ativo"
                )
            ) {
                fecharModal();
            }
        }
    );
}