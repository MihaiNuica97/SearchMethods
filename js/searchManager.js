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
        this.gridSize = parseInt($('#gridSizeInput').val());
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
        this.startState = new State( cloneArray(this.startState),this.gridSize,{...this.agentCoords});
        this.currentState = new State(this.currentGrid,this.gridSize,this.agentCoords);
        console.log("Saved Start State:");
        console.log(this.startState.stateGrid);

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
        let fringe = [rootNode];
        let directions = ["up","down","left","right"];
        shuffle(directions);

        function expand(fringe){
            let node = fringe.pop();
            
            if(node.action!=null){
            }
            
            console.log(node)
            let addToFringe = [];
            let auxNode;
            let auxState;
            for(let i in directions){
                if(node.state.canMove(directions[i])){
                    auxState = new State(cloneArray(node.state.stateGrid),node.state.gridSize,{...node.state.agentCoords});
                    auxState.move(directions[i]);
                    auxNode = new GraphNode(auxState,node,directions[i],null,(node.depth + 1));
                    addToFringe.push(auxNode);
                }
            }

            shuffle(addToFringe);
            for(let i in addToFringe){
                fringe.push(addToFringe[i]);
            }
            console.log(fringe);
        }

        while(fringe.length!=0){
            if(this.equalGrids(fringe[fringe.length-1].state.stateGrid,this.goalState.stateGrid)){
                console.log(fringe[fringe.length-1]);
                return true;
            }
            expand(fringe);
        }
        return false;
        // movementManager.moveLeft().then(()=>{
        //     console.log(context.currentGrid);
        // });

    }
    
}