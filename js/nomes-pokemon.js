// =========================
// NOMES DOS POKÉMON
// =========================


// Nomes que precisam de formatação especial
const NOMES_ESPECIAIS = {

    // =========================
    // GERAÇÕES ANTERIORES
    // =========================

    "nidoran-f": "Nidoran ♀",
    "nidoran-m": "Nidoran ♂",
    "mr-mime": "Mr. Mime",
    "farfetchd": "Farfetch'd",
    "mime-jr": "Mime Jr.",

    "deoxys-normal": "Deoxys",
    "wormadam-plant": "Wormadam",
    "giratina-altered": "Giratina",
    "shaymin-land": "Shaymin",


    // =========================
    // GERAÇÃO 5
    // =========================

    "basculin-red-striped": "Basculin",
    "darmanitan-standard": "Darmanitan",

    "frillish": "Frillish",
    "frillish-male": "Frillish",

    "jellicent": "Jellicent",
    "jellicent-male": "Jellicent",

    "tornadus-incarnate": "Tornadus",
    "thundurus-incarnate": "Thundurus",
    "landorus-incarnate": "Landorus",
    "keldeo-ordinary": "Keldeo",
    "meloetta-aria": "Meloetta",

    // =========================
    // GERAÇÃO 6
    // =========================

    "pyroar-male": "Pyroar",
    "flabebe": "Flabébé",
    "meowstic-male": "Meowstic",
    "aegislash-shield": "Aegislash",
    "pumpkaboo-average": "Pumpkaboo",
    "gourgeist-average": "Gourgeist",
    "zygarde-50": "Zygarde"
};


// =========================
// FORMATAÇÃO
// =========================

// Formata o nome do Pokémon para exibição.
export function formatarNomePokemon(
    nome
) {
    const nomeEspecial =
        NOMES_ESPECIAIS[nome];


    if (nomeEspecial) {
        return nomeEspecial;
    }


    return nome
        .split("-")
        .map(
            (parte) => {
                return (
                    parte.charAt(0).toUpperCase() +
                    parte.slice(1)
                );
            }
        )
        .join(" ");
}