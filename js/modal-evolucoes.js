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


        return await carregarDadosArvore(
            arvore
        );


    } catch (erro) {

        console.warn(
            `Não foi possível carregar a evolução normal de ${pokemon.name}.`,
            erro
        );


        return [];
    }
}


// =========================
// EVOLUÇÕES REGIONAIS
// =========================

async function carregarEvolucoesRegionais(
    pokemon
) {
    try {
        return await carregarCadeiasRegionais(
            pokemon.id
        );


    } catch (erro) {

        console.warn(
            `Não foi possível carregar as evoluções regionais de ${pokemon.name}.`,
            erro
        );


        return [];
    }
}


// =========================
// EVOLUÇÕES ESPECIAIS
// =========================

async function carregarEvolucoesEspeciaisModal(
    pokemon
) {
    try {
        return await carregarEvolucoesEspeciais(
            pokemon.id
        );


    } catch (erro) {

        console.warn(
            `Não foi possível carregar as evoluções especiais de ${pokemon.name}.`,
            erro
        );


        return [];
    }
}


// =========================
// CADEIA LINEAR → ÁRVORE
// =========================
//
// Converte:
//
// Sliggoo Hisui
// Goodra Hisui
//
// em:
//
// Sliggoo Hisui
// └── Goodra Hisui
//
// Isso permite inserir a evolução especial
// diretamente na árvore normal.

function converterCadeiaEmArvore(
    etapas
) {
    if (
        !Array.isArray(etapas) ||
        etapas.length === 0
    ) {
        return null;
    }


    const raiz = {
        ...etapas[0],
        evolucoes: []
    };


    let noAtual =
        raiz;


    for (
        let indice = 1;
        indice < etapas.length;
        indice++
    ) {
        const proximoNo = {
            ...etapas[indice],
            evolucoes: []
        };


        noAtual.evolucoes.push(
            proximoNo
        );


        noAtual =
            proximoNo;
    }


    return raiz;
}


// =========================
// JUNÇÃO DAS RAMIFICAÇÕES
// =========================
//
// Algumas evoluções especiais compartilham
// a mesma raiz da árvore normal.
//
// Exemplos:
//
// Goomy
// ├── Sliggoo → Goodra
// └── Sliggoo Hisui → Goodra Hisui
//
// Bergmite
// ├── Avalugg
// └── Avalugg Hisui
//
// Essas cadeias são incorporadas à árvore
// normal antes da renderização.

function integrarRamificacoesEspeciais(
    arvoresNormais,
    cadeiasEspeciais
) {
    const especiaisSeparadas = [];


    for (
        const cadeiaEspecial of cadeiasEspeciais
    ) {
        const ramificacaoSemRaiz =
            cadeiaEspecial[0]
                ?.ramificacaoSemRaiz ===
            true;


        if (!ramificacaoSemRaiz) {
            especiaisSeparadas.push(
                cadeiaEspecial
            );

            continue;
        }


        const ramoEspecial =
            converterCadeiaEmArvore(
                cadeiaEspecial
            );


        if (!ramoEspecial) {
            continue;
        }


        const arvorePrincipal =
            arvoresNormais[0];


        if (
            !arvorePrincipal ||
            !Array.isArray(
                arvorePrincipal.evolucoes
            )
        ) {
            especiaisSeparadas.push(
                cadeiaEspecial
            );

            continue;
        }


        // A raiz passa a possuir mais de uma
        // possibilidade de evolução.
        //
        // Forçamos o mesmo comportamento visual
        // usado nas ramificações verticais,
        // independentemente do ID do Pokémon.

        arvorePrincipal.layoutVertical =
            true;


        arvorePrincipal.evolucoes.push(
            ramoEspecial
        );
    }


    return especiaisSeparadas;
}


// =========================
// RENDERIZAÇÃO NORMAL
// =========================

function renderizarEvolucoesNormais(
    arvores,
    pokemon
) {
    return arvores
        .map(
            (arvore) => {
                return renderizarArvoreEvolucao(
                    arvore,
                    pokemon
                );
            }
        )
        .join("");
}


// =========================
// RENDERIZAÇÃO DE CADEIAS
// =========================

function renderizarCadeias(
    cadeias,
    pokemon
) {
    return cadeias
        .map(
            (cadeia) => {

                if (
                    !Array.isArray(cadeia)
                ) {
                    return renderizarArvoreEvolucao(
                        cadeia,
                        pokemon
                    );
                }

                return renderizarCadeiaRegional(
                    cadeia,
                    pokemon
                );
            }
        )
        .join("");
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
        arvoresNormais,
        cadeiasRegionais,
        cadeiasEspeciais
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
    // INTEGRA RAMIFICAÇÕES
    // =========================

    const especiaisSeparadas =
        integrarRamificacoesEspeciais(
            arvoresNormais,
            cadeiasEspeciais
        );


    // =========================
    // VERIFICA MODAL ATUAL
    // =========================

    if (
        !listaEvolucoesAindaEhAtual(
            listaEvolucoes
        )
    ) {
        return;
    }


    // =========================
    // RENDERIZA CONTEÚDO
    // =========================

    const evolucoesNormais =
        renderizarEvolucoesNormais(
            arvoresNormais,
            pokemon
        );


    const evolucoesRegionais =
        renderizarCadeias(
            cadeiasRegionais,
            pokemon
        );


    const evolucoesEspeciais =
        renderizarCadeias(
            especiaisSeparadas,
            pokemon
        );


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

    const formaAtual =
        obterFormaAtualModal();


    atualizarDestaqueEvolucao(
        pokemon.id,
        formaAtual
    );
}