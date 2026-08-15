// =========================
// TIPOS DOS POKÉMON
// =========================

// Tradução dos tipos
export const NOMES_TIPOS = {
    normal: "Normal",
    fire: "Fogo",
    water: "Água",
    electric: "Elétrico",
    grass: "Grama",
    ice: "Gelo",
    fighting: "Lutador",
    poison: "Veneno",
    ground: "Terra",
    flying: "Voador",
    psychic: "Psíquico",
    bug: "Inseto",
    rock: "Pedra",
    ghost: "Fantasma",
    dragon: "Dragão",
    dark: "Sombrio",
    steel: "Aço",
    fairy: "Fada"
};


// =========================
// TRADUÇÃO
// =========================

// Retorna o nome traduzido de um tipo.
export function traduzirTipo(
    tipo
) {
    return (
        NOMES_TIPOS[tipo] ||
        tipo
    );
}