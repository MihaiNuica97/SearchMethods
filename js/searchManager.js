class  SerchManager{
    constructor(){

    }
    saveStartState(){
        this.gridSize = $('#gridSizeInput').val();
        this.startState = this.generateEmptygrid(this.gridSize);
        let self = this;
        $('.blockOption').each(function(index){
            let blockTitle = $(this).find(".blockTitle").attr("title");
            let blockX = $(this).find(".blockCoordX").val()-1;
            let blockY = $(this).find(".blockCoordY").val()-1;
            
            self.startState[blockX][blockY] = blockTitle;
        });
        this.findAgentBlock(this.startState);
        console.log(this.startState);
    }
    saveGoalState(){
        this.gridSize = $('#gridSizeInput').val();
        this.goalState = this.generateEmptygrid(this.gridSize);
        let self = this;
        $('.blockOption').each(function(index){
            let blockTitle = $(this).find(".blockTitle").attr("title");
            let blockX = $(this).find(".blockCoordX").val()-1;
            let blockY = $(this).find(".blockCoordY").val()-1;
            
            self.goalState[blockX][blockY] = blockTitle;

        });
        this.findAgentBlock(this.goalState);
        console.log(this.goalState);
    }
    findAgentBlock(grid){
        let agentBlock = $('#agentBlock');
        let agentX =  parseInt(agentBlock.attr("row"))-1;
        let agentY = parseInt(agentBlock.attr("col"))-1;

        grid[agentX][agentY] = "*";

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