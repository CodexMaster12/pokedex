// Cria e exibe os cards dos Pokémon
export function exibirPokemons(pokemons) {
    const lista = document.getElementById("lista-pokemon");

    // Limpa a lista antes de renderizar novamente
    lista.innerHTML = "";

    pokemons.forEach((pokemon) => {

        // Formata o número: 1 -> 001
        const numeroFormatado = String(pokemon.id).padStart(3, "0");

        // Pega os tipos do Pokémon
        const tipos = pokemon.types.map((tipo) => {
            return tipo.type.name;
        });

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
                ${tipos.map((tipo) => `
                    <span class="tipo ${tipo}">
                        ${tipo}
                    </span>
                `).join("")}
            </div>
        `;

        lista.appendChild(card);
    });
}