import {
    buscarEvolucoes,
    buscarPokemonPorNome
} from "./api.js";


// Limite atual da Pokédex: primeira geração
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


// Cria as etiquetas de tipos
function criarTipos(tipos) {
    return tipos.map((tipo) => {
        const nomeTipo = tipo.type.name;

        return `
            <span class="tipo ${nomeTipo}">
                ${nomeTipo}
            </span>
        `;
    }).join("");
}


// Cria o gráfico de estatísticas
function criarStats(stats) {
    return stats.map((stat) => {
        const valor = stat.base_stat;

        // Converte o valor para uma escala de até 10 segmentos
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

        return `
            <div class="stat-coluna">

                <div class="segmentos-stat">
                    ${segmentos}
                </div>

                <span class="valor-stat">
                    ${valor}
                </span>

                <span class="nome-stat">
                    ${NOMES_STATS[stat.stat.name]}
                </span>

            </div>
        `;
    }).join("");
}


// Abre o modal com os detalhes do Pokémon selecionado
export async function abrirModal(pokemon) {
    const modal = document.getElementById("modal-pokemon");
    const detalhes = document.getElementById("detalhes-pokemon");

    const numeroFormatado = String(pokemon.id).padStart(3, "0");

    const habilidades = pokemon.abilities.map((habilidade) => {
        return habilidade.ability.name;
    });


    detalhes.innerHTML = `
        <img
            class="imagem-modal"
            src="assets/images/pokemon/${numeroFormatado}.png"
            alt="${pokemon.name}"
        >

        <span>#${numeroFormatado}</span>

        <h2>${pokemon.name}</h2>


        <!-- Tipos -->
        <div class="tipos-pokemon">
            ${criarTipos(pokemon.types)}
        </div>


        <!-- Altura e peso -->
        <div class="informacoes-pokemon">

            <p>
                <strong>Altura:</strong>
                ${pokemon.height / 10} m
            </p>

            <p>
                <strong>Peso:</strong>
                ${pokemon.weight / 10} kg
            </p>

        </div>


        <!-- Habilidades -->
        <div class="habilidades-pokemon">

            <h3>Habilidades</h3>

            <div class="lista-habilidades">
                ${habilidades.map((habilidade) => `
                    <span class="habilidade">
                        <span class="icone-habilidade">✦</span>
                        ${habilidade}
                    </span>
                `).join("")}
            </div>

        </div>


        <!-- Estatísticas -->
        <div class="stats-pokemon">

            <h3>Estatísticas</h3>

            <div class="grafico-stats">
                ${criarStats(pokemon.stats)}
            </div>

        </div>


        <!-- Evoluções -->
        <div class="evolucoes-pokemon">

            <h3>Evoluções</h3>

            <div id="lista-evolucoes">
                Carregando evoluções...
            </div>

        </div>
    `;


    modal.classList.add("ativo");


    try {
        await carregarEvolucoes(pokemon);

    } catch (erro) {
        console.error(
            "Erro ao carregar evoluções:",
            erro
        );

        const listaEvolucoes =
            document.getElementById("lista-evolucoes");

        listaEvolucoes.textContent =
            "Não foi possível carregar as evoluções.";
    }
}


// Transforma a resposta da PokéAPI em uma árvore de evoluções
function extrairEvolucoes(cadeia) {
    return {
        nome: cadeia.species.name,

        evolucoes: cadeia.evolves_to.map((proximaEvolucao) => {
            return extrairEvolucoes(proximaEvolucao);
        })
    };
}


// Busca os dados completos da árvore e mantém somente Pokémon de Kanto
async function carregarDadosArvore(no) {
    const pokemon = await buscarPokemonPorNome(no.nome);

    // Continua percorrendo os descendentes mesmo que o Pokémon atual
    // não faça parte da primeira geração
    const evolucoes = await Promise.all(
        no.evolucoes.map((evolucao) => {
            return carregarDadosArvore(evolucao);
        })
    );

    // Junta todos os possíveis ramos retornados
    const evolucoesValidas = evolucoes.flat();


    // Se o Pokémon atual não pertence a Kanto,
    // ignora apenas ele e promove suas evoluções válidas
    if (pokemon.id > LIMITE_KANTO) {
        return evolucoesValidas;
    }


    // Pokémon de Kanto permanece normalmente na árvore
    return [
        {
            pokemon,
            evolucoes: evolucoesValidas
        }
    ];
}


// Cria um item visual da cadeia de evolução
function criarItemEvolucao(pokemon, pokemonAtual) {
    const numero = String(pokemon.id).padStart(3, "0");

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


// Renderiza a árvore, incluindo evoluções ramificadas
function renderizarArvoreEvolucao(no, pokemonAtual) {
    if (!no) {
        return "";
    }

    const itemAtual =
        criarItemEvolucao(no.pokemon, pokemonAtual);

    if (no.evolucoes.length === 0) {
        return itemAtual;
    }

    const filhos = no.evolucoes.map((evolucao) => {
        return `
            <div class="evolucao-ramo">
                ${renderizarArvoreEvolucao(
                    evolucao,
                    pokemonAtual
                )}
            </div>
        `;
    }).join("");

    return `
        <div class="evolucao-etapa">

            ${itemAtual}

            <span class="seta-evolucao">
                →
            </span>

            <div class="evolucao-filhos">
                ${filhos}
            </div>

        </div>
    `;
}


// Busca e exibe a cadeia de evolução
async function carregarEvolucoes(pokemon) {
    const listaEvolucoes =
        document.getElementById("lista-evolucoes");

    const cadeia =
        await buscarEvolucoes(pokemon);

    const arvore =
        extrairEvolucoes(cadeia);

    // Pode existir mais de uma raiz depois de remover
    // Pokémon de gerações posteriores
    const arvoresComDados =
        await carregarDadosArvore(arvore);


    // Renderiza todas as raízes válidas
    listaEvolucoes.innerHTML = arvoresComDados
        .map((arvoreComDados) => {
            return renderizarArvoreEvolucao(
                arvoreComDados,
                pokemon
            );
        })
        .join("");
}


// Fecha o modal
function fecharModal() {
    const modal =
        document.getElementById("modal-pokemon");

    modal.classList.remove("ativo");
}


// Configura as formas de fechar o modal
export function configurarModal() {
    const modal =
        document.getElementById("modal-pokemon");

    const botaoFechar =
        document.getElementById("fechar-modal");


    // Fecha pelo botão X
    botaoFechar.addEventListener(
        "click",
        fecharModal
    );


    // Fecha clicando fora da caixa
    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            fecharModal();
        }
    });


    // Fecha pressionando ESC
    document.addEventListener("keydown", (evento) => {
        if (
            evento.key === "Escape" &&
            modal.classList.contains("ativo")
        ) {
            fecharModal();
        }
    });
}