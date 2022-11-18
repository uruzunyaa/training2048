/*tesutohennsuu=[];
for(var i = 0 ; i <= 3; i++){
	tesutohennsuu[i] = [];
}*/
function changetile(){
	changeon = true;
	
	for(var x = 0 ; x <= 3; x++){
		for(var y = 0 ; y <= 3; y++){
			changenumber[x][y] = Number(document.getElementById("number" + y + "," + x).value)
		}
	}	
	
	console.log(changenumber)
	
	
	
	/*for(var x = 0 ; x <= 3; x++){
		for(var y = 0 ; y <= 3; y++){
			
			if(changenumber[x][y]==0){
				
				tesutohennsuu[x][y]=null;
			}else{
				tesutohennsuu[x][y]={"position":{"x":x,"y":y},"value":changenumber[x][y]};
			}
		}
		console.log(tesutohennsuu[x]);
	}*/
	
	
	
	//var tyekku = {"grid":{"size":4,"cells":[[{"position":{"x":0,"y":0},"value":4},{"position":{"x":0,"y":1},"value":2},{"position":{"x":0,"y":2},"value":16},{"position":{"x":0,"y":3},"value":2}],[{"position":{"x":1,"y":0},"value":1024},{"position":{"x":1,"y":1},"value":4},{"position":{"x":1,"y":2},"value":8},{"position":{"x":1,"y":3},"value":32}],[{"position":{"x":2,"y":0},"value":2},{"position":{"x":2,"y":1},"value":2},{"position":{"x":2,"y":2},"value":2},{"position":{"x":2,"y":3},"value":16}],[null,null,{"position":{"x":3,"y":2},"value":4096},{"position":{"x":3,"y":3},"value":2}]]},"score":232,"over":false,"won":false,"keepPlaying":false};
	
	//console.log(tile);
	//console.log(tyuukei);
	//console.log(tyekku.grid.cells);
	
	//var toString = Object.prototype.toString;
	//console.log(toString.call(tyuukei))
	
	//GameManagerのthis.storageManager.storage.gameStateにぶち込む
}