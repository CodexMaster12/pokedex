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
    renderizarArvoreEvolucao,
    renderizarCadeiaRegional
} from "./evolucoes/render.js";

import {
    atualizarDestaqueEvolucao
} from "./evolucoes/destaque.js";


// =========================
// EXPORTA DESTAQUE
// =========================
//
// Mantemos esta exportação aqui para que
// modal-formas.js NÃO precise ser alterado.
//

export {
    atualizarDestaqueEvolucao
};


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


    try {
        // =========================
        // ÁRVORE NORMAL
        // =========================

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


        const evolucoesNormais =
            arvoresComDados
                .map(
                    (arvoreComDados) => {

                        return renderizarArvoreEvolucao(
                            arvoreComDados,
                            pokemon
                        );
                    }
                )
                .join("");


        // =========================
        // CADEIAS REGIONAIS
        // =========================

        const cadeiasRegionais =
            await carregarCadeiasRegionais(
                pokemon.id
            );


        const htmlRegional =
            cadeiasRegionais
                .map(
                    (cadeiaRegional) => {

                        return renderizarCadeiaRegional(
                            cadeiaRegional,
                            pokemon
                        );
                    }
                )
                .join("");


        // =========================
        // RESULTADO
        // =========================

        listaEvolucoes.innerHTML = `
            <div class="evolucoes-conteudo">

                ${evolucoesNormais}

                ${htmlRegional}

            </div>
        `;


        // Forma normal começa destacada.
        atualizarDestaqueEvolucao(
            pokemon.id,
            "normal"
        );


    } catch (erro) {
        console.error(
            "Erro ao carregar evoluções:",
            erro
        );


        /*
            Um erro exclusivamente na cadeia
            de evolução não deve mais destruir
            todo o modal do Pokémon.
        */
        listaEvolucoes.innerHTML = `
            <p class="sem-evolucoes">
                Não foi possível carregar as evoluções.
            </p>
        `;
    }
}