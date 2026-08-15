import {
    criarHeader
} from "./header.js";

import {
    criarControles
} from "./controles.js";

import {
    criarModal
} from "./modal.js";


// =========================
// INTERFACE PRINCIPAL
// =========================

export function montarInterface() {
    const app =
        document.getElementById(
            "app"
        );


    if (!app) {
        throw new Error(
            "Elemento #app não encontrado."
        );
    }


    app.innerHTML = `
        ${criarHeader()}


        <main>

            ${criarControles()}


            <section
                class="lista-pokemon"
                id="lista-pokemon"
                aria-label="Lista de Pokémon"
            >
            </section>

        </main>


        ${criarModal()}
    `;
}