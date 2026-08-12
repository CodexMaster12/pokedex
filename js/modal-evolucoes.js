import {
    buscarEvolucoes,
    buscarPokemonPorNome
} from "./api.js";

import {
    criarTipos
} from "./modal-conteudo.js";


// =========================
// CONFIGURAÇÃO
// =========================

const LIMITE_KANTO = 151;


// =========================
// ÁRVORE DE EVOLUÇÃO
// =========================

// Transforma a resposta da API em árvore
function extrairEvolucoes(cadeia) {
    return {
        nome: cadeia.species.name,

        evolucoes: cadeia.evolves_to.map(
            (proximaEvolucao) => {

                return extrairEvolucoes(
                    proximaEvolucao
                );
            }
        )
    };
}


// Busca os dados completos da árvore
async function carregarDadosArvore(no) {
    const pokemon =
        await buscarPokemonPorNome(
            no.nome
        );


    const evolucoes =
        await Promise.all(
            no.evolucoes.map((evolucao) => {

                return carregarDadosArvore(
                    evolucao
                );
            })
        );


    const evolucoesValidas =
        evolucoes.flat();


    // Pokémon fora de Kanto é ignorado,
    // mas seus descendentes continuam sendo analisados
    if (pokemon.id > LIMITE_KANTO) {
        return evolucoesValidas;
    }


    return [
        {
            pokemon,
            evolucoes: evolucoesValidas
        }
    ];
}


// =========================
// ITEM DA EVOLUÇÃO
// =========================

function criarItemEvolucao(
    pokemon,
    pokemonAtual
) {
    const numero =
        String(pokemon.id).padStart(
            3,
            "0"
        );


    const classeAtual =
        pokemon.id === pokemonAtual.id
            ? "evolucao-atual"
            : "";


    return `
        <div class="evolucao-item ${classeAtual}">

            <div class="evolucao-imagem">

                <img
                    src="assets/images/pokemon/${numero}.png"
                    alt="${pokemon.name}"
                    loading="lazy"
                >

            </div>


            <div class="evolucao-identificacao">

                <span class="evolucao-numero">
                    #${numero}
                </span>

                <span class="evolucao-nome">
                    ${pokemon.name}
                </span>

            </div>


            <div class="evolucao-tipos">
                ${criarTipos(pokemon.types)}
            </div>

        </div>
    `;
}


// =========================
// RENDERIZAÇÃO DA ÁRVORE
// =========================

function renderizarArvoreEvolucao(
    no,
    pokemonAtual
) {
    if (!no) {
        return "";
    }


    const itemAtual =
        criarItemEvolucao(
            no.pokemon,
            pokemonAtual
        );


    if (no.evolucoes.length === 0) {
        return itemAtual;
    }


    const filhos =
        no.evolucoes
            .map((evolucao) => {

                return `
                    <div class="evolucao-ramo">

                        ${renderizarArvoreEvolucao(
                            evolucao,
                            pokemonAtual
                        )}

                    </div>
                `;
            })
            .join("");


    return `
        <div class="evolucao-etapa">

            ${itemAtual}

            <span
                class="seta-evolucao"
                aria-hidden="true"
            >
                →
            </span>

            <div class="evolucao-filhos">
                ${filhos}
            </div>

        </div>
    `;
}


// =========================
// CARREGAMENTO
// =========================

// Busca e exibe a cadeia evolutiva
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


    listaEvolucoes.innerHTML =
        arvoresComDados
            .map((arvoreComDados) => {

                return renderizarArvoreEvolucao(
                    arvoreComDados,
                    pokemon
                );
            })
            .join("");
}