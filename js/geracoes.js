// =========================
// GERAÇÕES
// =========================


// Retorna a geração com base no número da Pokédex Nacional
export function obterGeracaoPorId(id) {
    if (id >= 1 && id <= 151) {
        return 1;
    }

    if (id >= 152 && id <= 251) {
        return 2;
    }

    if (id >= 252 && id <= 386) {
        return 3;
    }

    if (id >= 387 && id <= 493) {
        return 4;
    }

    if (id >= 494 && id <= 649) {
        return 5;
    }

    if (id >= 650 && id <= 721) {
        return 6;
    }

    if (id >= 722 && id <= 809) {
        return 7;
    }

    if (id >= 810 && id <= 905) {
        return 8;
    }

    if (id >= 906) {
        return 9;
    }

    return null;
}


// Retorna o nome da pasta da geração
export function obterPastaGeracao(id) {
    const geracao =
        obterGeracaoPorId(id);

    if (!geracao) {
        return null;
    }

    return `gen-${geracao}`;
}