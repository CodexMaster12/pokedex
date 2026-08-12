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


// =========================
// TIPOS
// =========================

// Cria as etiquetas de tipos
export function criarTipos(tipos) {
    return tipos.map((tipo) => {
        const nomeTipo =
            tipo.type.name;

        return `
            <span class="tipo ${nomeTipo}">
                ${traduzirTipo(nomeTipo)}
            </span>
        `;
    }).join("");
}


// Calcula fraquezas e resistências
export async function calcularRelacoesDeTipo(pokemon) {
    const relacoes = {};


    for (const tipo of pokemon.types) {
        const resposta =
            await fetch(tipo.type.url);


        if (!resposta.ok) {
            throw new Error(
                `Erro ao buscar relações do tipo ${tipo.type.name}`
            );
        }


        const dadosTipo =
            await resposta.json();


        // Fraquezas
        dadosTipo.damage_relations
            .double_damage_from
            .forEach((item) => {

                relacoes[item.name] =
                    (relacoes[item.name] ?? 1) * 2;
            });


        // Resistências
        dadosTipo.damage_relations
            .half_damage_from
            .forEach((item) => {

                relacoes[item.name] =
                    (relacoes[item.name] ?? 1) * 0.5;
            });


        // Imunidades
        dadosTipo.damage_relations
            .no_damage_from
            .forEach((item) => {

                relacoes[item.name] = 0;
            });
    }


    const fraquezas = [];
    const resistencias = [];


    Object.entries(relacoes).forEach(
        ([tipo, multiplicador]) => {

            if (multiplicador > 1) {
                fraquezas.push(tipo);
            }

            if (multiplicador < 1) {
                resistencias.push(tipo);
            }
        }
    );


    return {
        fraquezas,
        resistencias
    };
}


// =========================
// CATEGORIA
// =========================

function obterCategoria(especie) {
    const categoria =
        especie.genera.find((genero) => {
            return genero.language.name === "en";
        });


    return categoria
        ? categoria.genus
        : "Unknown";
}


// =========================
// CONTEÚDO DO MODAL
// =========================

// Monta todo o HTML principal do modal
export function criarConteudoModal(
    pokemon,
    especie,
    relacoesTipo,
    golpesPrincipais
) {
    const numeroFormatado =
        String(pokemon.id).padStart(3, "0");


    const formasDisponiveis =
        obterFormasPokemon(pokemon);


    const habilidades =
        pokemon.abilities.map((habilidade) => {
            return habilidade.ability.name;
        });


    const {
        fraquezas,
        resistencias
    } = relacoesTipo;


    return `
        <!-- =========================
             IDENTIDADE
        ========================== -->

        <section class="secao-identidade">

            <!-- Controles de forma -->
            <div class="controles-forma">

                ${
                    formasDisponiveis.length > 1
                        ? `
                            <div class="controle-forma">

                                <label for="seletor-forma">
                                    Forma
                                </label>

                                <select id="seletor-forma">

                                    ${formasDisponiveis
                                        .map((forma) => `
                                            <option value="${forma.id}">
                                                ${forma.nome}
                                            </option>
                                        `)
                                        .join("")
                                    }

                                </select>

                            </div>
                        `
                        : ""
                }


                <div class="controle-aparencia">

                    <span>
                        Aparência
                    </span>

                    <div class="botoes-aparencia">

                        <button
                            type="button"
                            class="botao-aparencia ativo"
                            data-shiny="false"
                        >
                            Normal
                        </button>

                        <button
                            type="button"
                            class="botao-aparencia"
                            data-shiny="true"
                        >
                            Shiny
                        </button>

                    </div>

                </div>

            </div>


            <!-- Imagem principal -->
            <img
                class="imagem-modal"
                id="imagem-pokemon-modal"
                src="${obterImagemForma(pokemon)}"
                alt="${pokemon.name}"
            >


            <span class="numero-modal">
                #${numeroFormatado}
            </span>


            <h2>
                ${pokemon.name}
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
                    ${pokemon.height / 10} m
                </strong>

            </div>


            <div>

                <span>
                    Peso
                </span>

                <strong id="peso-pokemon">
                    ${pokemon.weight / 10} kg
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

                ${habilidades.map((habilidade) => `
                    <span class="habilidade">

                        <span
                            class="icone-habilidade"
                            aria-hidden="true"
                        >
                            ✦
                        </span>

                        ${habilidade}

                    </span>
                `).join("")}

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
                ${criarStats(pokemon.stats)}
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

                <div class="lista-relacoes">

                    ${fraquezas.map((tipo) => `
                        <span class="tipo ${tipo}">
                            ${traduzirTipo(tipo)}
                        </span>
                    `).join("")}

                </div>

            </div>


            <div class="relacao-grupo">

                <h3>
                    Resistências
                </h3>

                <div class="lista-relacoes">

                    ${resistencias.map((tipo) => `
                        <span class="tipo ${tipo}">
                            ${traduzirTipo(tipo)}
                        </span>
                    `).join("")}

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

                ${
                    golpesPrincipais.length > 0

                        ? golpesPrincipais
                            .map((golpe) => `
                                <div class="golpe-item">

                                    <div class="golpe-cabecalho">

                                        <span class="tipo ${golpe.tipo}">
                                            ${golpe.tipoTraduzido}
                                        </span>

                                        <span class="nome-golpe">
                                            ${golpe.nome}
                                        </span>

                                    </div>


                                    <div class="golpe-detalhes">

                                        <span>
                                            ${
                                                golpe.nivel === 0
                                                    ? "Inicial"
                                                    : `Nv. ${golpe.nivel}`
                                            }
                                        </span>


                                        <span>
                                            Poder:

                                            <strong>
                                                ${golpe.poder ?? "—"}
                                            </strong>
                                        </span>


                                        <span>
                                            Precisão:

                                            <strong>
                                                ${golpe.precisao ?? "—"}
                                            </strong>
                                        </span>

                                    </div>

                                </div>
                            `)
                            .join("")

                        : `
                            <p class="sem-golpes">
                                Nenhum golpe por nível encontrado em Red/Blue.
                            </p>
                        `
                }

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