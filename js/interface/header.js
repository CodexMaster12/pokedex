import {
    REGIAO_ATUAL,
    LIMITE_POKEDEX_ATUAL
} from "../geracoes.js";


// =========================
// CABEÇALHO
// =========================

export function criarHeader() {
    const limiteFormatado =
        String(
            LIMITE_POKEDEX_ATUAL
        ).padStart(
            3,
            "0"
        );


    return `
        <header class="cabecalho">

            <!-- Aviso de novidade -->
            <div class="badge-nova-geracao">

                <span class="badge-update">
                    NOVIDADE
                </span>

                <span class="badge-geracao">
                    Nova Geração: ${REGIAO_ATUAL}
                </span>

            </div>


            <div class="cabecalho-conteudo">

                <div class="titulo-pokedex">

                    <img
                        class="icone-pokebola"
                        src="assets/images/interface/pokeball.png"
                        alt=""
                        aria-hidden="true"
                    >

                    <h1>
                        Pokédex
                    </h1>

                </div>


                <p class="subtitulo-pokedex">
                    Descubra e explore o mundo dos Pokémon
                </p>


                <span class="geracao-atual">
                    #001 — #${limiteFormatado}
                </span>

            </div>

        </header>
    `;
}