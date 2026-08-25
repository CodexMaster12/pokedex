import {
    buscarEvolucoes
} from "./api.js";

import {
    extrairEvolucoes,
    carregarDadosArvore
} from "./evolucoes/dados.js";

import {
    carregarCadeiasRegionais
} from "./evolucoes/regionais.js";

import {
    carregarEvolucoesEspeciais
} from "./evolucoes/especiais.js";

import {
    renderizarArvoreEvolucao,
    renderizarCadeiaRegional
} from "./evolucoes/render.js";

import {
    atualizarDestaqueEvolucao
} from "./evolucoes/destaque.js";


// =========================
// EXPORTA DESTAQUE
// =========================

export {
    atualizarDestaqueEvolucao
};


// =========================
// EVOLUÇÕES NORMAIS
// =========================

async function carregarEvolucoesNormais(
    pokemon
) {
    try {
        const cadeia =
            await buscarEvolucoes(
                pokemon
            );


        const arvore =
            extrairEvolucoes(
                cadeia
            );


        const arvoresComDados =
            await carregarDadosArvore(
                arvore
            );


        return arvoresComDados
            .map(
                (arvoreComDados) => {
                    return renderizarArvoreEvolucao(
                        arvoreComDados,
                        pokemon
                    );
                }
            )
            .join("");


    } catch (erro) {
        console.warn(
            `Não foi possível carregar a evolução normal de ${pokemon.name}.`,
            erro
        );


        return "";
    }
}


// =========================
// EVOLUÇÕES REGIONAIS
// =========================

async function carregarEvolucoesRegionais(
    pokemon
) {
    try {
        const cadeiasRegionais =
            await carregarCadeiasRegionais(
                pokemon.id
            );


        return cadeiasRegionais
            .map(
                (cadeiaRegional) => {
                    return renderizarCadeiaRegional(
                        cadeiaRegional,
                        pokemon
                    );
                }
            )
            .join("");


    } catch (erro) {
        console.warn(
            `Não foi possível carregar as evoluções regionais de ${pokemon.name}.`,
            erro
        );


        return "";
    }
}


// =========================
// EVOLUÇÕES ESPECIAIS
// =========================

async function carregarEvolucoesEspeciaisModal(
    pokemon
) {
    try {
        const cadeiasEspeciais =
            await carregarEvolucoesEspeciais(
                pokemon.id
            );


        return cadeiasEspeciais
            .map(
                (cadeiaEspecial) => {
                    return renderizarCadeiaRegional(
                        cadeiaEspecial,
                        pokemon
                    );
                }
            )
            .join("");


    } catch (erro) {
        console.warn(
            `Não foi possível carregar as evoluções especiais de ${pokemon.name}.`,
            erro
        );


        return "";
    }
}


// =========================
// MODAL ATUAL
// =========================

// Confirma que a área de evoluções ainda
// pertence ao Pokémon atualmente exibido.
//
// Isso evita que um carregamento antigo
// interfira depois que o usuário navegar
// para outro Pokémon.
function listaEvolucoesAindaEhAtual(
    listaEvolucoes
) {
    return (
        listaEvolucoes.isConnected &&
        document.getElementById(
            "lista-evolucoes"
        ) === listaEvolucoes
    );
}


// =========================
// FORMA ATUAL
// =========================

// Retorna a forma atualmente selecionada
// no modal.
//
// Se o Pokémon não possuir seletor,
// considera a forma normal.
function obterFormaAtualModal() {
    const seletorForma =
        document.getElementById(
            "seletor-forma"
        );


    return (
        seletorForma?.value ||
        "normal"
    );
}


// =========================
// CARREGAMENTO PRINCIPAL
// =========================

export async function carregarEvolucoesModal(
    pokemon
) {
    const listaEvolucoes =
        document.getElementById(
            "lista-evolucoes"
        );


    if (!listaEvolucoes) {
        return;
    }


    const [
        evolucoesNormais,
        evolucoesRegionais,
        evolucoesEspeciais
    ] = await Promise.all([
        carregarEvolucoesNormais(
            pokemon
        ),

        carregarEvolucoesRegionais(
            pokemon
        ),

        carregarEvolucoesEspeciaisModal(
            pokemon
        )
    ]);


    // =========================
    // VERIFICA MODAL ATUAL
    // =========================

    /*
        O usuário pode ter navegado para
        outro Pokémon enquanto as evoluções
        estavam sendo carregadas.

        Nesse caso, não modificamos o modal
        que está atualmente na tela.
    */
    if (
        !listaEvolucoesAindaEhAtual(
            listaEvolucoes
        )
    ) {
        return;
    }


    const conteudo =
        `
            ${evolucoesNormais}
            ${evolucoesRegionais}
            ${evolucoesEspeciais}
        `.trim();


    // =========================
    // SEM EVOLUÇÕES
    // =========================

    if (!conteudo) {
        listaEvolucoes.innerHTML = `
            <p class="sem-evolucoes">
                Nenhuma evolução disponível.
            </p>
        `;

        return;
    }


    // =========================
    // RENDERIZAÇÃO
    // =========================

    listaEvolucoes.innerHTML = `
        <div class="evolucoes-conteudo">
            ${conteudo}
        </div>
    `;


    // =========================
    // DESTAQUE
    // =========================

    /*
        Usa a forma realmente selecionada
        pelo usuário em vez de sempre
        voltar para "normal".
    */
    const formaAtual =
        obterFormaAtualModal();


    atualizarDestaqueEvolucao(
        pokemon.id,
        formaAtual
    );
}