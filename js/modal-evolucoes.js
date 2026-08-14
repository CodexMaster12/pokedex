import {
    buscarEvolucoes,
    buscarPokemonPorNome,
    buscarPokemonPorIdentificador
} from "./api.js";

import {
    criarTipos
} from "./modal-conteudo.js";

import {
    formatarNomePokemon
} from "./nomes-pokemon.js";


// =========================
// CONFIGURAÇÕES
// =========================

const LIMITE_KANTO = 151;


// Pokémon futuros que já queremos exibir
const POKEMONS_FUTUROS = new Set([
    169, // Crobat
    172, // Pichu
    173, // Cleffa
    174, // Igglybuff
    182, // Bellossom
    186, // Politoed
    196, // Espeon
    197, // Umbreon
    199, // Slowking
    208, // Steelix
    212, // Scizor
    230, // Kingdra
    233, // Porygon2
    236, // Tyrogue
    237, // Hitmontop
    238, // Smoochum
    239, // Elekid
    240, // Magby
    242, // Blissey

    439, // Mime Jr.
    440, // Happiny
    446, // Munchlax
    462, // Magnezone
    463, // Lickilicky
    464, // Rhyperior
    465, // Tangrowth
    466, // Electivire
    467, // Magmortar
    470, // Leafeon
    471, // Glaceon
    474, // Porygon-Z

    700, // Sylveon

    865, // Sirfetch'd

    900, // Kleavor

    979  // Annihilape
]);


// =========================
// CADEIAS REGIONAIS COMPLETAS
// =========================

const CADEIAS_REGIONAIS = [

    // Rattata → Raticate de Alola
    {
        familia: [19, 20],

        cadeia: [
            {
                numero: 19,
                nome: "rattata",
                api: "rattata-alola",
                forma: "Alola"
            },

            {
                numero: 20,
                nome: "raticate",
                api: "raticate-alola",
                forma: "Alola"
            }
        ]
    },


    // Sandshrew → Sandslash de Alola
    {
        familia: [27, 28],

        cadeia: [
            {
                numero: 27,
                nome: "sandshrew",
                api: "sandshrew-alola",
                forma: "Alola"
            },

            {
                numero: 28,
                nome: "sandslash",
                api: "sandslash-alola",
                forma: "Alola"
            }
        ]
    },


    // Vulpix → Ninetales de Alola
    {
        familia: [37, 38],

        cadeia: [
            {
                numero: 37,
                nome: "vulpix",
                api: "vulpix-alola",
                forma: "Alola"
            },

            {
                numero: 38,
                nome: "ninetales",
                api: "ninetales-alola",
                forma: "Alola"
            }
        ]
    },


    // Diglett → Dugtrio de Alola
    {
        familia: [50, 51],

        cadeia: [
            {
                numero: 50,
                nome: "diglett",
                api: "diglett-alola",
                forma: "Alola"
            },

            {
                numero: 51,
                nome: "dugtrio",
                api: "dugtrio-alola",
                forma: "Alola"
            }
        ]
    },


    // Meowth → Persian de Alola
    {
        familia: [52, 53],

        cadeia: [
            {
                numero: 52,
                nome: "meowth",
                api: "meowth-alola",
                forma: "Alola"
            },

            {
                numero: 53,
                nome: "persian",
                api: "persian-alola",
                forma: "Alola"
            }
        ]
    },


    // Geodude → Graveler → Golem de Alola
    {
        familia: [74, 75, 76],

        cadeia: [
            {
                numero: 74,
                nome: "geodude",
                api: "geodude-alola",
                forma: "Alola"
            },

            {
                numero: 75,
                nome: "graveler",
                api: "graveler-alola",
                forma: "Alola"
            },

            {
                numero: 76,
                nome: "golem",
                api: "golem-alola",
                forma: "Alola"
            }
        ]
    },


    // Grimer → Muk de Alola
    {
        familia: [88, 89],

        cadeia: [
            {
                numero: 88,
                nome: "grimer",
                api: "grimer-alola",
                forma: "Alola"
            },

            {
                numero: 89,
                nome: "muk",
                api: "muk-alola",
                forma: "Alola"
            }
        ]
    },


    // Ponyta → Rapidash de Galar
    {
        familia: [77, 78],

        cadeia: [
            {
                numero: 77,
                nome: "ponyta",
                api: "ponyta-galar",
                forma: "Galar"
            },

            {
                numero: 78,
                nome: "rapidash",
                api: "rapidash-galar",
                forma: "Galar"
            }
        ]
    },


    // Growlithe → Arcanine de Hisui
    {
        familia: [58, 59],

        cadeia: [
            {
                numero: 58,
                nome: "growlithe",
                api: "growlithe-hisui",
                forma: "Hisui"
            },

            {
                numero: 59,
                nome: "arcanine",
                api: "arcanine-hisui",
                forma: "Hisui"
            }
        ]
    },


    // Voltorb → Electrode de Hisui
    {
        familia: [100, 101],

        cadeia: [
            {
                numero: 100,
                nome: "voltorb",
                api: "voltorb-hisui",
                forma: "Hisui"
            },

            {
                numero: 101,
                nome: "electrode",
                api: "electrode-hisui",
                forma: "Hisui"
            }
        ]
    }
];


// =========================
// EVOLUÇÕES ALTERNATIVAS
// =========================

const EVOLUCOES_ALTERNATIVAS = {

    // Pikachu → Raichu / Raichu Alola
    25: [
        {
            numero: 26,
            nome: "raichu",
            api: "raichu-alola",
            forma: "Alola"
        }
    ],


    // Exeggcute → Exeggutor / Exeggutor Alola
    102: [
        {
            numero: 103,
            nome: "exeggutor",
            api: "exeggutor-alola",
            forma: "Alola"
        }
    ],


    // Cubone → Marowak / Marowak Alola
    104: [
        {
            numero: 105,
            nome: "marowak",
            api: "marowak-alola",
            forma: "Alola"
        }
    ],


    // Koffing → Weezing / Weezing Galar
    109: [
        {
            numero: 110,
            nome: "weezing",
            api: "weezing-galar",
            forma: "Galar"
        }
    ]
};


// =========================
// UTILIDADES
// =========================

function pokemonDisponivel(id) {
    return (
        id <= LIMITE_KANTO ||
        POKEMONS_FUTUROS.has(id)
    );
}


// Retorna o caminho da imagem da evolução
function obterImagemEvolucao(
    numero,
    forma = null
) {
    const numeroFormatado =
        String(numero).padStart(
            3,
            "0"
        );


    // Pokémon futuro
    if (numero > LIMITE_KANTO) {
        return null;
    }


    // Forma regional
    if (forma) {
        return (
            `assets/images/pokemon/gen-1/forms/` +
            `${numeroFormatado}/` +
            `${forma.toLowerCase()}.png`
        );
    }


    // Forma normal
    return (
        `assets/images/pokemon/gen-1/normal/` +
        `${numeroFormatado}.png`
    );
}


// =========================
// ÁRVORE DA POKÉAPI
// =========================

function extrairEvolucoes(cadeia) {
    return {
        nome: cadeia.species.name,

        evolucoes:
            cadeia.evolves_to.map(
                (proximaEvolucao) => {

                    return extrairEvolucoes(
                        proximaEvolucao
                    );
                }
            )
    };
}


// Busca os dados da árvore normal
async function carregarDadosArvore(no) {
    const pokemon =
        await buscarPokemonPorNome(
            no.nome
        );


    const evolucoes =
        await Promise.all(
            no.evolucoes.map(
                (evolucao) => {

                    return carregarDadosArvore(
                        evolucao
                    );
                }
            )
        );


    let evolucoesValidas =
        evolucoes.flat();


    // Adiciona evoluções alternativas
    const alternativas =
        EVOLUCOES_ALTERNATIVAS[
            pokemon.id
        ] || [];


    if (alternativas.length > 0) {
        const dadosAlternativos =
            await Promise.all(
                alternativas.map(
                    async (alternativa) => {

                        const dados =
                            await buscarPokemonPorIdentificador(
                                alternativa.api
                            );


                        return {
                            pokemon: dados,

                            numeroExibido:
                                alternativa.numero,

                            nomeBase:
                                alternativa.nome,

                            forma:
                                alternativa.forma,

                            evolucoes: []
                        };
                    }
                )
            );


        evolucoesValidas = [
            ...evolucoesValidas,
            ...dadosAlternativos
        ];
    }


    if (!pokemonDisponivel(pokemon.id)) {
        return evolucoesValidas;
    }


    return [
        {
            pokemon,

            numeroExibido:
                pokemon.id,

            nomeBase:
                pokemon.name,

            forma: null,

            evolucoes:
                evolucoesValidas
        }
    ];
}


// =========================
// ITEM VISUAL
// =========================

function criarItemEvolucao(
    no,
    pokemonAtual
) {
    const pokemon =
        no.pokemon;


    const numeroReal =
        no.numeroExibido ??
        pokemon.id;


    const numeroFormatado =
        String(numeroReal).padStart(
            3,
            "0"
        );


    const nomeBase =
        no.nomeBase ??
        pokemon.name;


    const nomeFormatado =
        formatarNomePokemon(
            nomeBase
        );


    const formaItem =
        no.forma
            ? no.forma.toLowerCase()
            : "";


    // Ao abrir o modal, a forma normal começa destacada
    const classeAtual =
        numeroReal === pokemonAtual.id &&
        !no.forma
            ? "evolucao-atual"
            : "";


    const imagem =
        obterImagemEvolucao(
            numeroReal,
            no.forma
        );


    return `
        <div
            class="evolucao-item ${classeAtual}"
            data-pokemon-id="${numeroReal}"
            data-forma="${formaItem}"
        >

            <div class="evolucao-imagem">

                ${
                    imagem
                        ? `
                            <img
                                src="${imagem}"
                                alt="${nomeFormatado}"
                                loading="lazy"
                            >
                        `
                        : `
                            <div class="evolucao-em-breve">
                                Em breve
                            </div>
                        `
                }

            </div>


            <div class="evolucao-identificacao">

                <span class="evolucao-numero">
                    #${numeroFormatado}
                </span>

                <span class="evolucao-nome">
                    ${nomeFormatado}
                </span>

                ${
                    no.forma
                        ? `
                            <span class="evolucao-forma">
                                ${no.forma}
                            </span>
                        `
                        : ""
                }

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
            no,
            pokemonAtual
        );


    if (no.evolucoes.length === 0) {
        return itemAtual;
    }


    const usarLayoutVertical =
        no.pokemon.id === 133 ||
        no.pokemon.id === 236 ||
        no.pokemon.id === 25 ||
        no.pokemon.id === 102 ||
        no.pokemon.id === 104 ||
        no.pokemon.id === 109;


    const classeFilhos =
        usarLayoutVertical
            ? "evolucao-filhos evolucao-filhos-eevee"
            : "evolucao-filhos";


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


            <div class="${classeFilhos}">
                ${filhos}
            </div>

        </div>
    `;
}


// =========================
// CADEIAS REGIONAIS
// =========================

async function carregarCadeiaRegional(
    configuracao
) {
    const etapas = [];


    for (
        const etapa of configuracao.cadeia
    ) {
        const dados =
            await buscarPokemonPorIdentificador(
                etapa.api
            );


        etapas.push({
            pokemon: dados,

            numeroExibido:
                etapa.numero,

            nomeBase:
                etapa.nome,

            forma:
                etapa.forma,

            evolucoes: []
        });
    }


    return etapas;
}


// Renderiza uma cadeia regional
function renderizarCadeiaRegional(
    etapas,
    pokemonAtual
) {
    return `
        <div class="evolucao-etapa evolucao-regional">

            ${etapas.map(
                (etapa, indice) => {

                    const item =
                        criarItemEvolucao(
                            etapa,
                            pokemonAtual
                        );


                    if (
                        indice ===
                        etapas.length - 1
                    ) {
                        return item;
                    }


                    return `
                        ${item}

                        <span
                            class="seta-evolucao"
                            aria-hidden="true"
                        >
                            →
                        </span>
                    `;
                }
            ).join("")}

        </div>
    `;
}


// =========================
// DESTAQUE DA FORMA ATUAL
// =========================

// Atualiza somente o destaque vermelho da árvore.
// Não precisa reconstruir as evoluções.
export function atualizarDestaqueEvolucao(
    pokemonId,
    formaSelecionada = "normal"
) {
    const itens =
        document.querySelectorAll(
            "#lista-evolucoes .evolucao-item"
        );


    // Remove o destaque atual
    itens.forEach((item) => {
        item.classList.remove(
            "evolucao-atual"
        );
    });


    /*
        A forma normal possui data-forma vazio.

        As formas regionais ficam:
        alola
        galar
        hisui
        etc.
    */
    const formaProcurada =
        formaSelecionada === "normal"
            ? ""
            : formaSelecionada.toLowerCase();


    const itemAtual =
        Array.from(itens).find((item) => {

            const idItem =
                Number(
                    item.dataset.pokemonId
                );


            const formaItem =
                item.dataset.forma || "";


            return (
                idItem === pokemonId &&
                formaItem === formaProcurada
            );
        });


    if (itemAtual) {
        itemAtual.classList.add(
            "evolucao-atual"
        );
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


    // =========================
    // ÁRVORE NORMAL
    // =========================

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


    const evolucoesNormais =
        arvoresComDados
            .map((arvoreComDados) => {

                return renderizarArvoreEvolucao(
                    arvoreComDados,
                    pokemon
                );
            })
            .join("");


    // =========================
    // CADEIAS REGIONAIS
    // =========================

    const configuracoesRegionais =
        CADEIAS_REGIONAIS.filter(
            (configuracao) => {

                return configuracao.familia.includes(
                    pokemon.id
                );
            }
        );


    const cadeiasRegionais =
        await Promise.all(
            configuracoesRegionais.map(
                (configuracao) => {

                    return carregarCadeiaRegional(
                        configuracao
                    );
                }
            )
        );


    const htmlRegional =
        cadeiasRegionais
            .map((cadeiaRegional) => {

                return renderizarCadeiaRegional(
                    cadeiaRegional,
                    pokemon
                );
            })
            .join("");


    // =========================
    // RESULTADO
    // =========================

    listaEvolucoes.innerHTML = `
        <div class="evolucoes-conteudo">

            ${evolucoesNormais}

            ${htmlRegional}

        </div>
    `;


    // Garante o destaque inicial da forma normal
    atualizarDestaqueEvolucao(
        pokemon.id,
        "normal"
    );
}