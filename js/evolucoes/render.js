import {
    criarTipos
} from "../modal-conteudo.js";

import {
    formatarNomePokemon
} from "../nomes-pokemon.js";

import {
    obterImagemEvolucao
} from "./imagens.js";

import {
    POKEMONS_LAYOUT_VERTICAL
} from "./configuracao.js";


// =========================
// ITEM DA EVOLUÇÃO
// =========================

export function criarItemEvolucao(
    no,
    pokemonAtual
) {
    const pokemon =
        no.pokemon;


    const numeroReal =
        no.numeroExibido ??
        pokemon.id;


    const numeroFormatado =
        String(numeroReal).padStart(
            3,
            "0"
        );


    const nomeBase =
        no.nomeBase ??
        pokemon.name;


    const nomeFormatado =
        formatarNomePokemon(
            nomeBase
        );


    const formaItem =
        no.forma
            ? no.forma.toLowerCase()
            : "";


    const classeAtual =
        numeroReal === pokemonAtual.id &&
        !no.forma
            ? "evolucao-atual"
            : "";


    const imagem =
        obterImagemEvolucao(
            numeroReal,
            no.forma
        );


    const tipos =
        Array.isArray(pokemon.types)
            ? pokemon.types
            : [];


    return `
        <div
            class="evolucao-item ${classeAtual}"
            data-pokemon-id="${numeroReal}"
            data-forma="${formaItem}"
        >

            <div class="evolucao-imagem">

                ${
                    imagem
                        ? `
                            <img
                                src="${imagem}"
                                alt="${nomeFormatado}"
                                loading="lazy"
                            >
                        `
                        : `
                            <div class="evolucao-em-breve">
                                Em breve
                            </div>
                        `
                }

            </div>


            <div class="evolucao-identificacao">

                <span class="evolucao-numero">
                    #${numeroFormatado}
                </span>

                <span class="evolucao-nome">
                    ${nomeFormatado}
                </span>

                ${
                    no.forma
                        ? `
                            <span class="evolucao-forma">
                                ${no.forma}
                            </span>
                        `
                        : ""
                }

            </div>


            ${
                tipos.length > 0
                    ? `
                        <div class="evolucao-tipos">
                            ${criarTipos(tipos)}
                        </div>
                    `
                    : ""
            }

        </div>
    `;
}


// =========================
// CLASSE DOS FILHOS
// =========================

function obterClasseFilhos(no) {

    // Eevee possui layout próprio:
    // 2 colunas com 4 evoluções cada.
    if (no.pokemon.id === 133) {
        return (
            "evolucao-filhos " +
            "evolucao-filhos-eevee"
        );
    }


    // Outros Pokémon com muitas ramificações
    // continuam organizados verticalmente.
    if (
        POKEMONS_LAYOUT_VERTICAL.has(
            no.pokemon.id
        )
    ) {
        return (
            "evolucao-filhos " +
            "evolucao-filhos-vertical"
        );
    }


    return "evolucao-filhos";
}


// =========================
// ÁRVORE NORMAL
// =========================

export function renderizarArvoreEvolucao(
    no,
    pokemonAtual
) {
    if (!no) {
        return "";
    }


    const itemAtual =
        criarItemEvolucao(
            no,
            pokemonAtual
        );


    if (
        no.evolucoes.length === 0
    ) {
        return itemAtual;
    }


    const classeFilhos =
        obterClasseFilhos(
            no
        );


    const filhos =
        no.evolucoes
            .map(
                (evolucao) => `
                    <div class="evolucao-ramo">

                        ${renderizarArvoreEvolucao(
                            evolucao,
                            pokemonAtual
                        )}

                    </div>
                `
            )
            .join("");


    return `
        <div class="evolucao-etapa">

            ${itemAtual}

            <span
                class="seta-evolucao"
                aria-hidden="true"
            >
                →
            </span>

            <div class="${classeFilhos}">
                ${filhos}
            </div>

        </div>
    `;
}


// =========================
// CADEIAS REGIONAIS
// =========================

export function renderizarCadeiaRegional(
    etapas,
    pokemonAtual
) {
    if (
        !etapas ||
        etapas.length === 0
    ) {
        return "";
    }


    return `
        <div class="evolucao-etapa evolucao-regional">

            ${etapas
                .map(
                    (etapa, indice) => {

                        const item =
                            criarItemEvolucao(
                                etapa,
                                pokemonAtual
                            );


                        if (
                            indice ===
                            etapas.length - 1
                        ) {
                            return item;
                        }


                        return `
                            ${item}

                            <span
                                class="seta-evolucao"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        `;
                    }
                )
                .join("")
            }

        </div>
    `;
}