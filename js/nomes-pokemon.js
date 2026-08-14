// =========================
// NOMES DOS POKÉMON
// =========================


// Nomes que precisam de formatação especial
const NOMES_ESPECIAIS = {
    "nidoran-f": "Nidoran ♀",
    "nidoran-m": "Nidoran ♂",
    "mr-mime": "Mr. Mime",
    "farfetchd": "Farfetch'd",
    "mime-jr": "Mime Jr."
};


// Formata o nome para exibição
export function formatarNomePokemon(nome) {
    if (NOMES_ESPECIAIS[nome]) {
        return NOMES_ESPECIAIS[nome];
    }

    return nome
        .split("-")
        .map((parte) => {
            return (
                parte.charAt(0).toUpperCase() +
                parte.slice(1)
            );
        })
        .join(" ");
}