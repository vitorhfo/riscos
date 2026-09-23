# Apresentação: Riscos da camada alta

Aplicação web de apresentação visual sobre os riscos de peças pintadas com camada acima da faixa ideal.

## Visão geral

Este projeto apresenta uma sequência de slides com comparações visuais entre:
- corpo de prova dentro da faixa ideal;
- corpo de prova com camada elevada;
- comparação entre as duas condições;
- evidências observadas no cliente.

A navegação usa JavaScript para controlar:
- transição entre slides;
- barra de progresso;
- modal de imagens ampliadas;
- suporte a teclado e touch.

## Estrutura da pasta

- `index.html` — estrutura da apresentação e elementos visuais;
- `style.css` — estilos da interface e do layout da apresentação;
- `script.js` — lógica de navegação, carrossel e modal;
- `assets/` — imagens utilizadas na apresentação.

## Como abrir

Você pode abrir diretamente o arquivo `index.html` em um navegador, ou servir a pasta localmente com um servidor simples, por exemplo:

```bash
cd site/dist
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Observações

- O projeto foi construído para apresentar visualmente a diferença entre corpo de prova e condição real da peça.
- As imagens de defeitos do cliente são usadas como evidência de investigação, e não como confirmação definitiva da causa do problema.
- A lógica foi organizada para permitir facilitar manutenção, ajustes de texto e troca de imagens.

## Arquivos principais

- [index.html](index.html)
- [style.css](style.css)
- [script.js](script.js)
