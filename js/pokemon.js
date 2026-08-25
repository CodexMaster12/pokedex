import {
    abrirModal
} from "./modal.js";

import {
    traduzirTipo
} from "./tipos.js";

import {
    formatarNomePokemon
} from "./nomes-pokemon.js";

import {
    obterPastaGeracao,
    obterRegiaoPorId
} from "./geracoes.js";


// =========================
// CARD DO POKÉMON
// =========================

function criarCardPokemon(
    pokemon
) {
    const numeroFormatado =
        String(
            pokemon.id
        ).padStart(
            3,
            "0"
        );


    const nomeFormatado =
        formatarNomePokemon(
            pokemon.name
        );


    const pastaGeracao =
        obterPastaGeracao(
            pokemon.id
        );


    const regiao =
        obterRegiaoPorId(
            pokemon.id
        );


    const tipos =
        Array.isArray(
            pokemon.types
        )
            ? pokemon.types.map(
                (tipo) => {
                    return tipo.type.name;
                }
            )
            : [];


    const card =
        document.createElement(
            "article"
        );


    card.classList.add(
        "card-pokemon"
    );


    card.tabIndex = 0;


    card.setAttribute(
        "role",
        "button"
    );


    card.setAttribute(
        "aria-label",
        `Abrir detalhes de ${nomeFormatado}`
    );


    card.innerHTML = `
        <img
            src="assets/images/pokemon/${pastaGeracao}/normal/${numeroFormatado}.png"
            alt="${nomeFormatado}"
            loading="lazy"
        >

        <span class="numero-pokemon">
            #${numeroFormatado}
        </span>

        <span class="regiao-pokemon">
            ${regiao}
        </span>

        <h2>
            ${nomeFormatado}
        </h2>

        <div class="tipos-pokemon">
            ${
                tipos
                    .map(
                        (tipo) => `
                            <span class="tipo ${tipo}">
                                ${traduzirTipo(tipo)}
                            </span>
                        `
                    )
                    .join("")
            }
        </div>
    `;


    // =========================
    // CLIQUE
    // =========================

    card.addEventListener(
        "click",
        () => {
            /*
                O modal aparece imediatamente.

                Se os dados completos ainda
                não estiverem carregados,
                o próprio modal irá buscá-los.
            */
            abrirModal(
                pokemon
            );
        }
    );


    // =========================
    // TECLADO
    // =========================

    card.addEventListener(
        "keydown",
        (evento) => {
            if (
                evento.key === "Enter" ||
                evento.key === " "
            ) {
                evento.preventDefault();


                abrirModal(
                    pokemon
                );
            }
        }
    );


    return card;
}


// =========================
// LISTA DE POKÉMON
// =========================

export function exibirPokemons(
    pokemons
) {
    const lista =
        document.getElementById(
            "lista-pokemon"
        );


    if (!lista) {
        return;
    }


    lista.innerHTML = "";


    const fragmento =
        document.createDocumentFragment();


    pokemons.forEach(
        (pokemon) => {
            const card =
                criarCardPokemon(
                    pokemon
                );


            fragmento.appendChild(
                card
            );
        }
    );


    lista.appendChild(
        fragmento
    );
}