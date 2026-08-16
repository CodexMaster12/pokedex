// =========================
// ESTRUTURA DO MODAL
// =========================

export function criarModal() {
    return `
        <div
            class="modal"
            id="modal-pokemon"
            role="dialog"
            aria-modal="true"
            aria-label="Detalhes do Pokémon"
            aria-hidden="true"
            tabindex="-1"
        >

            <!-- Navegação: Pokémon anterior -->
            <button
                class="navegacao-modal navegacao-anterior"
                id="pokemon-anterior"
                type="button"
                aria-label="Pokémon anterior"
            >

                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <polyline
                        points="15 18 9 12 15 6"
                    ></polyline>
                </svg>

            </button>


            <div class="modal-conteudo">

                <!-- Fechar modal -->
                <button
                    id="fechar-modal"
                    type="button"
                    aria-label="Fechar detalhes"
                >
                    ×
                </button>


                <!-- Conteúdo preenchido dinamicamente -->
                <div id="detalhes-pokemon">
                </div>

            </div>


            <!-- Navegação: próximo Pokémon -->
            <button
                class="navegacao-modal navegacao-proximo"
                id="pokemon-proximo"
                type="button"
                aria-label="Próximo Pokémon"
            >

                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <polyline
                        points="9 18 15 12 9 6"
                    ></polyline>
                </svg>

            </button>

        </div>
    `;
}