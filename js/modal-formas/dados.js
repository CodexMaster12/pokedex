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
        !habilidades ||
        habilidades.length === 0
    ) {
        return `
            <span class="sem-informacoes">
                Sem informações
            </span>
        `;
    }


    return habilidades
        .map(
            (habilidade) => `
                <span class="habilidade">

                    <span
                        class="icone-habilidade"
                        aria-hidden="true"
                    >
                        ✦
                    </span>

                    ${habilidade.ability.name}

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
            dadosForma.types &&
            dadosForma.types.length > 0
                ? dadosForma.types
                : pokemon.types
    };
}


// =========================
// IDENTIFICADOR POKÉMON-FORM
// =========================

// Monta automaticamente o identificador
// utilizado pelo endpoint /pokemon-form.
//
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
    // FRAQUEZAS / RESISTÊNCIAS
    // =========================

    async function atualizarRelacoesTipo(
        dadosPokemon
    ) {
        const relacoes =
            await calcularRelacoesDeTipo(
                dadosPokemon
            );


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
        usarVersaoKanto
    ) {
        let golpes =
            await buscarGolpesPrincipais(
                dadosPokemon,
                usarVersaoKanto
            );


        if (
            golpes.length === 0 &&
            dadosPokemon !== pokemon
        ) {
            golpes =
                await buscarGolpesPrincipais(
                    pokemon,
                    true
                );
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
        usarVersaoKanto
    ) {
        tiposModal.innerHTML =
            criarTipos(
                dadosPokemon.types
            );


        alturaModal.textContent =
            dadosPokemon.height != null
                ? `${dadosPokemon.height / 10} m`
                : "Sem informações";


        pesoModal.textContent =
            dadosPokemon.weight != null
                ? `${dadosPokemon.weight / 10} kg`
                : "Sem informações";


        habilidadesModal.innerHTML =
            criarHabilidades(
                dadosPokemon.abilities
            );


        statsModal.innerHTML =
            dadosPokemon.stats &&
            dadosPokemon.stats.length > 0
                ? criarStats(
                    dadosPokemon.stats
                )
                : `
                    <span class="sem-informacoes">
                        Sem informações
                    </span>
                `;


        await Promise.all([
            atualizarRelacoesTipo(
                dadosPokemon
            ),

            atualizarGolpes(
                dadosPokemon,
                usarVersaoKanto
            )
        ]);
    }


    // =========================
    // NORMAL
    // =========================

    async function restaurarDadosNormais() {
        await aplicarDadosPokemon(
            pokemon,
            true
        );
    }


    // =========================
    // POKÉMON-FORM
    // =========================

    async function tentarAplicarPokemonForm(
        forma
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


            const dadosCombinados =
                combinarDadosPokemonForm(
                    pokemon,
                    dadosForma
                );


            await aplicarDadosPokemon(
                dadosCombinados,
                false
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
            await restaurarDadosNormais();

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


                await aplicarDadosPokemon(
                    dadosForma,
                    false
                );


                return;


            } catch (erro) {
                console.error(
                    "Erro ao carregar dados da forma:",
                    erro
                );
            }
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
                false
            );


            return;
        }


        // =========================
        // ENDPOINT /POKEMON-FORM
        // =========================

        const pokemonFormAplicado =
            await tentarAplicarPokemonForm(
                forma
            );


        if (pokemonFormAplicado) {
            return;
        }


        // =========================
        // FALLBACK
        // =========================

        await restaurarDadosNormais();
    }


    return {
        atualizarDadosForma,
        restaurarDadosNormais
    };
}