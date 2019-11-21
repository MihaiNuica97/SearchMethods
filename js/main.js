console.log("Hello World");
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


let node = new GraphNode('001*',null,"up",null,null)

let graphicsManager = new GraphicsManager();
graphicsManager.generateGrid();
graphicsManager.generateBlocks();

let searchManager =  new SearchManager();
searchManager.saveStartState();
searchManager.saveGoalState();

let movementManager = new MovementManager(graphicsManager,searchManager);

// event handler for graphics checkbox
$('#enableGraphicsCheck').change(function(){
  movementManager.graphicsEnabled = this.checked;
  console.log(movementManager.graphicsEnabled);
});



console.log(graphicsManager);
console.log(searchManager);
console.log(node);
console.log(node.state);
