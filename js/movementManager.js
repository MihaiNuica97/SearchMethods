class MovementManager{
    constructor(graphicsManager, searchManager){
        this.graphicsManager = graphicsManager;
        this.searchManager = searchManager;
        this.graphicsEnabled = true;
    }
    moveUp(){
        if(this.graphicsEnabled){
            this.graphicsManager.moveUp();
        }
        this.searchManager.currentState.moveUp();
    }
    moveDown(){
        if(this.graphicsEnabled){
            this.graphicsManager.moveDown();
        }
        this.searchManager.currentState.moveDown();
    }
    moveRight(){
        if(this.graphicsEnabled){
            this.graphicsManager.moveRight();
        }
        this.searchManager.currentState.moveRight();
    }
    moveLeft(){
        if(this.graphicsEnabled){
            this.graphicsManager.moveLeft();
        }
        this.searchManager.currentState.moveLeft();
    }



}