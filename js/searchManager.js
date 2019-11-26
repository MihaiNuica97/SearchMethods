class  SearchManager{
    constructor(){
        var gridSize;
        var startState;
        var goalState;
        var currentGrid;
        var currentState;
        var agentCoords;
        var movementManager;
    }


    // INITIALIZATION
    saveStartState(){
        this.gridSize = $('#gridSizeInput').val();
        this.startState = this.generateEmptygrid(this.gridSize);
        let self = this;
        $('.movableBlock').each(function(index){
            let blockTitle = $(this).attr("title");
            let blockX = parseInt($(this).attr("row"))-1;
            let blockY = parseInt($(this).attr("col"))-1;
            
            self.startState[blockX][blockY] = blockTitle;
        });

        this.findAgentBlock(this.startState);
        this.currentGrid = this.startState;
        this.agentCoords = this.findAgentCoords();
        this.startState = new State(this.startState,this.gridSize,this.agentCoords);
        this.currentState = new State(this.currentGrid,this.gridSize,this.agentCoords);
    }
    saveGoalState(){
        this.gridSize = $('#gridSizeInput').val();
        this.goalState = this.generateEmptygrid(this.gridSize);
        let self = this;
        $('.movableBlock').each(function(index){
            let blockTitle = $(this).attr("title");
            let blockX = parseInt($(this).attr("row"))-1;
            let blockY = parseInt($(this).attr("col"))-1;
            
            self.goalState[blockX][blockY] = blockTitle;

        });
        this.findAgentBlock(this.goalState);
        this.goalState = new State(this.goalState,this.gridSize,this.agentCoords);

    }
    findAgentBlock(grid){
        let agentBlock = $('#agentBlock');
        let agentX =  parseInt(agentBlock.attr("row"))-1;
        let agentY = parseInt(agentBlock.attr("col"))-1;

        grid[agentX][agentY] = "*";

    }
    findAgentCoords(){
        let agentX;
        let agentY;
        for(let i in this.currentGrid)
        {
            for(let j in this.currentGrid[i])
            {
                if(this.currentGrid[i][j] == "*"){
                    agentX = i;
                    agentY = j;  
                }
            }
        }
        let agentCoords = {
            x: parseInt(agentX),
            y: parseInt(agentY)
        }
        return agentCoords;
    }
    generateEmptygrid(gridSize){
        let grid = Create2DArray(gridSize);
        for(let i=0;i<gridSize;i++){
            for(let j=0;j<gridSize;j++){
                grid[i][j] = 0;
            }
        }
        return grid;
    }
    goalStateFromGrid(grid){
        let newGrid = grid.map(function(arr)
        {
            return arr.slice();
        });
        this.goalState = new State(newGrid,newGrid[0].length,null);
        console.log(this.goalState);
    }

    equalGrids(grid1, grid2){
        for(let i=0; i<grid1.length;i++){
            for(let j=0;j<grid1.length;j++){
                if(grid1[i][j] != 0 && grid1[i][j] != "*"){
                    if(grid1[i][j] != grid2[i][j]){
                        return false;
                    }
                }
            }
        }
        return true;
    }
    
    chooseSearchStrategy(){
        let strat = $('#searchDropdown').val();

        switch(strat){
            case "DFS":
                console.log("DFS");
                this.DFS();
                break;
        }
    }

    DFS(){
        let context = this;
        let rootNode = new GraphNode(this.startState,null,null,null,0);
        movementManager.moveLeft().then(()=>{
            console.log(context.currentGrid);
        });
    }
    
}