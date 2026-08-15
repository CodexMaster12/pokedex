import {
    buscarPokemonPorIdentificador
} from "../api.js";


// =========================
// CADEIAS REGIONAIS
// =========================

const CADEIAS_REGIONAIS = [

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
    }
];


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
            const pokemon =
                await buscarPokemonPorIdentificador(
                    etapa.api
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
        }
    }


    return etapas;
}


// Retorna as cadeias regionais relacionadas
// ao Pokémon aberto.
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

                return carregarCadeia(
                    configuracao
                );
            }
        )
    );
}