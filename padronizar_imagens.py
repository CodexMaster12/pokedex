from pathlib import Path
from PIL import Image


# =========================
# CONFIGURAÇÕES
# =========================

TAMANHO_CANVAS = 500

# Percentual máximo da área que o Pokémon pode ocupar
# 0.78 = aproximadamente 78% do canvas
OCUPACAO_MAXIMA = 0.82

PASTA_POKEMON = Path("assets/images/pokemon")


# =========================
# FUNÇÃO DE PADRONIZAÇÃO
# =========================

def padronizar_imagem(caminho):
    imagem = Image.open(caminho).convert("RGBA")

    # Usa o canal alpha para encontrar a área realmente ocupada
    alpha = imagem.getchannel("A")

    bbox = alpha.getbbox()

    # Ignora imagens totalmente transparentes
    if bbox is None:
        print(f"Ignorada: {caminho}")
        return

    # Recorta somente a área onde existe conteúdo
    pokemon = imagem.crop(bbox)

    largura, altura = pokemon.size

    tamanho_maximo = int(
        TAMANHO_CANVAS * OCUPACAO_MAXIMA
    )

    # Calcula escala mantendo proporção
    escala = min(
        tamanho_maximo / largura,
        tamanho_maximo / altura
    )

    nova_largura = int(largura * escala)
    nova_altura = int(altura * escala)

    pokemon = pokemon.resize(
        (nova_largura, nova_altura),
        Image.Resampling.LANCZOS
    )

    # Cria uma nova imagem transparente
    canvas = Image.new(
        "RGBA",
        (TAMANHO_CANVAS, TAMANHO_CANVAS),
        (0, 0, 0, 0)
    )

    # Centraliza o Pokémon
    posicao_x = (
        TAMANHO_CANVAS - nova_largura
    ) // 2

    posicao_y = (
        TAMANHO_CANVAS - nova_altura
    ) // 2

    canvas.paste(
        pokemon,
        (posicao_x, posicao_y),
        pokemon
    )

    # Sobrescreve a imagem original
    canvas.save(caminho)

    print(f"Padronizada: {caminho}")


# =========================
# PROCESSAMENTO
# =========================

def processar_pasta():
    imagens = list(
        PASTA_POKEMON.rglob("*.png")
    )

    print(
        f"\nEncontradas {len(imagens)} imagens.\n"
    )

    for caminho in imagens:
        padronizar_imagem(caminho)

    print("\nProcesso concluído.")


if __name__ == "__main__":
    processar_pasta()