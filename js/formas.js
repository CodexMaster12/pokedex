// =========================
// FORMAS DOS POKÉMON
// =========================
//
// Este arquivo funciona como ponto central
// de acesso ao sistema de formas.
//
// A implementação está dividida em:
// - formas/base.js
// - formas/gen-1.js
// - formas/registro.js
// - formas/imagens.js
// =========================


// Consultas de formas
export {
    obterFormasPokemon,
    obterFormaSelecionada
} from "./formas/registro.js";


// Caminhos das imagens
export {
    obterImagemForma
} from "./formas/imagens.js";