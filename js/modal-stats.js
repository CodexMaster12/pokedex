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


// Cria o gráfico de estatísticas
export function criarStats(stats) {
    return stats.map((stat) => {
        const valor = stat.base_stat;

        // Converte o valor em até 10 segmentos
        const segmentosAtivos = Math.min(
            10,
            Math.ceil(valor / 15)
        );


        const segmentos = Array.from({ length: 10 })
            .map((_, indice) => {

                const ativo =
                    indice >= 10 - segmentosAtivos
                        ? "ativo"
                        : "";

                return `
                    <div class="segmento-stat ${ativo}"></div>
                `;
            })
            .join("");


        const nomeStat =
            NOMES_STATS[stat.stat.name] ||
            stat.stat.name;


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
    }).join("");
}