import {
    obterFormasPokemon,
    obterImagemForma
} from "./formas.js";

import {
    traduzirTipo
} from "./tipos.js";

import {
    criarStats
} from "./modal-stats.js";

import {
    formatarNomePokemon
} from "./nomes-pokemon.js";

import {
    obterRegiaoPorId
} from "./geracoes.js";

import {
    possuiDiferencaSexo
} from "./sexos.js";

import {
    criarListaGolpes
} from "./golpes.js";


// =========================
// CONFIGURAÇÃO
// =========================

const API_TIPOS =
    "https://pokeapi.co/api/v2/type";


// =========================
// CACHE DOS TIPOS
// =========================

// Guarda relações de tipo já carregadas.
const CACHE_TIPOS =
    new Map();


// Evita duas requisições simultâneas
// para o mesmo tipo.
const REQUISICOES_TIPOS =
    new Map();


// =========================
// UTILIDADES DE TIPO
// =========================

function obterNomeTipo(
    tipo
) {
    return (
        tipo?.type?.name ||
        null
    );
}


async function buscarDadosTipo(
    tipo
) {
    const nomeTipo =
        obterNomeTipo(
            tipo
        );


    if (!nomeTipo) {
        return null;
    }


    if (
        CACHE_TIPOS.has(
            nomeTipo
        )
    ) {
        return CACHE_TIPOS.get(
            nomeTipo
        );
    }


    if (
        REQUISICOES_TIPOS.has(
            nomeTipo
        )
    ) {
        return await REQUISICOES_TIPOS.get(
            nomeTipo
        );
    }


    /*
        Formas vindas do endpoint /pokemon
        normalmente possuem type.url.

        Dados manuais podem possuir somente
        type.name, então criamos a URL através
        do nome como fallback.
    */
    const url =
        tipo?.type?.url ||
        `${API_TIPOS}/${encodeURIComponent(nomeTipo)}`;


    const requisicao =
        (async () => {
            const resposta =
                await fetch(
                    url
                );


            if (!resposta.ok) {
                throw new Error(
                    `Erro ao buscar relações do tipo ${nomeTipo}`
                );
            }


            return await resposta.json();
        })();


    REQUISICOES_TIPOS.set(
        nomeTipo,
        requisicao
    );


    try {
        const dados =
            await requisicao;


        CACHE_TIPOS.set(
            nomeTipo,
            dados
        );


        return dados;

    } finally {
        REQUISICOES_TIPOS.delete(
            nomeTipo
        );
    }
}


// =========================
// TIPOS
// =========================

export function criarTipos(
    tipos
) {
    if (
        !Array.isArray(tipos) ||
        tipos.length === 0
    ) {
        return "";
    }


    return tipos
        .map(
            (tipo) => {
                const nomeTipo =
                    obterNomeTipo(
                        tipo
                    );


                if (!nomeTipo) {
                    return "";
                }


                return `
                    <span class="tipo ${nomeTipo}">
                        ${traduzirTipo(nomeTipo)}
                    </span>
                `;
            }
        )
        .filter(Boolean)
        .join("");
}


// =========================
// FRAQUEZAS E RESISTÊNCIAS
// =========================

export async function calcularRelacoesDeTipo(
    pokemon
) {
    const tipos =
        Array.isArray(
            pokemon?.types
        )
            ? pokemon.types
            : [];


    if (
        tipos.length === 0
    ) {
        return {
            fraquezas: [],
            resistencias: []
        };
    }


    const relacoes = {};


    /*
        Tipos podem ser carregados ao mesmo
        tempo porque são independentes.
    */
    const dadosTipos =
        await Promise.all(
            tipos.map(
                (tipo) => {
                    return buscarDadosTipo(
                        tipo
                    );
                }
            )
        );


    dadosTipos
        .filter(Boolean)
        .forEach(
            (dadosTipo) => {

                const damageRelations =
                    dadosTipo.damage_relations;


                if (!damageRelations) {
                    return;
                }


                // =========================
                // FRAQUEZA ×2
                // =========================

                damageRelations
                    .double_damage_from
                    .forEach(
                        (item) => {

                            relacoes[item.name] =
                                (
                                    relacoes[item.name] ??
                                    1
                                ) * 2;
                        }
                    );


                // =========================
                // RESISTÊNCIA ×0.5
                // =========================

                damageRelations
                    .half_damage_from
                    .forEach(
                        (item) => {

                            relacoes[item.name] =
                                (
                                    relacoes[item.name] ??
                                    1
                                ) * 0.5;
                        }
                    );


                // =========================
                // IMUNIDADE
                // =========================

                damageRelations
                    .no_damage_from
                    .forEach(
                        (item) => {

                            relacoes[item.name] =
                                0;
                        }
                    );
            }
        );


    const fraquezas = [];
    const resistencias = [];


    Object.entries(
        relacoes
    ).forEach(
        (
            [
                tipo,
                multiplicador
            ]
        ) => {

            if (
                multiplicador > 1
            ) {
                fraquezas.push(
                    tipo
                );
            }


            if (
                multiplicador < 1
            ) {
                resistencias.push(
                    tipo
                );
            }
        }
    );


    fraquezas.sort(
        (a, b) => {
            return traduzirTipo(a)
                .localeCompare(
                    traduzirTipo(b),
                    "pt-BR"
                );
        }
    );


    resistencias.sort(
        (a, b) => {
            return traduzirTipo(a)
                .localeCompare(
                    traduzirTipo(b),
                    "pt-BR"
                );
        }
    );


    return {
        fraquezas,
        resistencias
    };
}


// =========================
// RELAÇÕES DE TIPO
// =========================

export function criarListaRelacoes(
    tipos
) {
    if (
        !Array.isArray(tipos) ||
        tipos.length === 0
    ) {
        return `
            <span class="sem-informacoes">
                Sem informações
            </span>
        `;
    }


    return tipos
        .map(
            (tipo) => `
                <span class="tipo ${tipo}">
                    ${traduzirTipo(tipo)}
                </span>
            `
        )
        .join("");
}


// =========================
// CATEGORIA
// =========================

function obterCategoria(
    especie
) {
    if (
        !Array.isArray(
            especie?.genera
        )
    ) {
        return "Sem informações";
    }


    const categoria =
        especie.genera.find(
            (genero) => {
                return (
                    genero?.language?.name ===
                    "en"
                );
            }
        );


    return (
        categoria?.genus ||
        "Sem informações"
    );
}


// =========================
// MEDIDAS
// =========================

function formatarMedida(
    valor,
    divisor,
    unidade
) {
    if (
        typeof valor !== "number" ||
        !Number.isFinite(valor)
    ) {
        return "Sem informações";
    }


    return `${valor / divisor} ${unidade}`;
}


// =========================
// HABILIDADES
// =========================

function obterHabilidades(
    pokemon
) {
    if (
        !Array.isArray(
            pokemon?.abilities
        )
    ) {
        return [];
    }


    return pokemon.abilities
        .map(
            (habilidade) => {
                return (
                    habilidade?.ability?.name ||
                    null
                );
            }
        )
        .filter(Boolean);
}


// =========================
// CONTEÚDO DO MODAL
// =========================

export function criarConteudoModal(
    pokemon,
    especie,
    relacoesTipo,
    golpesPrincipais
) {
    const numeroFormatado =
        String(
            pokemon.id
        ).padStart(
            3,
            "0"
        );


    const nomeFormatado =
        formatarNomePokemon(
            pokemon.name
        );


    const regiao =
        obterRegiaoPorId(
            pokemon.id
        );


    const formasDisponiveis =
        obterFormasPokemon(
            pokemon
        );


    const possuiDiferencaVisualSexo =
        possuiDiferencaSexo(
            pokemon
        );


    const habilidades =
        obterHabilidades(
            pokemon
        );


    const {
        fraquezas = [],
        resistencias = []
    } = relacoesTipo || {};


    return `
        <!-- =========================
             IDENTIDADE
        ========================== -->

        <section class="secao-identidade">

            <div class="controles-forma">

                ${
                    formasDisponiveis.length > 1
                        ? `
                            <div class="controle-forma">

                                <label for="seletor-forma">
                                    Forma
                                </label>

                                <select id="seletor-forma">

                                    ${
                                        formasDisponiveis
                                            .map(
                                                (forma) => `
                                                    <option value="${forma.id}">
                                                        ${forma.nome}
                                                    </option>
                                                `
                                            )
                                            .join("")
                                    }

                                </select>

                            </div>
                        `
                        : ""
                }


                <!-- =========================
                     APARÊNCIA
                ========================== -->

                <div class="controle-aparencia">

                    <span>
                        Aparência
                    </span>


                    <div class="botoes-aparencia">

                        ${
                            possuiDiferencaVisualSexo
                                ? `
                                    <button
                                        type="button"
                                        class="botao-controle-visual botao-sexo"
                                        id="botao-sexo"
                                        data-sexo="male"
                                        aria-label="Exibindo forma macho. Clique para alterar para fêmea."
                                        title="Macho"
                                    >
                                        <img
                                            id="icone-sexo"
                                            src="assets/images/interface/aparencia/masculino.png"
                                            alt=""
                                            aria-hidden="true"
                                        >
                                    </button>
                                `
                                : ""
                        }


                        <button
                            type="button"
                            class="botao-controle-visual botao-shiny"
                            id="botao-shiny"
                            aria-pressed="false"
                            aria-label="Ativar aparência Shiny"
                            title="Shiny"
                        >
                            <img
                                id="icone-shiny"
                                src="assets/images/interface/aparencia/shinyoff.png"
                                alt=""
                                aria-hidden="true"
                            >
                        </button>


                        <button
                            type="button"
                            class="botao-controle-visual botao-animado"
                            id="botao-animado"
                            aria-pressed="false"
                            aria-label="Ativar animação"
                            title="Animado"
                        >
                            <img
                                id="icone-animado"
                                src="assets/images/interface/aparencia/animadooff.png"
                                alt=""
                                aria-hidden="true"
                            >
                        </button>

                    </div>

                </div>

            </div>


            <img
                class="imagem-modal"
                id="imagem-pokemon-modal"
                src="${obterImagemForma(pokemon)}"
                alt="${nomeFormatado}"
            >


            <span class="numero-modal">
                #${numeroFormatado}
            </span>


            <span class="regiao-modal">
                ${regiao}
            </span>


            <h2>
                ${nomeFormatado}
            </h2>


            <div
                class="tipos-pokemon"
                id="tipos-pokemon-modal"
            >
                ${criarTipos(pokemon.types)}
            </div>

        </section>


        <!-- =========================
             INFORMAÇÕES PRINCIPAIS
        ========================== -->

        <section class="secao-modal informacoes-pokemon">

            <div>

                <span>
                    Categoria
                </span>

                <strong id="categoria-pokemon">
                    ${obterCategoria(especie)}
                </strong>

            </div>


            <div>

                <span>
                    Altura
                </span>

                <strong id="altura-pokemon">
                    ${formatarMedida(
                        pokemon.height,
                        10,
                        "m"
                    )}
                </strong>

            </div>


            <div>

                <span>
                    Peso
                </span>

                <strong id="peso-pokemon">
                    ${formatarMedida(
                        pokemon.weight,
                        10,
                        "kg"
                    )}
                </strong>

            </div>

        </section>


        <!-- =========================
             HABILIDADES
        ========================== -->

        <section class="secao-modal habilidades-pokemon">

            <h3>
                Habilidades
            </h3>


            <div
                class="lista-habilidades"
                id="lista-habilidades-modal"
            >

                ${
                    habilidades.length > 0

                        ? habilidades
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
                            .join("")

                        : `
                            <span class="sem-informacoes">
                                Sem informações
                            </span>
                        `
                }

            </div>

        </section>


        <!-- =========================
             ESTATÍSTICAS
        ========================== -->

        <section class="secao-modal stats-pokemon">

            <h3>
                Estatísticas
            </h3>


            <div
                class="grafico-stats"
                id="grafico-stats-modal"
            >
                ${
                    Array.isArray(pokemon.stats) &&
                    pokemon.stats.length > 0

                        ? criarStats(
                            pokemon.stats
                        )

                        : `
                            <span class="sem-informacoes">
                                Sem informações
                            </span>
                        `
                }
            </div>

        </section>


        <!-- =========================
             FRAQUEZAS E RESISTÊNCIAS
        ========================== -->

        <section class="secao-modal relacoes-tipo">

            <div class="relacao-grupo">

                <h3>
                    Fraquezas
                </h3>


                <div
                    class="lista-relacoes"
                    id="fraquezas-pokemon-modal"
                >
                    ${criarListaRelacoes(fraquezas)}
                </div>

            </div>


            <div class="relacao-grupo">

                <h3>
                    Resistências
                </h3>


                <div
                    class="lista-relacoes"
                    id="resistencias-pokemon-modal"
                >
                    ${criarListaRelacoes(resistencias)}
                </div>

            </div>

        </section>


        <!-- =========================
             GOLPES
        ========================== -->

        <section class="secao-modal golpes-pokemon">

            <h3>
                Golpes principais
            </h3>


            <div class="lista-golpes">
                ${criarListaGolpes(
                    golpesPrincipais
                )}
            </div>

        </section>


        <!-- =========================
             EVOLUÇÕES
        ========================== -->

        <section class="secao-modal evolucoes-pokemon">

            <h3>
                Evoluções
            </h3>


            <div id="lista-evolucoes">
                Carregando evoluções...
            </div>

        </section>
    `;
}