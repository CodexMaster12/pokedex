// =========================
// CABEÇALHO
// =========================

export function criarHeader() {
    return `
        <header class="cabecalho">

            <!-- Aviso de novidade -->
            <div class="badge-nova-geracao">

                <span class="badge-update">
                    NOVIDADE
                </span>

                <span class="badge-geracao">
                    Nova Geração: Johto
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
                    #001 — #251
                </span>

            </div>

        </header>
    `;
}