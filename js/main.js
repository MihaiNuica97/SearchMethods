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

console.log(graphicsManager);

console.log(node);
console.log(node.state);
