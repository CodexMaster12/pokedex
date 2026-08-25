// =========================
// CONTROLES DA POKÉDEX
// =========================

export function criarControles() {
    return `
        <section
            class="controles"
            aria-label="Pesquisa e filtros da Pokédex"
        >

            <!-- =========================
                 BARRA PRINCIPAL
            ========================== -->

            <div class="controles-principais">

                <!-- Pesquisa expansível -->
                <div
                    class="pesquisa-container"
                    id="pesquisa-container"
                >

                    <button
                        class="botao-pesquisa"
                        id="botao-pesquisa"
                        type="button"
                        aria-label="Abrir pesquisa"
                        aria-expanded="false"
                        aria-controls="busca-pokemon"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle
                                cx="11"
                                cy="11"
                                r="7"
                            ></circle>

                            <line
                                x1="16.5"
                                y1="16.5"
                                x2="21"
                                y2="21"
                            ></line>
                        </svg>

                    </button>


                    <input
                        type="search"
                        id="busca-pokemon"
                        placeholder="Pesquisar Pokémon..."
                        aria-label="Pesquisar Pokémon"
                        autocomplete="off"
                    >

                </div>


                <!-- Configurações avançadas -->
                <button
                    class="botao-configuracoes"
                    id="botao-configuracoes"
                    type="button"
                    aria-expanded="false"
                    aria-controls="painel-configuracoes"
                >

                    <!-- Ícone de ajustes -->
                    <svg
                        class="icone-ajustes"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >

                        <line
                            x1="4"
                            y1="6"
                            x2="20"
                            y2="6"
                        ></line>

                        <circle
                            cx="9"
                            cy="6"
                            r="2"
                        ></circle>

                        <line
                            x1="4"
                            y1="12"
                            x2="20"
                            y2="12"
                        ></line>

                        <circle
                            cx="15"
                            cy="12"
                            r="2"
                        ></circle>

                        <line
                            x1="4"
                            y1="18"
                            x2="20"
                            y2="18"
                        ></line>

                        <circle
                            cx="11"
                            cy="18"
                            r="2"
                        ></circle>

                    </svg>


                    <span>
                        Configurações avançadas
                    </span>


                    <svg
                        class="icone-seta-configuracoes"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <polyline
                            points="6 9 12 15 18 9"
                        ></polyline>
                    </svg>

                </button>

            </div>


            <!-- =========================
                 PAINEL AVANÇADO
            ========================== -->

            <div
                class="painel-configuracoes"
                id="painel-configuracoes"
                aria-hidden="true"
            >

                <div class="configuracoes-grid">

                    <!-- Filtro por tipo -->
                    <div class="grupo-configuracao">

                        <label for="filtro-tipo">
                            Tipos
                        </label>

                        <select
                            id="filtro-tipo"
                            aria-label="Filtrar Pokémon por tipo"
                        >
                            <option value="todos">
                                Todos os tipos
                            </option>
                        </select>

                    </div>


                    <!-- Filtro por geração -->
                    <div class="grupo-configuracao">

                        <label for="filtro-geracao">
                            Gerações
                        </label>

                        <select
                            id="filtro-geracao"
                            aria-label="Filtrar Pokémon por geração"
                        >

                            <option value="todas">
                                Todas as gerações
                            </option>

                            <option value="1">
                                Kanto
                            </option>

                            <option value="2">
                                Johto
                            </option>

                            <option value="3">
                                Hoenn
                            </option>

                            <option value="4">
                                Sinnoh
                            </option>

                            <option value="5">
                                Unova
                            </option>

                        </select>

                    </div>


                    <!-- Filtro por forma regional -->
                    <div class="grupo-configuracao">

                        <label for="filtro-regional">
                            Formas regionais
                        </label>

                        <select
                            id="filtro-regional"
                            aria-label="Filtrar Pokémon por forma regional"
                        >

                            <option value="todas">
                                Todas as formas
                            </option>

                            <option value="alola">
                                Alola
                            </option>

                            <option value="galar">
                                Galar
                            </option>

                            <option value="hisui">
                                Hisui
                            </option>

                            <option value="paldea">
                                Paldea
                            </option>

                        </select>

                    </div>


                    <!-- Ordenação -->
                    <div class="grupo-configuracao">

                        <label for="ordenacao">
                            Ordenação
                        </label>

                        <select
                            id="ordenacao"
                            aria-label="Ordenar Pokémon"
                        >

                            <option value="numero-asc">
                                Número crescente
                            </option>

                            <option value="numero-desc">
                                Número decrescente
                            </option>

                            <option value="nome-az">
                                Nome A-Z
                            </option>

                            <option value="nome-za">
                                Nome Z-A
                            </option>

                        </select>

                    </div>

                </div>

            </div>

        </section>
    `;
}