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
        this.gridSize = parseInt($('#gridSizeInput').val());
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
        console.log("Saved Goal State From Graphics");
        console.log(this.goalState.stateGrid);
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
        let solution;
        clearInterval(movementManager.interval);
        graphicsManager.generateFromMatrix(this.startState.stateGrid);
        switch(strat){
            case "DFS":
                console.log("DFS");
                solution = this.DFS();
                break;
            case "BFS":
                console.log("BFS");
                solution = this.BFS();
                break;
            case "IDS":
                console.log("IDS");
                solution = this.IDS();
                break;
            case "AHS":
                console.log("AHS")
                solution = this.AHS();
                break;
        }
        if(solution){
            movementManager.playSolution(solution);
        }
    }

    // Depth First Search
    DFS(){
        let context = this;
        let rootNode = new GraphNode(this.startState,null,null,null,0);
        let fringe = [rootNode];
        let directions = ["up","down","left","right"];
        shuffle(directions);

        function expand(fringe){
            let node = fringe.pop();
                        
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
                graphicsManager.generateFromMatrix(fringe[fringe.length-1].state.stateGrid);
                return fringe[fringe.length-1];
            }
            expand(fringe);
            
        }
        return false;

    }

    // Breadth First Search
    BFS(){
        let context = this;
        let rootNode = new GraphNode(this.startState,null,null,null,0);
        let fringe = [rootNode];
        let directions = ["up","down","left","right"];

        function expand(fringe){
            let node = fringe.shift();
            

            
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

            for(let i in addToFringe){
                fringe.push(addToFringe[i]);
            }
            console.log(fringe);
        }

        while(fringe.length!=0){
            if(this.equalGrids(fringe[0].state.stateGrid,this.goalState.stateGrid)){
                console.log(fringe[0]);
                graphicsManager.generateFromMatrix(fringe[0].state.stateGrid);
                return fringe[0];
            }
            expand(fringe);
            
        }
        return false;

    }

    // Iterative Deepening Search
    IDS(){
        // DFS up to limit then limit++ and repeat

        let context = this;
        const rootNode = new GraphNode(this.startState,null,null,null,0);
        let fringe = [rootNode];
        let directions = ["up","down","left","right"];
        let limit = 0;
        // shuffle(directions);

        function expand(fringe,limit){
            let node = fringe.pop();

            let addToFringe = [];
            let auxNode;
            let auxState;
            if(node.depth < limit){
                for(let i in directions){
                    if(node.state.canMove(directions[i])){
                        auxState = new State(cloneArray(node.state.stateGrid),node.state.gridSize,{...node.state.agentCoords});
                        auxState.move(directions[i]);
                        auxNode = new GraphNode(auxState,node,directions[i],null,(node.depth + 1));
                        addToFringe.push(auxNode);
                    }
                }
                for(let i in addToFringe){
                    fringe.push(addToFringe[i]);
                }
            }

            // shuffle(addToFringe);
            console.log(limit);
            console.log(fringe);
        }
        function dLSearch(limit){
            fringe = [rootNode];


            while(fringe.length!=0){
                if(context.equalGrids(fringe[fringe.length-1].state.stateGrid,context.goalState.stateGrid)){
                    console.log(fringe[fringe.length-1]);
                    graphicsManager.generateFromMatrix(fringe[fringe.length-1].state.stateGrid);
                    return fringe[fringe.length-1];
                }
                expand(fringe, limit);
            }
            limit ++;
            return dLSearch(limit);
        }
        return dLSearch(limit);
    }

    // A* Heuristic Search
    AHS(){
        let context = this;
        const rootNode = new GraphNode(this.startState,null,null,0,0);
        let fringe = [rootNode];
        let goalCoords = {};
        let directions = ["up","down","left","right"];

        // find coords of all movable blocks in goal state for future reference
        function findGoalBlockCoords(){
            let goalGrid = context.goalState.stateGrid;
            console.log(goalGrid);
            for(let i in goalGrid){
                for(let j in goalGrid[i]){
                    if(goalGrid[i][j] != 0 && goalGrid[i][j] != "*"){
                        goalCoords[goalGrid[i][j]] = {
                            x: 0,
                            y: 0
                        }
                        goalCoords[goalGrid[i][j]].y = parseInt(i);
                        goalCoords[goalGrid[i][j]].x = parseInt(j);
                    }
                }
            }
        }
        findGoalBlockCoords();

        // evaluate path cost of node
        function evaluateCost(node){
        // heuristic: cost = cost so far (depth) + distance for each block to destination
            let thisGrid = node.state.stateGrid;
            let cost = node.depth;
            for(let i in thisGrid){
                for(let j in thisGrid[i]){
                    if(thisGrid[i][j] != 0 && thisGrid[i][j] != "*"){

                        let xDist = Math.abs(parseInt(j) - goalCoords[thisGrid[i][j]].x);
                        let yDist = Math.abs(parseInt(i) - goalCoords[thisGrid[i][j]].y);
                        cost += (xDist + yDist);
                    }
                }
            }
            node.pathCost = cost;
        }
        // successor function. first node in list will always be the least cost node
        function expand(){
            let node = fringe.shift();
                        
            let addToFringe = [];
            let auxNode;
            let auxState;
            for(let i in directions){
                if(node.state.canMove(directions[i])){
                    auxState = new State(cloneArray(node.state.stateGrid),node.state.gridSize,{...node.state.agentCoords});
                    auxState.move(directions[i]);
                    auxNode = new GraphNode(auxState,node,directions[i],null,(node.depth + 1));
                    evaluateCost(auxNode);
                    addToFringe.push(auxNode);
                }
            }

            for(let i in addToFringe){
                fringe.push(addToFringe[i]);
            }
            fringe.sort((a, b) => (a.pathCost > b.pathCost) ? 1 : -1);
            console.log(fringe);
        }

        while(fringe.length > 0){
            if(this.equalGrids(fringe[0].state.stateGrid,this.goalState.stateGrid)){
                console.log(fringe[0]);
                graphicsManager.generateFromMatrix(fringe[0].state.stateGrid);
                return fringe[0];
            }
            expand();
        }
        return false
    }
}