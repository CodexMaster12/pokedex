import {
    buscarEvolucoes,
    buscarPokemonPorNome,
    buscarEspecie
} from "./api.js";

import {
    buscarGolpesPrincipais
} from "./golpes.js";

import {
    obterFormasPokemon,
    obterImagemForma
} from "./formas.js";

import {
    traduzirTipo
} from "./tipos.js";


// =========================
// CONFIGURAÇÕES
// =========================

// Limite atual da Pokédex
const LIMITE_KANTO = 151;


// Tradução dos nomes das estatísticas
const NOMES_STATS = {
    hp: "HP",
    attack: "Ataque",
    defense: "Defesa",
    "special-attack": "Ataque Especial",
    "special-defense": "Defesa Especial",
    speed: "Velocidade"
};


// =========================
// TIPOS
// =========================

// Cria as etiquetas de tipos
function criarTipos(tipos) {
    return tipos.map((tipo) => {
        const nomeTipo = tipo.type.name;

        return `
            <span class="tipo ${nomeTipo}">
                ${traduzirTipo(nomeTipo)}
            </span>
        `;
    }).join("");
}


// Calcula fraquezas e resistências
async function calcularRelacoesDeTipo(pokemon) {
    const relacoes = {};

    for (const tipo of pokemon.types) {
        const resposta = await fetch(tipo.type.url);

        if (!resposta.ok) {
            throw new Error(
                `Erro ao buscar relações do tipo ${tipo.type.name}`
            );
        }

        const dadosTipo = await resposta.json();


        // Fraquezas
        dadosTipo.damage_relations.double_damage_from
            .forEach((item) => {

                relacoes[item.name] =
                    (relacoes[item.name] ?? 1) * 2;
            });


        // Resistências
        dadosTipo.damage_relations.half_damage_from
            .forEach((item) => {

                relacoes[item.name] =
                    (relacoes[item.name] ?? 1) * 0.5;
            });


        // Imunidades
        dadosTipo.damage_relations.no_damage_from
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
// ESTATÍSTICAS
// =========================

// Cria o gráfico de estatísticas
function criarStats(stats) {
    return stats.map((stat) => {
        const valor = stat.base_stat;

        // Converte o valor para até 10 segmentos
        const segmentosAtivos = Math.min(
            10,
            Math.ceil(valor / 15)
        );


        const segmentos = Array.from({ length: 10 })
            .map((_, indice) => {

                const ativo =
                    indice >= 10 - segmentosAtivos
                        ? "ativo"
                        : "";

                return `
                    <div class="segmento-stat ${ativo}"></div>
                `;
            })
            .join("");


        const nomeStat =
            NOMES_STATS[stat.stat.name] ||
            stat.stat.name;


        return `
            <div class="stat-coluna">

                <div class="segmentos-stat">
                    ${segmentos}
                </div>

                <span class="valor-stat">
                    ${valor}
                </span>

                <span class="nome-stat">
                    ${nomeStat}
                </span>

            </div>
        `;
    }).join("");
}


// =========================
// CATEGORIA
// =========================

// Retorna a categoria do Pokémon
function obterCategoria(especie) {
    const categoria = especie.genera.find((genero) => {
        return genero.language.name === "en";
    });

    return categoria
        ? categoria.genus
        : "Unknown";
}


// =========================
// ABERTURA DO MODAL
// =========================

// Abre o modal com os detalhes do Pokémon
export async function abrirModal(pokemon) {
    const modal =
        document.getElementById("modal-pokemon");

    const detalhes =
        document.getElementById("detalhes-pokemon");


    const numeroFormatado =
        String(pokemon.id).padStart(3, "0");


    const formasDisponiveis =
        obterFormasPokemon(pokemon);


    const habilidades = pokemon.abilities.map((habilidade) => {
        return habilidade.ability.name;
    });


    // Mostra o modal
    modal.classList.add("ativo");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    // Evita rolagem da página no fundo
    document.body.style.overflow = "hidden";


    // Permite foco no modal
    modal.focus();


    detalhes.innerHTML = `
        <p>Carregando detalhes...</p>
    `;


    try {
        // Carrega os dados necessários simultaneamente
        const [
            especie,
            relacoesTipo,
            golpesPrincipais
        ] = await Promise.all([
            buscarEspecie(pokemon),
            calcularRelacoesDeTipo(pokemon),
            buscarGolpesPrincipais(pokemon)
        ]);


        const {
            fraquezas,
            resistencias
        } = relacoesTipo;


        detalhes.innerHTML = `
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

                <div class="tipos-pokemon">
                    ${criarTipos(pokemon.types)}
                </div>

            </section>


            <!-- =========================
                 INFORMAÇÕES PRINCIPAIS
            ========================== -->

            <section class="secao-modal informacoes-pokemon">

                <div>
                    <span>Categoria</span>

                    <strong>
                        ${obterCategoria(especie)}
                    </strong>
                </div>

                <div>
                    <span>Altura</span>

                    <strong>
                        ${pokemon.height / 10} m
                    </strong>
                </div>

                <div>
                    <span>Peso</span>

                    <strong>
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

                <div class="lista-habilidades">

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

                <div class="grafico-stats">
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


        // Ativa Forma e Normal/Shiny
        configurarFormasModal(pokemon);


        // Carrega a cadeia evolutiva
        await carregarEvolucoes(pokemon);

    } catch (erro) {
        console.error(
            "Erro ao carregar detalhes:",
            erro
        );


        detalhes.innerHTML = `
            <p>
                Não foi possível carregar os detalhes do Pokémon.
            </p>
        `;
    }
}


// =========================
// EVOLUÇÕES
// =========================

// Transforma a resposta da API em uma árvore
function extrairEvolucoes(cadeia) {
    return {
        nome: cadeia.species.name,

        evolucoes: cadeia.evolves_to.map((proximaEvolucao) => {
            return extrairEvolucoes(
                proximaEvolucao
            );
        })
    };
}


// Busca os dados completos da árvore
async function carregarDadosArvore(no) {
    const pokemon =
        await buscarPokemonPorNome(no.nome);


    const evolucoes = await Promise.all(
        no.evolucoes.map((evolucao) => {
            return carregarDadosArvore(
                evolucao
            );
        })
    );


    const evolucoesValidas =
        evolucoes.flat();


    // Ignora Pokémon fora de Kanto,
    // mas mantém descendentes válidos
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


// Cria um item visual da evolução
function criarItemEvolucao(
    pokemon,
    pokemonAtual
) {
    const numero =
        String(pokemon.id).padStart(3, "0");


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


// Renderiza a árvore de evolução
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


    const filhos = no.evolucoes
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


// Busca e exibe as evoluções
async function carregarEvolucoes(pokemon) {
    const listaEvolucoes =
        document.getElementById("lista-evolucoes");


    const cadeia =
        await buscarEvolucoes(pokemon);


    const arvore =
        extrairEvolucoes(cadeia);


    const arvoresComDados =
        await carregarDadosArvore(arvore);


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


// =========================
// FORMAS E SHINY
// =========================

// Configura troca visual entre forma e versão shiny
function configurarFormasModal(pokemon) {
    const imagem =
        document.getElementById(
            "imagem-pokemon-modal"
        );


    const seletorForma =
        document.getElementById(
            "seletor-forma"
        );


    const botoesAparencia =
        document.querySelectorAll(
            ".botao-aparencia"
        );


    let formaSelecionada =
        seletorForma
            ? seletorForma.value
            : "normal";


    let shiny = false;


    // Atualiza somente a imagem
    function atualizarImagem() {
        imagem.src = obterImagemForma(
            pokemon,
            formaSelecionada,
            shiny
        );
    }


    // Troca de forma
    if (seletorForma) {
        seletorForma.addEventListener(
            "change",
            () => {

                formaSelecionada =
                    seletorForma.value;

                atualizarImagem();
            }
        );
    }


    // Normal / Shiny
    botoesAparencia.forEach((botao) => {

        botao.addEventListener("click", () => {

            shiny =
                botao.dataset.shiny === "true";


            // Remove seleção anterior
            botoesAparencia.forEach((item) => {
                item.classList.remove("ativo");
            });


            // Destaca a nova seleção
            botao.classList.add("ativo");


            atualizarImagem();
        });
    });
}


// =========================
// FECHAMENTO DO MODAL
// =========================

// Fecha o modal
function fecharModal() {
    const modal =
        document.getElementById(
            "modal-pokemon"
        );


    modal.classList.remove("ativo");


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    // Libera novamente a rolagem da página
    document.body.style.overflow = "";
}


// Configura as formas de fechar
export function configurarModal() {
    const modal =
        document.getElementById(
            "modal-pokemon"
        );


    const botaoFechar =
        document.getElementById(
            "fechar-modal"
        );


    // Botão X
    botaoFechar.addEventListener(
        "click",
        fecharModal
    );


    // Clique fora da caixa
    modal.addEventListener(
        "click",
        (evento) => {

            if (evento.target === modal) {
                fecharModal();
            }
        }
    );


    // Tecla ESC
    document.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key === "Escape" &&
                modal.classList.contains("ativo")
            ) {
                fecharModal();
            }
        }
    );
}