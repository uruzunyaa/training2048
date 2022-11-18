function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");//ここから入れてる。14と９０にある
  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  //console.log(this.tileContainer);
  
  this.score = 0;
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;
  //console.log(this)
  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);
	
	//console.log("kitaaaaaa");
	
	//ここから数字沸かせ
	if(changeon == true){

		
	}
	//ここから数字入れ
	//いちばん上はnullを代入できなかった。grid.cellsならある程度融通が効いた
	if(changeon == true){
		//console.log(grid.cells[0][0]);
		/*grid.cells.forEach(function (column) {
			//console.log(column);
			column.forEach(function (cell) {
				//console.log(cell.x,cell.y)
				//console.log(changenumber[cell.x][cell.y]);
				if(changenumber[cell.x][cell.y] == 0){
					
					cell = null;
					console.log(cell);
				}else{
					cell.value = changenumber[cell.x][cell.y];
				}
				if(cell){
					//cell.value = changenumber[cell.x][cell.y];
				}else{
					//数字の無いマスに数字を作る所からやる
				}
				
			});
		});*/
		
		/*for(var x = 0 ; x <= 3; x++){
			
			for(var y = 0 ; y <= 3; y++){
				if(grid.cells[x][y]===null){
					//ここで座標が合わなくても良いからタイルを生成出来れば成功しそう。8/5
					//console.log(grid.cells[x][y].x)
					grid.cells[x][y].x=x;
					grid.cells[x][y].y=y;
					//console.log(grid.cells[x][y].x,grid.cells[x][y].y)
					
				}
				
			}
		}*/
		//console.log(grid.cells);
		//console.log(Tile)
		//ここの下がnull状態で実行以外完成版。上で空きを埋めるプログラムを作る
		for(var x = 0 ; x <= 3; x++){
			
			for(var y = 0 ; y <= 3; y++){
				console.log(grid.cells[x][y])
				if(changenumber[x][y]==0){
					//変更先がnull
					grid.cells[x][y]=null;
				}else if(grid.cells[x][y]===null){
					//変更先が数字だが、現在null
					grid.cells[x][y]=new Tile({x,y}, changenumber[x][y]);
					//この結果は現在アンディファインド
					
				}else{
					//変更先が数字で、現在も数字
					grid.cells[x][y].value=changenumber[x][y];
					
				}
			}
		}
		
		changeon = false;
	}
	
    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        //console.log(cell);
		if (cell) {
          self.addTile(cell);
		  //console.log(self);
        }
		
      });
    });

    self.updateScore(metadata.score);
    self.updateBestScore(metadata.bestScore);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
  //console.log(this);
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function () {
  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var self = this;
  //console.log(tile);//まず抽出から行こう。ここから抽出する
  /*if(tile.x == 0 && tile.y == 0){
	for(var i = 0 ; i <  4; i++){
		for(var j = 0 ; j < 4; j++){
			document.getElementById("number" + i + "," + j).value = 0 ;
		}
	}
  }*/ //ここは一手動く毎のリセットの失敗作
  
  //document.getElementById("number" + tile.y + "," + tile.x).value = tile.value;//くっついたのが反映されない
	/*for(var i = 0 ; i <  4; i++){
		for(var j = 0 ; j < 4; j++){
			console.log(i,j);
		}
	}*/
  
  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 2048) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  inner.classList.add("tile-inner");
  inner.textContent = tile.value;

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);
//console.log(inner,wrapper,this.tileContainer)
  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
  //ここで盤面を入力するマスに連動させてる。
  document.getElementById("number" + tile.y + "," + tile.x).value = tile.value;
  /*if(changeon == 1){
	  tile.value = 4096;
	  changeon = 0;
  }*/
  //console.log(tile);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won" : "game-over";
  var message = won ? "You win!" : "Game over!";

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};
