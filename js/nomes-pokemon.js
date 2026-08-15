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


// =========================
// FORMATAÇÃO
// =========================

// Formata o nome do Pokémon para exibição.
export function formatarNomePokemon(nome) {
    const nomeEspecial =
        NOMES_ESPECIAIS[nome];


    if (nomeEspecial) {
        return nomeEspecial;
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