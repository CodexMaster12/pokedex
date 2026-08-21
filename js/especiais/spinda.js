// =========================
// SPINDA — PADRÕES
// =========================
//
// O Spinda (#327) possui um padrão
// visual determinado por uma seed
// de 32 bits.
//
// A seed controla o deslocamento
// das quatro manchas.
//
// Normal e Shiny compartilham
// exatamente o mesmo padrão.
// =========================


// =========================
// CONFIGURAÇÃO
// =========================

const ID_SPINDA = 327;


const CAMINHO_BASE =
    "assets/images/pokemon/gen-3/special/spinda/";


// =========================
// CACHE DAS IMAGENS
// =========================

const CACHE_IMAGENS =
    new Map();


// =========================
// SEED
// =========================

function gerarSeedSpinda() {
    if (
        window.crypto &&
        window.crypto.getRandomValues
    ) {
        const valores =
            new Uint32Array(1);


        window.crypto.getRandomValues(
            valores
        );


        return valores[0];
    }


    return Math.floor(
        Math.random() *
        0x100000000
    );
}


// =========================
// FORMATAÇÃO DA SEED
// =========================

function formatarSeed(
    seed
) {
    return seed
        .toString(16)
        .toUpperCase()
        .padStart(
            8,
            "0"
        );
}


// =========================
// CARREGAMENTO DA BASE
// =========================

function carregarImagem(
    caminho
) {
    if (
        CACHE_IMAGENS.has(
            caminho
        )
    ) {
        return CACHE_IMAGENS.get(
            caminho
        );
    }


    const promessa =
        new Promise(
            (resolve, reject) => {

                const imagem =
                    new Image();


                imagem.onload =
                    () => {

                        resolve(
                            imagem
                        );
                    };


                imagem.onerror =
                    () => {

                        reject(
                            new Error(
                                `Erro ao carregar imagem do Spinda: ${caminho}`
                            )
                        );
                    };


                imagem.src =
                    caminho;
            }
        );


    CACHE_IMAGENS.set(
        caminho,
        promessa
    );


    return promessa;
}


// =========================
// DADOS DA SEED
// =========================

// 32 bits = 8 grupos de 4 bits.
//
// Cada mancha utiliza:
// - 1 valor para X
// - 1 valor para Y
function obterNibble(
    seed,
    indice
) {
    return (
        seed >>>
        (indice * 4)
    ) & 0xF;
}


// =========================
// DESLOCAMENTO
// =========================

function converterDeslocamento(
    valor,
    amplitude
) {
    const normalizado =
        (
            valor - 7.5
        ) / 7.5;


    return (
        normalizado *
        amplitude
    );
}


// =========================
// MANCHA ORGÂNICA
// =========================

// Cria uma mancha levemente irregular,
// evitando o aspecto de círculo perfeito.
function desenharManchaOrganica(
    contexto,
    x,
    y,
    largura,
    altura,
    rotacao,
    cor
) {
    contexto.save();


    contexto.translate(
        x,
        y
    );


    contexto.rotate(
        rotacao
    );


    const metadeLargura =
        largura / 2;


    const metadeAltura =
        altura / 2;


    contexto.beginPath();


    contexto.moveTo(
        0,
        -metadeAltura
    );


    contexto.bezierCurveTo(
        metadeLargura * 0.75,
        -metadeAltura * 1.05,

        metadeLargura * 1.10,
        -metadeAltura * 0.25,

        metadeLargura,
        metadeAltura * 0.20
    );


    contexto.bezierCurveTo(
        metadeLargura * 0.90,
        metadeAltura * 0.85,

        metadeLargura * 0.20,
        metadeAltura * 1.10,

        -metadeLargura * 0.15,
        metadeAltura
    );


    contexto.bezierCurveTo(
        -metadeLargura * 0.85,
        metadeAltura * 0.90,

        -metadeLargura * 1.10,
        metadeAltura * 0.25,

        -metadeLargura,
        -metadeAltura * 0.15
    );


    contexto.bezierCurveTo(
        -metadeLargura * 0.75,
        -metadeAltura * 0.85,

        -metadeLargura * 0.20,
        -metadeAltura * 1.05,

        0,
        -metadeAltura
    );


    contexto.closePath();


    contexto.fillStyle =
        cor;


    contexto.fill();


    contexto.restore();
}


// =========================
// CAMADA DAS MANCHAS
// =========================

function criarCamadaManchas(
    largura,
    altura,
    seed,
    shiny
) {
    const camada =
        document.createElement(
            "canvas"
        );


    camada.width =
        largura;


    camada.height =
        altura;


    const contexto =
        camada.getContext(
            "2d"
        );


    const cor =
        shiny
            ? "#9fb53e"
            : "#ff3048";


    /*
        Coordenadas calibradas para
        base.png / base-shiny.png
        de 607 × 607.

        Elas são relativas para
        continuarem funcionando caso
        o arquivo seja redimensionado.
    */
    const manchas = [

        // =========================
        // ORELHA ESQUERDA
        // =========================

        {
            x: 0.300,
            y: 0.195,

            largura: 0.105,
            altura: 0.135,

            amplitudeX: 0.040,
            amplitudeY: 0.040,

            rotacao: -0.20
        },


        // =========================
        // ORELHA DIREITA
        // =========================

        {
            x: 0.745,
            y: 0.290,

            largura: 0.110,
            altura: 0.130,

            amplitudeX: 0.040,
            amplitudeY: 0.040,

            rotacao: 0.25
        },


        // =========================
        // ROSTO ESQUERDO
        // =========================

        {
            x: 0.350,
            y: 0.480,

            largura: 0.125,
            altura: 0.115,

            amplitudeX: 0.045,
            amplitudeY: 0.040,

            rotacao: -0.30
        },


        // =========================
        // ROSTO DIREITO
        // =========================

        {
            x: 0.585,
            y: 0.505,

            largura: 0.135,
            altura: 0.120,

            amplitudeX: 0.045,
            amplitudeY: 0.040,

            rotacao: 0.30
        }
    ];


    manchas.forEach(
        (mancha, indice) => {

            const valorX =
                obterNibble(
                    seed,
                    indice * 2
                );


            const valorY =
                obterNibble(
                    seed,
                    indice * 2 + 1
                );


            const deslocamentoX =
                converterDeslocamento(
                    valorX,
                    largura *
                        mancha.amplitudeX
                );


            const deslocamentoY =
                converterDeslocamento(
                    valorY,
                    altura *
                        mancha.amplitudeY
                );


            desenharManchaOrganica(
                contexto,

                largura *
                    mancha.x +
                    deslocamentoX,

                altura *
                    mancha.y +
                    deslocamentoY,

                largura *
                    mancha.largura,

                altura *
                    mancha.altura,

                mancha.rotacao,

                cor
            );
        }
    );


    return camada;
}


// =========================
// RECORTE PELO SPINDA
// =========================

// Usa a transparência da própria
// imagem-base como máscara.
//
// Qualquer parte das manchas que
// ultrapassar o corpo do Spinda
// é automaticamente removida.
function recortarManchasNoCorpo(
    camadaManchas,
    imagemBase
) {
    const contexto =
        camadaManchas.getContext(
            "2d"
        );


    contexto.save();


    contexto.globalCompositeOperation =
        "destination-in";


    contexto.drawImage(
        imagemBase,
        0,
        0,
        camadaManchas.width,
        camadaManchas.height
    );


    contexto.restore();
}


// =========================
// RENDERIZAÇÃO
// =========================

async function renderizarSpinda(
    canvas,
    estadoSpinda,
    estadoAparencia
) {
    const caminho =
        estadoAparencia.shiny
            ? (
                `${CAMINHO_BASE}` +
                `base-shiny.png`
            )
            : (
                `${CAMINHO_BASE}` +
                `base.png`
            );


    try {
        const imagemBase =
            await carregarImagem(
                caminho
            );


        canvas.width =
            imagemBase.naturalWidth;


        canvas.height =
            imagemBase.naturalHeight;


        const contexto =
            canvas.getContext(
                "2d"
            );


        contexto.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // =========================
        // BASE
        // =========================

        contexto.drawImage(
            imagemBase,
            0,
            0,
            canvas.width,
            canvas.height
        );


        // =========================
        // MANCHAS
        // =========================

        const camadaManchas =
            criarCamadaManchas(
                canvas.width,
                canvas.height,
                estadoSpinda.seed,
                estadoAparencia.shiny
            );


        // Remove qualquer parte da
        // mancha fora do Spinda.
        recortarManchasNoCorpo(
            camadaManchas,
            imagemBase
        );


        /*
            Multiply permite que as
            espirais pretas e o sombreado
            da imagem continuem visíveis.
        */
        contexto.save();


        contexto.globalCompositeOperation =
            "multiply";


        contexto.drawImage(
            camadaManchas,
            0,
            0
        );


        contexto.restore();


    } catch (erro) {
        console.error(
            "Erro ao renderizar Spinda:",
            erro
        );
    }
}


// =========================
// CONTROLE VISUAL
// =========================

function criarControlePadrao(
    estadoSpinda,
    aoGerarNovoPadrao
) {
    const controle =
        document.createElement(
            "div"
        );


    controle.className =
        "controle-spinda";


    controle.innerHTML = `
        <span class="titulo-padrao-spinda">
            Padrão
        </span>

        <div class="padrao-spinda">

            <code
                class="codigo-padrao-spinda"
                id="codigo-padrao-spinda"
            >
                ${formatarSeed(
                    estadoSpinda.seed
                )}
            </code>

            <button
                type="button"
                class="botao-novo-padrao-spinda"
                id="botao-novo-padrao-spinda"
                aria-label="Gerar novo padrão do Spinda"
                title="Novo padrão"
            >
                ↻
            </button>

        </div>
    `;


    const botao =
        controle.querySelector(
            "#botao-novo-padrao-spinda"
        );


    botao.addEventListener(
        "click",
        aoGerarNovoPadrao
    );


    return controle;
}


// =========================
// CONFIGURAÇÃO DO MODAL
// =========================

export function configurarSpindaModal(
    pokemon,
    imagemOriginal,
    estadoAparencia
) {
    if (
        pokemon.id !==
        ID_SPINDA
    ) {
        return null;
    }


    const estadoSpinda = {
        seed:
            gerarSeedSpinda()
    };


    // =========================
    // CANVAS
    // =========================

    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.className =
        "imagem-modal canvas-spinda";


    canvas.setAttribute(
        "aria-label",
        "Spinda com padrão visual gerado"
    );


    imagemOriginal.insertAdjacentElement(
        "afterend",
        canvas
    );


    imagemOriginal.classList.add(
        "imagem-spinda-original-oculta"
    );


    // =========================
    // CONTROLE
    // =========================

    const controlesForma =
        document.querySelector(
            ".controles-forma"
        );


    const atualizarCodigo =
        () => {

            const codigo =
                document.getElementById(
                    "codigo-padrao-spinda"
                );


            if (codigo) {
                codigo.textContent =
                    formatarSeed(
                        estadoSpinda.seed
                    );
            }
        };


    const atualizar =
        async () => {

            await renderizarSpinda(
                canvas,
                estadoSpinda,
                estadoAparencia
            );
        };


    const gerarNovoPadrao =
        async () => {

            estadoSpinda.seed =
                gerarSeedSpinda();


            atualizarCodigo();


            await atualizar();
        };


    if (controlesForma) {
        const controlePadrao =
            criarControlePadrao(
                estadoSpinda,
                gerarNovoPadrao
            );


        controlesForma.appendChild(
            controlePadrao
        );
    }


    // =========================
    // RENDER INICIAL
    // =========================

    atualizar();


    return {
        atualizar,
        gerarNovoPadrao,

        obterSeed() {
            return estadoSpinda.seed;
        }
    };
}