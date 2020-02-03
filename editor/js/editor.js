/*
var games = [
  {
    "id": 1,
    "autor": "joão Lucas",
    "path": "levels/joaolucas/01/",
    "length": 6
  },
  {
    "id": 2,
    "autor": "Jair Dias",
    "path": "levels/jairedias/01/",
    "length": 1
  }
];
*/
var games = [
  {
    "id": 1,
    "title": "Fases J.Lucas 01",
    "autor": "João Lucas",
    "path": "editor/levels/joaolucas/01/",
    "length": 6
  },
  {
    "id": 2,
    "title": "Fases Jairpro 01",
    "autor": "Jair Dias",
    "path": "editor/levels/jairedias/01/",
    "length": 1
  },
  {
    "id": 0,
    "title": "Fases Game 01",
    "autor": "joão Lucas",
    "path": "editor/levels/game/01/",
    "length": 6
  },
]

//var games = require('./data.json'); //with path
//var games = require('./editor/levels/games.json'); //with path

var LEVELS2 = [];
var LEVELS_OK = false;
var LAST_LEVEL_PATH = "";
var gameIndex = 0;

String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

class Editor {
  constructor() {
    this.cursorY = 0;
    this.cursorX = 0;
    this.active = false;
    this.logActive = true;
    this.itemIndex = 1;
    this.items = [
      {"ch": " ", "name": "space" },
      {"ch": "x", "name": "wall" },
      {"ch": "!", "name": "lava 1" },
      {"ch": "|", "name": "lava 2" },
      {"ch": "=", "name": "lava 3" }  ,
      {"ch": "v", "name": "lava 4" },
      {"ch": "@", "name": "me" },
    ]
    this.setItem(this.itemIndex); 
  }

  switch() {
    this.active = !this.active;
    if (this.active) {
      this.showCursor();
    } 
    else {
      this.hideCursor();
    }
    this.consoleStatus("switch()");
  }

  switchLog() {
    this.logActive = !this.logActive;
    this.consoleStatus("switchLog()");
  }

  setItem(itemIndex) {
    this.itemIndex = itemIndex; 
    this.item = this.items[itemIndex];
    this.consoleStatus("setItem()");
  }

  switchItem(step) {
    step = undefined ? 1 : step;
    var itemIndex = this.itemIndex;
    if (step>0) {
      if (this.itemIndex===this.items.length-1) {
        itemIndex = 0
      }
      else {
        itemIndex++
      }
    }
    else {
      if (this.itemIndex===0) {
        itemIndex = this.items.length-1
      }
      else {
        itemIndex--
      }
    }
    if (itemIndex!==false) {
      this.setItem(itemIndex);
    }
  }

  consoleStatus(t) {
    if (this.logActive) {
      console.log(t+" | x:"+this.cursorX+" | y:"+this.cursorY+" | i:"+this.itemIndex+" | a:"+this.active);
    }
  }

  getLevelNumber() {
    return parseInt(document.querySelector("#game-content span").innerText);
  }

  getLevelIndex() {
    return this.getLevelNumber()-1;
  }

  setLevelGrid(levelIndex, x, y, itemIndex) {
    var itemCh = this.items[itemIndex].ch;
    var itemName = this.items[itemIndex].name;
    LEVELS[levelIndex][y] = LEVELS[levelIndex][y].replaceAt(x, itemCh);
    if (itemCh!==" ") {
      this.addClass(this.celula(x,y), itemName);
    }
    else {
      this.celula(x,y).className = (x===this.cursorX && y===this.cursorY) ? "cursor" : "";
    } 

  }

  insertItem() {
    this.setLevelGrid(this.getLevelIndex(),this.cursorX, this.cursorY, this.itemIndex);
    //runGame(LEVELS, DOMDisplay);
    //playerDeath();
    this.consoleStatus("insertItem()");
  }

  cleanItem() {
    this.setLevelGrid(this.getLevelIndex(), this.cursorX, this.cursorY, 0);
    this.consoleStatus("cleanItem()");
  }

  up() {
    this.hideCursor();
    this.cursorY--;
    this.showCursor(); 
    this.consoleStatus("up()");
  }

  down() {
    this.hideCursor();
    this.cursorY++;
    this.showCursor(); 
    this.consoleStatus("down()");
  }

  left() {
    this.hideCursor();
    this.cursorX--;
    this.showCursor(); 
    this.consoleStatus("left()");
  }

  right() {
    this.hideCursor();
    this.cursorX++;
    this.showCursor(); 
    this.consoleStatus("right()");
  }

  hideCursor() {
    this.removeClass(this.celulaCursor(),"cursor"); 
  }

  showCursor() {
    this.addClass(this.celulaCursor(),"cursor"); 
  }

  addClass(elemento, className) {
    if (elemento.className.split(" ").indexOf(className)===-1) {
      elemento.className += " "+className
    }
  }

  removeClass(elemento, className) {
    var classSplit = elemento.className.split(" ");
    var index = classSplit.indexOf(className);
    if (index>-1) {
      classSplit.splice(index,1);
      elemento.className = classSplit.join(" ");
    }
  } 

  background() {
    return document.querySelector("#game-content table.background");
  }

  celula(x, y) {
    return this.background().rows[y].cells[x];
  }

  celulaCursor() {
    return this.celula(this.cursorX, this.cursorY);
  }

  insertItemAndUp() {
    this.insertItem();
    this.up();
  }

  insertItemAndDown() {
    this.insertItem();
    this.down();
  }

  insertItemAndLeft() {
    this.insertItem();
    this.left();
  }

  insertItemAndRight() {
    this.insertItem();
    this.right();
  }

  cleanItemAndUp() {
    this.cleanItem();
    this.up();
  }

  cleanItemAndDown() {
    this.insertItem();
    this.down();
  }

  cleanItemAndLeft() {
    this.cleanItem();
    this.left();
  }

  cleanItemAndRight() {
    this.cleanItem();
    this.right();
  }

  restartGame() {
    runGame(LEVELS, DOMDisplay)
  }

  getGameByIndex(index) {
    return games[index]
  }

  getGameById(id) {
    for (var game of games) {
      if (game.id===id) {
        return game;
      }
    }
    return false;
  }

  init(gameId) {

    var game = this.getGameById(gameId);
    loadLevels(game);
  
    setTimeout(function(){
      LEVELS = LEVELS2;
      startNewGame()
    }, 750);
  }
}
editor = new Editor;

document.addEventListener("keydown", function (e) {
  if (e.keyCode>=48 && e.keyCode<=57 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    var gameId = e.keyCode-48;  
    if (e.keyCode===48) {
      gameId = 0;
    }
    editor.init(gameId);
  }

  // SHITF+ENTER = alterna editor
  if (e.keyCode===13 && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.switch();
  }

  if (!editor.active && e.keyCode!==16 && e.keyCode!==17 && e.altKey!==18) {
    console.log("keyCode:"+e.keyCode+" | shift:"+e.shiftKey+" | ctrl:"+e.ctrlKey+" | alt:"+e.altKey);
  }

  if (!editor.active) {
    return false;
  }

  // ALT+INSERT | ALT+SPACE = próximo item
  if (
    (e.keyCode===45 && !e.shiftKey && !e.ctrlKey && e.altKey) 
    ||
    (e.keyCode===32 && !e.shiftKey && !e.ctrlKey && e.altKey)
  ) {
    editor.switchItem(+1);
  }

  // ALT+DEL = item anterior
  if (e.keyCode===46 && !e.shiftKey && !e.ctrlKey && e.altKey) {
    editor.switchItem(-1);
  }

  // CTRL+SPACE = reinicia jogo
  if (e.keyCode===32 && !e.shiftKey && e.ctrlKey && !e.altKey) {
    editor.restartGame();
  }


  // SHIFT | INSERT | CTRL+SPACE = insere item
  if ( 
    (e.keyCode===16 && e.shiftKey && !e.ctrlKey && !e.altKey) 
    ||
    (e.keyCode===45 && !e.shiftKey && !e.ctrlKey && !e.altKey) 
    ||
    (e.keyCode===32 && !e.shiftKey && e.ctrlKey && !e.altKey)
  ) {
    editor.insertItem();
  }

  // DELETE || CTRL+ALT+SPACE = apaga item
  if ( 
    (e.keyCode===46 && !e.shiftKey && !e.ctrlKey && !e.altKey) 
    ||
    (e.keyCode===32 && !e.shiftKey && e.ctrlKey && e.altKey) 
  ) {
    editor.cleanItem();
  }

  // W = move cursor para cima
  if (e.keyCode===87 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.up();
  }
  // S = move cursor para baixo
  if (e.keyCode===83 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.down();
  }
  // A = move cursor para esquerda
  if (e.keyCode===65 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.left();
  }
  // D = move cursor para direita
  if (e.keyCode===68 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.right();
  }

  // SHIFT+W = insere item e move cursor para cima
  if (e.keyCode===87 && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.insertItemAndUp();
  }
  // SHIFT+S = insere item e move cursor para baixo
  if (e.keyCode===83 && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.insertItemAndDown();
  }
  // SHIFT+A = insere item e move cursor para esquerda
  if (e.keyCode===65 && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.insertItemAndLeft();
  }
  // SHIFT+D = insere item e move cursor para direita
  if (e.keyCode===68 && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.insertItemAndRight();
  }

  /*
  // CTRL+ALT+W = limpa item e move cursor para cima
  if (e.keyCode===87 && !e.shiftKey && e.ctrlKey && e.altKey) {
    editor.cleanItemAndUp();
  }
  // CTRL+ALT+S = limpa item e move cursor para baixo
  if (e.keyCode===83 && !e.shiftKey && e.ctrlKey && e.altKey) {
    editor.cleanItemAndDown();
  }
  // CTRL+ALT+A = limpa item e move cursor para esquerda
  if (e.keyCode===65 && !e.shiftKey && e.ctrlKey && e.altKey) {
    editor.cleanItemAndLeft();
  }
  // CTRL+ALT+D = limpa item e move cursor para direita
  if (e.keyCode===68 && !e.shiftKey && e.ctrlKey && e.altKey) {
    editor.cleanItemAndRight();
  }
  */
});

function imgToLEVEL(src) {
  var LEVEL = [];
  var img = new Image();
  img.src = src;
  context.drawImage(img, 0, 0);
  console.log(context.getImageData(0, 0, canvas.height, canvas.width));
  return LEVEL;
}

function levelTextToArray(levelText) {
  var linhas = levelText.split("\n");
  var i = 0;
  for (linha of linhas) {
    if (linha.substr(0,1).charCodeAt()===34) {
      linha = linha.substr(1);
    }
    if (linha.substr(-1,1).charCodeAt()===13) {
      linha = linha.substr(0,linha.length-1)
    }
    if (linha.substr(-1,1).charCodeAt()===34) {
      linha = linha.substr(0,linha.length-1)
    }
    linhas[i] = linha;
    i++; 
  }
  return linhas;
}

function getLevelIndex(path) {
  var r = false;
  try {
   r =parseInt(path.substr(-3,3))-1;
  }
  catch(err) {
  }
  return r;
}

function loadGames(path) {
  var client = new XMLHttpRequest();
  client.open('GET', path);
  client.onreadystatechange = function(event) {
    if (event.target.readyState===4) {
      editor.setGames(client.responseText); 
    }
  }
  client.send();
}

function loadLevel(path) {
  var levelIndex = getLevelIndex(path);
  if (levelIndex===false) {
    return false;
  }
  var client = new XMLHttpRequest();
  client.open('GET', path);
  //client.open('GET', '/foo.txt');
  client.onreadystatechange = function(event) {
    //alert(client.responseText);
    if (event.target.readyState===4) {
      //LEVELS2.push(levelTextToArray(client.responseText));
      LEVELS2[levelIndex] = levelTextToArray(client.responseText);
      if (path===LAST_LEVEL_PATH) {
        LEVELS_OK = true;
      }
    }
  }
  client.send();
}

function loadLevelsList(path, length) {
  var files = [];
  for (var f=1; f<=length; f++) {
    files.push(path+strZero(f,3));
  }
  return files;
}

function strZero(num, size) {
  var s = "000" + num;
  return s.substr(s.length-size);
}

function loadLevels(dados) {
  LEVELS2 = [];
  if (!dados) {
    return false;
  }
  var levelsList = loadLevelsList(dados.path, dados.length);
  if (levelsList.length>0) {
    LAST_LEVEL_PATH = levelsList[levelsList.length-1];
    for (levelPath of levelsList) {
      loadLevel(levelPath);
    }
  }
}

function loadAll() {
  loadGames();
  loadLevels();
}