class MovementManager{
    constructor(graphicsManager, searchManager){
        this.graphicsManager = graphicsManager;
        this.searchManager = searchManager;
        this.graphicsEnabled = true;
        this.delayTime = 200;
    }

    async moveUp(){
        if(this.graphicsEnabled){
            // await sleep(this.delayTime);
            this.graphicsManager.moveUp();
        }
        this.searchManager.currentState.moveUp();
    }

    async moveDown(){
        if(this.graphicsEnabled){
            // await sleep(this.delayTime);
            this.graphicsManager.moveDown();
        }
        this.searchManager.currentState.moveDown();
    }

    async moveRight(){
        
        if(this.graphicsEnabled){
            // await sleep(this.delayTime);
            this.graphicsManager.moveRight();
        }
        this.searchManager.currentState.moveRight();
    }
    
    async moveLeft(){
        if(this.graphicsEnabled){
            // await sleep(this.delayTime);
            this.graphicsManager.moveLeft();
        }
        this.searchManager.currentState.moveLeft();
    }

    move(direction){
            setTimeout(()=>{        
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
        },this.delayTime);
    }
    moveBack(direction){
        setTimeout(()=>{        
            switch(direction){
            case "down":
                this.moveUp();
                break;

            case "up":
                this.moveDown();
                break;
        
            case "right":
                this.moveLeft();
                break;

            case "left":
                this.moveRight();
                break;
        }
    },this.delayTime);
    }


}