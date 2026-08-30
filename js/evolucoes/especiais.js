import {
    buscarPokemonPorIdentificador
} from "../api.js";


// =========================
// EVOLUÇÕES ESPECIAIS
// =========================

const EVOLUCOES_ESPECIAIS = [

    // =========================
    // GERAÇÃO 5
    // =========================

    // Basculin White-Striped
    // → Basculegion

    {
        familia: [550],

        cadeia: [
            {
                numero: 550,
                nome: "basculin",
                api: "basculin-white-striped",
                forma: "White"
            },

            {
                numero: 902,
                nome: "basculegion",
                api: "basculegion-male",
                forma: null
            }
        ]
    },


    // =========================
    // GERAÇÃO 6
    // =========================

    // Goomy
    // → Sliggoo Hisui
    // → Goodra Hisui
    //
    // Goomy já existe na árvore normal.
    // Esta cadeia começa somente
    // na ramificação alternativa.

    {
        familia: [704, 705, 706],

        ramificacaoSemRaiz: true,

        cadeia: [
            {
                numero: 705,
                nome: "sliggoo",
                api: "sliggoo-hisui",
                forma: "Hisui"
            },

            {
                numero: 706,
                nome: "goodra",
                api: "goodra-hisui",
                forma: "Hisui"
            }
        ]
    },


    // Bergmite
    // → Avalugg Hisui
    //
    // Bergmite já existe na árvore normal.

    {
        familia: [712, 713],

        ramificacaoSemRaiz: true,

        cadeia: [
            {
                numero: 713,
                nome: "avalugg",
                api: "avalugg-hisui",
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

                ramificacaoSemRaiz:
                    configuracao.ramificacaoSemRaiz ===
                    true,

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

                    types: [],

                    placeholder:
                        true
                },

                numeroExibido:
                    etapa.numero,

                nomeBase:
                    etapa.nome,

                forma:
                    etapa.forma,

                ramificacaoSemRaiz:
                    configuracao.ramificacaoSemRaiz ===
                    true,

                evolucoes: []
            });
        }
    }


    return etapas;
}


// =========================
// CONSULTA
// =========================

export async function carregarEvolucoesEspeciais(
    pokemonId
) {
    const configuracoes =
        EVOLUCOES_ESPECIAIS.filter(
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