function Tile(position, value) {
  this.x                = position.x;
  this.y                = position.y;
  this.value            = value || 2;
  //valueがint型、positionはこれもまた別のオブジェクトの類
  //console.log(position);
  for(var i = 0 ; i <  4; i++){
		for(var j = 0 ; j < 4; j++){
			document.getElementById("number" + i + "," + j).value = 0 ;
			//console.log("変えに来ました")
		}
  }  
  this.previousPosition = null;
  this.mergedFrom       = null; // Tracks tiles that merged together
}

Tile.prototype.savePosition = function () {
  this.previousPosition = { x: this.x, y: this.y };
};

Tile.prototype.updatePosition = function (position) {
  this.x = position.x;
  this.y = position.y;
};

Tile.prototype.serialize = function () {
  return {
    position: {
      x: this.x,
      y: this.y
    },
    value: this.value
  };
};
