function nextCharacter(c) { 
  return String.fromCharCode(c.charCodeAt(0) + 1); 
} 
function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
      arr[i] = [];
  }

  return arr;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let graphicsManager = new GraphicsManager();
graphicsManager.generateGrid();
graphicsManager.generateBlocks();

let searchManager =  new SearchManager();
searchManager.saveStartState();
searchManager.saveGoalState();

let grid = [[0,"A",0],
            [0,"B",0],
            [0,0,0]];
searchManager.goalStateFromGrid(grid);


let movementManager = new MovementManager(graphicsManager,searchManager);
searchManager.movementManager = movementManager;

// event handler for graphics checkbox
$('#enableGraphicsCheck').change(function(){
  movementManager.graphicsEnabled = this.checked;
  console.log(movementManager.graphicsEnabled);
});

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if($('#enableGraphicsCheck').attr("checked")){
    if (e.keyCode == '38') {
        // up arrow
      movementManager.moveUp();
    }
    else if (e.keyCode == '40') {
        // down arrow
        movementManager.moveDown();
    }
    else if (e.keyCode == '37') {
       // left arrow
       movementManager.moveLeft();
    }
    else if (e.keyCode == '39') {
       // right arrow
       movementManager.moveRight();
    }
  }
}


console.log(graphicsManager);
console.log(searchManager);


// async function tryin(){
//   let i=3;
//   while(i>1){
//     await sleep(500);
//     movementManager.moveLeft();
//     i--;
//   }
// }
// tryin();