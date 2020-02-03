# Coin Seeker Editor
 Ediror de fases do game Coin Seeker feito em JavaScript por J.Lucas.
http://joaolucas.xyz/coinseeker/


## Instalação

### CSS:
    <link rel="stylesheet" href="editor/css/editor.css" />

### JS:
    <script src="editor/js/editor.js"></script>
Obs: adicionar script após game.js


## Atalhos do teclado

SHIT+ENTER = Ativa/Desativa editor (ao ativar o cursor deve aparecer na posição 0, 0 do grid do level)

W, A, S e D = movem o cursor do editor quando editor ativo (equivale a acima, esquerda, abaixo e direita);

SHIFT ou INSERT = insere o item selecionado na posição do cursor (o item incial é um wall "x");

ALT+INSERT = seleciona próximo item da lista (respectivamente: espaço " ", coin "o", wall "x", lava1 "!", lava2 "|", lava3 "=", lava4 "v" e personagem "@");

ALT+DELETE = seleciona item anterior da lista

SHIFT combinado com W, A, S ou D = insere o item selecionado e desloca o cursor conforme a direção usada;

DELETE = limpa a posição atual do cursor;

CTRL + SPACE = reinicia o jogo com as novas alterações

1 = Seleciona levels de J.Lucas
2 = Seleciona levels de Jair
0 = Seleciona levels do game

## Observações:

- A lista de itens ainda está invisivel;
- Ainda não é possível salvar as alterações;
