class  SearchManager{
    constructor(){
        var gridSize;
        var startState;
        var goalState;
        var currentState;
        var agentCoords;
    }
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
        this.currentState = this.startState;
        this.agentCoords = this.findAgentCoords();
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
        for(let i in this.currentState)
        {
            for(let j in this.currentState[i])
            {
                if(this.currentState[i][j] == "*"){
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


    moveUp(){
        let aux = this.currentState[this.agentCoords.x-1][this.agentCoords.y];
        this.currentState[this.agentCoords.x - 1][this.agentCoords.y] = 
        this.currentState[this.agentCoords.x][this.agentCoords.y];
        this.currentState[this.agentCoords.x][this.agentCoords.y] = aux;

        this.agentCoords.x = this.agentCoords.x - 1;
        console.log(this.currentState);
    }
    moveDown(){
        let aux = this.currentState[this.agentCoords.x + 1][this.agentCoords.y];
        this.currentState[this.agentCoords.x + 1][this.agentCoords.y] = 
        this.currentState[this.agentCoords.x][this.agentCoords.y];
        this.currentState[this.agentCoords.x][this.agentCoords.y] = aux;

        this.agentCoords.x = this.agentCoords.x + 1;
        console.log(this.currentState);
    }
    moveLeft(){
        let aux = this.currentState[this.agentCoords.x][this.agentCoords.y - 1];
        this.currentState[this.agentCoords.x][this.agentCoords.y - 1] = 
        this.currentState[this.agentCoords.x][this.agentCoords.y];
        this.currentState[this.agentCoords.x][this.agentCoords.y] = aux;

        this.agentCoords.y = this.agentCoords.y - 1;
        console.log(this.currentState);
    }
    moveRight(){
        let aux = this.currentState[this.agentCoords.x][this.agentCoords.y + 1];
        this.currentState[this.agentCoords.x][this.agentCoords.y + 1] = 
        this.currentState[this.agentCoords.x][this.agentCoords.y];
        this.currentState[this.agentCoords.x][this.agentCoords.y] = aux;

        this.agentCoords.y = this.agentCoords.y + 1;
        console.log(this.currentState);
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
}