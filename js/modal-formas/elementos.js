// =========================
// ELEMENTOS DO MODAL
// =========================

export function obterElementosModalFormas() {
    return {

        imagem:
            document.getElementById(
                "imagem-pokemon-modal"
            ),


        seletorForma:
            document.getElementById(
                "seletor-forma"
            ),


        controleAparencia:
            document.querySelector(
                ".controle-aparencia"
            ),


        botaoSexo:
            document.getElementById(
                "botao-sexo"
            ),


        iconeSexo:
            document.getElementById(
                "icone-sexo"
            ),


        botaoShiny:
            document.getElementById(
                "botao-shiny"
            ),


        iconeShiny:
            document.getElementById(
                "icone-shiny"
            ),


        botaoAnimado:
            document.getElementById(
                "botao-animado"
            ),


        iconeAnimado:
            document.getElementById(
                "icone-animado"
            ),


        tiposModal:
            document.getElementById(
                "tipos-pokemon-modal"
            ),


        alturaModal:
            document.getElementById(
                "altura-pokemon"
            ),


        pesoModal:
            document.getElementById(
                "peso-pokemon"
            ),


        habilidadesModal:
            document.getElementById(
                "lista-habilidades-modal"
            ),


        statsModal:
            document.getElementById(
                "grafico-stats-modal"
            ),


        fraquezasModal:
            document.getElementById(
                "fraquezas-pokemon-modal"
            ),


        resistenciasModal:
            document.getElementById(
                "resistencias-pokemon-modal"
            ),


        golpesModal:
            document.querySelector(
                ".lista-golpes"
            )
    };
}