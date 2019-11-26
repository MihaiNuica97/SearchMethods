class MovementManager{
    constructor(graphicsManager, searchManager){
        this.graphicsManager = graphicsManager;
        this.searchManager = searchManager;
        this.graphicsEnabled = true;
        this.delayTime = 500;
    }

    async moveUp(){
        if(this.graphicsEnabled){
            await sleep(this.delayTime);
            this.graphicsManager.moveUp();
        }
        this.searchManager.currentState.moveUp();
    }

    async moveDown(){
        if(this.graphicsEnabled){
            await sleep(this.delayTime);
            this.graphicsManager.moveDown();
        }
        this.searchManager.currentState.moveDown();
    }

    async moveRight(){
        
        if(this.graphicsEnabled){
            await sleep(this.delayTime);
            this.graphicsManager.moveRight();
        }
        this.searchManager.currentState.moveRight();
    }
    
    async moveLeft(){
        if(this.graphicsEnabled){
            await sleep(this.delayTime);
            this.graphicsManager.moveLeft();
        }
        this.searchManager.currentState.moveLeft();
    }



}