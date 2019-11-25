class State{
    constructor(stateGrid, gridSize, agentCoords){
        this.stateGrid = stateGrid;
        this.gridSize = gridSize;
        this.agentCoords = agentCoords;
    }

        // MOVEMENT
        moveUp(){
            if(this.agentCoords.x > 0){
                let aux = this.stateGrid[this.agentCoords.x-1][this.agentCoords.y];
                this.stateGrid[this.agentCoords.x - 1][this.agentCoords.y] = 
                this.stateGrid[this.agentCoords.x][this.agentCoords.y];
                this.stateGrid[this.agentCoords.x][this.agentCoords.y] = aux;
        
                this.agentCoords.x = this.agentCoords.x - 1;
                console.log(this.stateGrid);
            }
        }
        moveDown(){
            if(this.agentCoords.x +1 < this.gridSize){
                let aux = this.stateGrid[this.agentCoords.x + 1][this.agentCoords.y];
                this.stateGrid[this.agentCoords.x + 1][this.agentCoords.y] = 
                this.stateGrid[this.agentCoords.x][this.agentCoords.y];
                this.stateGrid[this.agentCoords.x][this.agentCoords.y] = aux;
        
                this.agentCoords.x = this.agentCoords.x + 1;
                console.log(this.stateGrid);
            }
        }
        moveLeft(){
            if(this.agentCoords.y > 0){
                let aux = this.stateGrid[this.agentCoords.x][this.agentCoords.y - 1];
                this.stateGrid[this.agentCoords.x][this.agentCoords.y - 1] = 
                this.stateGrid[this.agentCoords.x][this.agentCoords.y];
                this.stateGrid[this.agentCoords.x][this.agentCoords.y] = aux;
        
                this.agentCoords.y = this.agentCoords.y - 1;
                console.log(this.stateGrid);
            }
        }
        moveRight(){
            if(this.agentCoords.y+1 < this.gridSize){
                let aux = this.stateGrid[this.agentCoords.x][this.agentCoords.y + 1];
                this.stateGrid[this.agentCoords.x][this.agentCoords.y + 1] = 
                this.stateGrid[this.agentCoords.x][this.agentCoords.y];
                this.stateGrid[this.agentCoords.x][this.agentCoords.y] = aux;
        
                this.agentCoords.y = this.agentCoords.y + 1;
                console.log(this.stateGrid);
            }
        }

        
}