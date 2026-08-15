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
// modal-formas.js não precise conhecer
// diretamente a pasta evolucoes/.
//

export {
    atualizarDestaqueEvolucao
};


// =========================
// EVOLUÇÕES NORMAIS
// =========================

async function carregarEvolucoesNormais(
    pokemon
) {
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
}


// =========================
// EVOLUÇÕES REGIONAIS
// =========================

async function carregarEvolucoesRegionais(
    pokemon
) {
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


    try {
        const [
            evolucoesNormais,
            evolucoesRegionais
        ] = await Promise.all([
            carregarEvolucoesNormais(
                pokemon
            ),

            carregarEvolucoesRegionais(
                pokemon
            )
        ]);


        listaEvolucoes.innerHTML = `
            <div class="evolucoes-conteudo">

                ${evolucoesNormais}

                ${evolucoesRegionais}

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
            evolutiva não deve destruir
            o restante do modal.
        */
        listaEvolucoes.innerHTML = `
            <p class="sem-evolucoes">
                Não foi possível carregar as evoluções.
            </p>
        `;
    }
}