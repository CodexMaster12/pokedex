import {
    buscarPokemonPorIdentificador
} from "../api.js";


// =========================
// UTILIDADES
// =========================

function criarTiposFallback(
    tipos = []
) {
    return tipos.map(
        (tipo) => {
            return {
                type: {
                    name: tipo
                }
            };
        }
    );
}


// Aplica tipos de fallback sem alterar
// diretamente o objeto armazenado
// no cache global da API.

function aplicarTiposFallback(
    pokemon,
    tiposFallback = []
) {
    if (
        Array.isArray(pokemon.types) &&
        pokemon.types.length > 0
    ) {
        return pokemon;
    }


    if (
        tiposFallback.length === 0
    ) {
        return pokemon;
    }


    return {
        ...pokemon,

        types:
            criarTiposFallback(
                tiposFallback
            )
    };
}


// =========================
// CADEIAS REGIONAIS
// =========================

const CADEIAS_REGIONAIS = [

    // =========================
    // GERAÇÃO 1
    // =========================

    // Rattata → Raticate Alola
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


    // Sandshrew → Sandslash Alola
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


    // Vulpix → Ninetales Alola
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


    // Diglett → Dugtrio Alola
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


    // Meowth → Persian Alola
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


    // Meowth Galar → Perrserker
    {
        familia: [52],

        cadeia: [
            {
                numero: 52,
                nome: "meowth",
                api: "meowth-galar",
                forma: "Galar"
            },

            {
                numero: 863,
                nome: "perrserker",
                api: "perrserker",
                forma: null
            }
        ]
    },


    // Growlithe → Arcanine Hisui
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


    // Geodude → Graveler → Golem Alola
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


    // Ponyta → Rapidash Galar
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


    // Slowpoke Galar
    // ├── Slowbro Galar
    // └── Slowking Galar
    {
        familia: [79, 80, 199],

        ramificada: true,

        raiz: {
            numero: 79,
            nome: "slowpoke",
            api: "slowpoke-galar",
            forma: "Galar"
        },

        ramos: [
            {
                numero: 80,
                nome: "slowbro",
                api: "slowbro-galar",
                forma: "Galar"
            },

            {
                numero: 199,
                nome: "slowking",
                api: "slowking-galar",
                forma: "Galar"
            }
        ]
    },


    // Farfetch'd Galar → Sirfetch'd
    {
        familia: [83],

        cadeia: [
            {
                numero: 83,
                nome: "farfetchd",
                api: "farfetchd-galar",
                forma: "Galar"
            },

            {
                numero: 865,
                nome: "sirfetchd",
                api: "sirfetchd",
                forma: null
            }
        ]
    },


    // Grimer → Muk Alola
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


    // Voltorb → Electrode Hisui
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
    },


    // Mr. Mime Galar → Mr. Rime
    {
        familia: [122],

        cadeia: [
            {
                numero: 122,
                nome: "mr-mime",
                api: "mr-mime-galar",
                forma: "Galar"
            },

            {
                numero: 866,
                nome: "mr-rime",
                api: "mr-rime",
                forma: null
            }
        ]
    },


    // =========================
    // GERAÇÃO 2
    // =========================

    // Wooper Paldea → Clodsire
    {
        familia: [194],

        cadeia: [
            {
                numero: 194,
                nome: "wooper",
                api: "wooper-paldea",
                forma: "Paldea"
            },

            {
                numero: 980,
                nome: "clodsire",
                api: "clodsire",
                forma: null
            }
        ]
    },


    // Qwilfish Hisui → Overqwil
    {
        familia: [211],

        cadeia: [
            {
                numero: 211,
                nome: "qwilfish",
                api: "qwilfish-hisui",
                forma: "Hisui"
            },

            {
                numero: 904,
                nome: "overqwil",
                api: "overqwil",
                forma: null
            }
        ]
    },


    // Sneasel Hisui → Sneasler
    {
        familia: [215],

        cadeia: [
            {
                numero: 215,
                nome: "sneasel",
                api: "sneasel-hisui",
                forma: "Hisui"
            },

            {
                numero: 903,
                nome: "sneasler",
                api: "sneasler",
                forma: null
            }
        ]
    },


    // Corsola Galar → Cursola
    {
        familia: [222],

        cadeia: [
            {
                numero: 222,
                nome: "corsola",
                api: "corsola-galar",
                forma: "Galar"
            },

            {
                numero: 864,
                nome: "cursola",
                api: "cursola",
                forma: null
            }
        ]
    },


    // =========================
    // GERAÇÃO 3
    // =========================

    // Zigzagoon Galar
    // → Linoone Galar
    // → Obstagoon
    {
        familia: [263, 264],

        cadeia: [
            {
                numero: 263,
                nome: "zigzagoon",
                api: "zigzagoon-galar",
                forma: "Galar"
            },

            {
                numero: 264,
                nome: "linoone",
                api: "linoone-galar",
                forma: "Galar"
            },

            {
                numero: 862,
                nome: "obstagoon",
                api: "obstagoon",
                forma: null
            }
        ]
    },


    // =========================
    // GERAÇÃO 5
    // =========================

    // Darumaka Galar → Darmanitan Galar
    {
        familia: [554, 555],

        cadeia: [
            {
                numero: 554,
                nome: "darumaka",
                api: "darumaka-galar",
                forma: "Galar",

                tiposFallback: [
                    "ice"
                ]
            },

            {
                numero: 555,
                nome: "darmanitan",
                api: "darmanitan-galar-standard",
                forma: "Galar",

                tiposFallback: [
                    "ice"
                ]
            }
        ]
    },


    // Yamask Galar → Runerigus
    {
        familia: [562],

        cadeia: [
            {
                numero: 562,
                nome: "yamask",
                api: "yamask-galar",
                forma: "Galar"
            },

            {
                numero: 867,
                nome: "runerigus",
                api: "runerigus",
                forma: null
            }
        ]
    },


    // Zorua Hisui → Zoroark Hisui
    {
        familia: [570, 571],

        cadeia: [
            {
                numero: 570,
                nome: "zorua",
                api: "zorua-hisui",
                forma: "Hisui"
            },

            {
                numero: 571,
                nome: "zoroark",
                api: "zoroark-hisui",
                forma: "Hisui"
            }
        ]
    }

];

async function carregarEtapaRegional(
    etapa
) {
    try {
        const pokemonCarregado =
            await buscarPokemonPorIdentificador(
                etapa.api
            );

        const pokemon =
            aplicarTiposFallback(
                pokemonCarregado,
                etapa.tiposFallback
            );

        return {
            pokemon,

            numeroExibido:
                etapa.numero,

            nomeBase:
                etapa.nome,

            forma:
                etapa.forma,

            evolucoes: []
        };

    } catch (erro) {
        console.warn(
            `Não foi possível carregar ${etapa.api}.`,
            erro
        );

        return {
            pokemon: {
                id: etapa.numero,
                name: etapa.nome,

                types:
                    criarTiposFallback(
                        etapa.tiposFallback || []
                    ),

                placeholder: true
            },

            numeroExibido:
                etapa.numero,

            nomeBase:
                etapa.nome,

            forma:
                etapa.forma,

            evolucoes: []
        };
    }
}

// =========================
// CARREGAMENTO
// =========================

async function carregarCadeia(
    configuracao
) {
    const etapas = [];


    for (
        const etapa of configuracao.cadeia
    ) {
        try {
            const pokemonCarregado =
                await buscarPokemonPorIdentificador(
                    etapa.api
                );


            const pokemon =
                aplicarTiposFallback(
                    pokemonCarregado,
                    etapa.tiposFallback
                );


            etapas.push({
                pokemon,

                numeroExibido:
                    etapa.numero,

                nomeBase:
                    etapa.nome,

                forma:
                    etapa.forma,

                evolucoes: []
            });


        } catch (erro) {

            console.warn(
                `Não foi possível carregar ${etapa.api}.`,
                erro
            );


            etapas.push({
                pokemon: {
                    id:
                        etapa.numero,

                    name:
                        etapa.nome,

                    types:
                        criarTiposFallback(
                            etapa.tiposFallback || []
                        ),

                    placeholder:
                        true
                },

                numeroExibido:
                    etapa.numero,

                nomeBase:
                    etapa.nome,

                forma:
                    etapa.forma,

                evolucoes: []
            });
        }
    }


    return etapas;
}

async function carregarArvoreRegional(
    configuracao
) {
    const raiz =
        await carregarEtapaRegional(
            configuracao.raiz
        );

    const ramos =
        await Promise.all(
            configuracao.ramos.map(
                (ramo) => {
                    return carregarEtapaRegional(
                        ramo
                    );
                }
            )
        );

    raiz.layoutVertical = true;
    raiz.evolucoes = ramos;

    return raiz;
}

// =========================
// CONSULTA
// =========================

export async function carregarCadeiasRegionais(
    pokemonId
) {
    const configuracoes =
        CADEIAS_REGIONAIS.filter(
            (configuracao) => {
                return configuracao.familia.includes(
                    pokemonId
                );
            }
        );

    return await Promise.all(
        configuracoes.map(
            (configuracao) => {
                if (
                    configuracao.ramificada === true
                ) {
                    return carregarArvoreRegional(
                        configuracao
                    );
                }

                return carregarCadeia(
                    configuracao
                );
            }
        )
    );
}