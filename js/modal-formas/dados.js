import {
    buscarPokemonPorIdentificador,
    buscarFormaPokemonPorIdentificador
} from "../api.js";

import {
    obterFormaSelecionada
} from "../formas.js";

import {
    obterDadosFormaManual
} from "../formas/dados-manuais.js";

import {
    criarTipos,
    calcularRelacoesDeTipo,
    criarListaRelacoes
} from "../modal-conteudo.js";

import {
    criarStats
} from "../modal-stats.js";

import {
    buscarGolpesPrincipais,
    criarListaGolpes
} from "../golpes.js";


// =========================
// HABILIDADES
// =========================

function criarHabilidades(
    habilidades
) {
    if (
        !Array.isArray(habilidades) ||
        habilidades.length === 0
    ) {
        return `
            <span class="sem-informacoes">
                Sem informações
            </span>
        `;
    }


    const nomesHabilidades =
        habilidades
            .map(
                (habilidade) => {
                    return (
                        habilidade
                            ?.ability
                            ?.name ||
                        null
                    );
                }
            )
            .filter(Boolean);


    if (
        nomesHabilidades.length === 0
    ) {
        return `
            <span class="sem-informacoes">
                Sem informações
            </span>
        `;
    }


    return nomesHabilidades
        .map(
            (habilidade) => `
                <span class="habilidade">

                    <span
                        class="icone-habilidade"
                        aria-hidden="true"
                    >
                        ✦
                    </span>

                    ${habilidade}

                </span>
            `
        )
        .join("");
}


// =========================
// DADOS MANUAIS
// =========================

// Combina os dados normais do Pokémon
// com somente aquilo que foi informado
// manualmente para determinada forma.
function combinarDadosManuais(
    pokemon,
    dadosManuais
) {
    return {
        ...pokemon,

        types:
            dadosManuais.types ??
            pokemon.types,

        abilities:
            dadosManuais.abilities ??
            pokemon.abilities,

        stats:
            dadosManuais.stats ??
            pokemon.stats,

        height:
            dadosManuais.height ??
            pokemon.height,

        weight:
            dadosManuais.weight ??
            pokemon.weight,

        moves:
            dadosManuais.moves ??
            pokemon.moves
    };
}


// =========================
// DADOS DO POKÉMON-FORM
// =========================

// O endpoint /pokemon-form não possui
// todos os dados encontrados em /pokemon.
//
// Por isso, mantemos os dados normais
// do Pokémon e substituímos somente
// aquilo que a forma realmente informa.
function combinarDadosPokemonForm(
    pokemon,
    dadosForma
) {
    return {
        ...pokemon,

        types:
            Array.isArray(
                dadosForma?.types
            ) &&
            dadosForma.types.length > 0

                ? dadosForma.types
                : pokemon.types
    };
}


// =========================
// IDENTIFICADOR POKÉMON-FORM
// =========================

// Exemplos:
//
// Burmy + sandy
// → burmy-sandy
//
// Gastrodon + east
// → gastrodon-east
//
// Arceus + bug
// → arceus-bug
function criarIdentificadorPokemonForm(
    pokemon,
    forma
) {
    return (
        `${pokemon.name}-${forma.id}`
    );
}


// =========================
// CONTROLADOR DE DADOS
// =========================

export function criarControladorDadosForma(
    pokemon,
    estadoAparencia,
    elementos
) {
    const {
        tiposModal,
        alturaModal,
        pesoModal,
        habilidadesModal,
        statsModal,
        fraquezasModal,
        resistenciasModal,
        golpesModal
    } = elementos;


    // =========================
    // CONTROLE DE ATUALIZAÇÃO
    // =========================

    /*
        Cada troca de forma recebe um ID.

        Se uma requisição antiga terminar
        depois de uma troca mais recente,
        seu resultado será ignorado.
    */
    let idAtualizacaoDados = 0;


    function iniciarAtualizacao() {
        idAtualizacaoDados++;

        return idAtualizacaoDados;
    }


    function atualizacaoEhAtual(
        idAtualizacao
    ) {
        return (
            idAtualizacao ===
            idAtualizacaoDados
        );
    }


    // =========================
    // FRAQUEZAS / RESISTÊNCIAS
    // =========================

    async function atualizarRelacoesTipo(
        dadosPokemon,
        idAtualizacao
    ) {
        const relacoes =
            await calcularRelacoesDeTipo(
                dadosPokemon
            );


        if (
            !atualizacaoEhAtual(
                idAtualizacao
            )
        ) {
            return;
        }


        fraquezasModal.innerHTML =
            criarListaRelacoes(
                relacoes.fraquezas
            );


        resistenciasModal.innerHTML =
            criarListaRelacoes(
                relacoes.resistencias
            );
    }


    // =========================
    // GOLPES
    // =========================

    async function atualizarGolpes(
        dadosPokemon,
        usarVersaoKanto,
        idAtualizacao
    ) {
        let golpes =
            await buscarGolpesPrincipais(
                dadosPokemon,
                usarVersaoKanto
            );


        if (
            !atualizacaoEhAtual(
                idAtualizacao
            )
        ) {
            return;
        }


        /*
            Algumas formas não possuem
            lista própria de golpes.

            Nesse caso, usamos os golpes
            do Pokémon base.
        */
        if (
            golpes.length === 0 &&
            dadosPokemon !== pokemon
        ) {
            golpes =
                await buscarGolpesPrincipais(
                    pokemon,
                    true
                );


            if (
                !atualizacaoEhAtual(
                    idAtualizacao
                )
            ) {
                return;
            }
        }


        golpesModal.innerHTML =
            criarListaGolpes(
                golpes
            );
    }


    // =========================
    // APLICA DADOS
    // =========================

    async function aplicarDadosPokemon(
        dadosPokemon,
        usarVersaoKanto,
        idAtualizacao
    ) {
        if (
            !atualizacaoEhAtual(
                idAtualizacao
            )
        ) {
            return;
        }


        // =========================
        // TIPOS
        // =========================

        tiposModal.innerHTML =
            criarTipos(
                dadosPokemon.types
            );


        // =========================
        // ALTURA
        // =========================

        alturaModal.textContent =
            typeof dadosPokemon.height ===
                "number"

                ? `${dadosPokemon.height / 10} m`
                : "Sem informações";


        // =========================
        // PESO
        // =========================

        pesoModal.textContent =
            typeof dadosPokemon.weight ===
                "number"

                ? `${dadosPokemon.weight / 10} kg`
                : "Sem informações";


        // =========================
        // HABILIDADES
        // =========================

        habilidadesModal.innerHTML =
            criarHabilidades(
                dadosPokemon.abilities
            );


        // =========================
        // STATS
        // =========================

        statsModal.innerHTML =
            Array.isArray(
                dadosPokemon.stats
            ) &&
            dadosPokemon.stats.length > 0

                ? criarStats(
                    dadosPokemon.stats
                )

                : `
                    <span class="sem-informacoes">
                        Sem informações
                    </span>
                `;


        // =========================
        // DADOS ASSÍNCRONOS
        // =========================

        await Promise.all([
            atualizarRelacoesTipo(
                dadosPokemon,
                idAtualizacao
            ),

            atualizarGolpes(
                dadosPokemon,
                usarVersaoKanto,
                idAtualizacao
            )
        ]);
    }


    // =========================
    // NORMAL — INTERNO
    // =========================

    async function aplicarDadosNormais(
        idAtualizacao
    ) {
        await aplicarDadosPokemon(
            pokemon,
            true,
            idAtualizacao
        );
    }


    // =========================
    // NORMAL — PÚBLICO
    // =========================

    async function restaurarDadosNormais() {
        const idAtualizacao =
            iniciarAtualizacao();


        await aplicarDadosNormais(
            idAtualizacao
        );
    }


    // =========================
    // POKÉMON-FORM
    // =========================

    async function tentarAplicarPokemonForm(
        forma,
        idAtualizacao
    ) {
        const identificador =
            criarIdentificadorPokemonForm(
                pokemon,
                forma
            );


        try {
            const dadosForma =
                await buscarFormaPokemonPorIdentificador(
                    identificador
                );


            if (
                !atualizacaoEhAtual(
                    idAtualizacao
                )
            ) {
                return true;
            }


            const dadosCombinados =
                combinarDadosPokemonForm(
                    pokemon,
                    dadosForma
                );


            await aplicarDadosPokemon(
                dadosCombinados,
                false,
                idAtualizacao
            );


            return true;


        } catch (erro) {
            return false;
        }
    }


    // =========================
    // FORMA
    // =========================

    async function atualizarDadosForma() {
        const idAtualizacao =
            iniciarAtualizacao();


        const forma =
            obterFormaSelecionada(
                pokemon,
                estadoAparencia.forma
            );


        // =========================
        // NORMAL
        // =========================

        if (
            forma.id ===
            "normal"
        ) {
            await aplicarDadosNormais(
                idAtualizacao
            );

            return;
        }


        // =========================
        // ENDPOINT /POKEMON
        // =========================

        if (forma.api) {
            try {
                const dadosForma =
                    await buscarPokemonPorIdentificador(
                        forma.api
                    );


                if (
                    !atualizacaoEhAtual(
                        idAtualizacao
                    )
                ) {
                    return;
                }


                await aplicarDadosPokemon(
                    dadosForma,
                    false,
                    idAtualizacao
                );


                return;


            } catch (erro) {

                if (
                    atualizacaoEhAtual(
                        idAtualizacao
                    )
                ) {
                    console.error(
                        "Erro ao carregar dados da forma:",
                        erro
                    );
                }
            }
        }


        if (
            !atualizacaoEhAtual(
                idAtualizacao
            )
        ) {
            return;
        }


        // =========================
        // DADOS MANUAIS
        // =========================

        const dadosManuais =
            obterDadosFormaManual(
                pokemon.id,
                forma.id
            );


        if (dadosManuais) {
            const dadosCombinados =
                combinarDadosManuais(
                    pokemon,
                    dadosManuais
                );


            await aplicarDadosPokemon(
                dadosCombinados,
                false,
                idAtualizacao
            );


            return;
        }


        // =========================
        // ENDPOINT /POKEMON-FORM
        // =========================

        const pokemonFormAplicado =
            await tentarAplicarPokemonForm(
                forma,
                idAtualizacao
            );


        if (
            !atualizacaoEhAtual(
                idAtualizacao
            )
        ) {
            return;
        }


        if (pokemonFormAplicado) {
            return;
        }


        // =========================
        // FALLBACK
        // =========================

        await aplicarDadosNormais(
            idAtualizacao
        );
    }


    return {
        atualizarDadosForma,
        restaurarDadosNormais
    };
}