import { abrirModal } from "./modal.js";


// Cria o HTML das etiquetas de tipo
function criarTipos(tipos) {
    return tipos.map((tipo) => {
        const nomeTipo = tipo.type.name;

        return `
            <span class="tipo ${nomeTipo}">
                ${nomeTipo}
            </span>
        `;
    }).join("");
}


// Cria e exibe os cards dos Pokémon
export function exibirPokemons(pokemons) {
    const lista = document.getElementById("lista-pokemon");

    // Limpa a lista antes de renderizar novamente
    lista.innerHTML = "";

    pokemons.forEach((pokemon) => {
        const numeroFormatado = String(pokemon.id).padStart(3, "0");

        const card = document.createElement("article");

        card.classList.add("card-pokemon");

        card.innerHTML = `
            <img
                src="assets/images/pokemon/${numeroFormatado}.png"
                alt="${pokemon.name}"
            >

            <span>#${numeroFormatado}</span>

            <h2>${pokemon.name}</h2>

            <div class="tipos-pokemon">
                ${criarTipos(pokemon.types)}
            </div>
        `;

        // Abre os detalhes do Pokémon ao clicar no card
        card.addEventListener("click", () => {
            abrirModal(pokemon);
        });

        lista.appendChild(card);
    });
}