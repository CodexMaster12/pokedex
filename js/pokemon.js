import {
    abrirModal
} from "./modal.js";

import {
    traduzirTipo
} from "./tipos.js";

import {
    formatarNomePokemon
} from "./nomes-pokemon.js";


// =========================
// CARDS DOS POKÉMON
// =========================

// Cria e exibe os cards dos Pokémon
export function exibirPokemons(pokemons) {
    const lista =
        document.getElementById(
            "lista-pokemon"
        );


    lista.innerHTML = "";


    pokemons.forEach((pokemon) => {

        const numeroFormatado =
            String(pokemon.id).padStart(
                3,
                "0"
            );


        const nomeFormatado =
            formatarNomePokemon(
                pokemon.name
            );


        const tipos =
            pokemon.types.map((tipo) => {
                return tipo.type.name;
            });


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
                src="assets/images/pokemon/gen-1/normal/${numeroFormatado}.png"
                alt="${nomeFormatado}"
                loading="lazy"
            >

            <span>
                #${numeroFormatado}
            </span>

            <h2>
                ${nomeFormatado}
            </h2>

            <div class="tipos-pokemon">

                ${tipos.map((tipo) => `
                    <span class="tipo ${tipo}">
                        ${traduzirTipo(tipo)}
                    </span>
                `).join("")}

            </div>
        `;


        // Clique
        card.addEventListener(
            "click",
            () => {
                abrirModal(
                    pokemon
                );
            }
        );


        // Teclado
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


        lista.appendChild(
            card
        );
    });
}