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


    const conteudo =
        `
            ${evolucoesNormais}
            ${evolucoesRegionais}
            ${evolucoesEspeciais}
        `.trim();


    if (!conteudo) {
        listaEvolucoes.innerHTML = `
            <p class="sem-evolucoes">
                Nenhuma evolução disponível.
            </p>
        `;

        return;
    }


    listaEvolucoes.innerHTML = `
        <div class="evolucoes-conteudo">
            ${conteudo}
        </div>
    `;


    atualizarDestaqueEvolucao(
        pokemon.id,
        "normal"
    );
}