// =========================
// ESTATÍSTICAS DO MODAL
// =========================


// Tradução dos nomes das estatísticas
const NOMES_STATS = {
    hp: "HP",
    attack: "Ataque",
    defense: "Defesa",
    "special-attack": "Ataque Especial",
    "special-defense": "Defesa Especial",
    speed: "Velocidade"
};


// =========================
// SEGMENTOS
// =========================

function criarSegmentosStat(
    valor
) {
    const totalSegmentos = 10;


    const segmentosAtivos =
        Math.min(
            totalSegmentos,
            Math.ceil(
                valor / 15
            )
        );


    return Array.from({
        length: totalSegmentos
    })
        .map(
            (_, indice) => {

                const ativo =
                    indice >=
                    totalSegmentos -
                    segmentosAtivos
                        ? "ativo"
                        : "";


                return `
                    <div
                        class="segmento-stat ${ativo}"
                    >
                    </div>
                `;
            }
        )
        .join("");
}


// =========================
// ESTATÍSTICAS
// =========================

// Cria o gráfico de estatísticas.
export function criarStats(
    stats
) {
    return stats
        .map(
            (stat) => {

                const valor =
                    stat.base_stat;


                const nomeStat =
                    NOMES_STATS[
                        stat.stat.name
                    ] ||
                    stat.stat.name;


                const segmentos =
                    criarSegmentosStat(
                        valor
                    );


                return `
                    <div class="stat-coluna">

                        <div class="segmentos-stat">
                            ${segmentos}
                        </div>

                        <span class="valor-stat">
                            ${valor}
                        </span>

                        <span class="nome-stat">
                            ${nomeStat}
                        </span>

                    </div>
                `;
            }
        )
        .join("");
}