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
                
                return true;
            }
            return false;
        }
        moveDown(){
            if(this.agentCoords.x +1 < this.gridSize){
                let aux = this.stateGrid[this.agentCoords.x + 1][this.agentCoords.y];
                this.stateGrid[this.agentCoords.x + 1][this.agentCoords.y] = 
                this.stateGrid[this.agentCoords.x][this.agentCoords.y];
                this.stateGrid[this.agentCoords.x][this.agentCoords.y] = aux;
        
                this.agentCoords.x = this.agentCoords.x + 1;
                return true;
            }
            return false;
        }
        moveLeft(){
            if(this.agentCoords.y > 0){
                let aux = this.stateGrid[this.agentCoords.x][this.agentCoords.y - 1];
                this.stateGrid[this.agentCoords.x][this.agentCoords.y - 1] = 
                this.stateGrid[this.agentCoords.x][this.agentCoords.y];
                this.stateGrid[this.agentCoords.x][this.agentCoords.y] = aux;
        
                this.agentCoords.y = this.agentCoords.y - 1;
                return true;
            }
            return false;
        }
        moveRight(){
            if(this.agentCoords.y+1 < this.gridSize){
                let aux = this.stateGrid[this.agentCoords.x][this.agentCoords.y + 1];
                this.stateGrid[this.agentCoords.x][this.agentCoords.y + 1] = 
                this.stateGrid[this.agentCoords.x][this.agentCoords.y];
                this.stateGrid[this.agentCoords.x][this.agentCoords.y] = aux;
        
                this.agentCoords.y = this.agentCoords.y + 1;
                return true;
            }
            return false;
        }
        canMove(direction){
            switch(direction){
                case "up":
                    return (this.agentCoords.x > 0);

                case "down":
                    return (this.agentCoords.x +1 < this.gridSize);
            
                case "left":
                    return (this.agentCoords.y > 0);

                case "right":
                    return (this.agentCoords.y+1 < this.gridSize);
            }
        }

        move(direction){
            switch(direction){
                case "up":
                    this.moveUp();
                    break;

                case "down":
                    this.moveDown();
                    break;
            
                case "left":
                    this.moveLeft();
                    break;

                case "right":
                    this.moveRight();
                    break;
            }
        }
}