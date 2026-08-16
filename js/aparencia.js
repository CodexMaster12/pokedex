import {
    obterSexoPadrao
} from "./sexos.js";


// =========================
// ESTADO VISUAL DO POKÉMON
// =========================


// Cria o estado visual inicial
// usado pelo modal.
export function criarEstadoAparencia(
    pokemon
) {
    return {
        forma: "normal",

        shiny: false,

        sexo:
            obterSexoPadrao(
                pokemon
            ),

        animado: false
    };
}


// =========================
// ATUALIZAÇÕES
// =========================

// Altera a forma selecionada.
export function definirForma(
    estado,
    forma
) {
    estado.forma =
        forma;
}


// Ativa ou desativa Shiny.
export function definirShiny(
    estado,
    shiny
) {
    estado.shiny =
        Boolean(
            shiny
        );
}


// Define o sexo visual.
export function definirSexo(
    estado,
    sexo
) {
    if (
        sexo !== "male" &&
        sexo !== "female"
    ) {
        return;
    }


    estado.sexo =
        sexo;
}


// Ativa ou desativa animação.
export function definirAnimado(
    estado,
    animado
) {
    estado.animado =
        Boolean(
            animado
        );
}


// =========================
// ALTERNÂNCIAS
// =========================

// Normal ↔ Shiny
export function alternarShiny(
    estado
) {
    estado.shiny =
        !estado.shiny;


    return estado.shiny;
}


// Macho ↔ Fêmea
export function alternarSexo(
    estado
) {
    estado.sexo =
        estado.sexo === "male"
            ? "female"
            : "male";


    return estado.sexo;
}


// Estático ↔ Animado
export function alternarAnimado(
    estado
) {
    estado.animado =
        !estado.animado;


    return estado.animado;
}