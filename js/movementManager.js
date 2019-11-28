class MovementManager{
    constructor(graphicsManager, searchManager){
        this.graphicsManager = graphicsManager;
        this.searchManager = searchManager;
        this.graphicsEnabled = true;
        this.delayTime = 500;
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

    tracePath(node){
        let thisNode = {...node};
        let thisPath = [];
        while(thisNode.action != null){
            thisPath.push(thisNode.action);
            thisNode = thisNode.parentNode;
        }
        return thisPath;
    }

    playSolution(finalNode){
        console.log("playing solution...");
        let path = [];
        let myNode = {...finalNode}
        let context = this;
        // backtrack through parent nodes noting down action until reaching root node
        path = this.tracePath(myNode,myNode);

        // reverse action array to get correct order
        path = path.reverse();

        // for each action in array make corresponding move then wait for delay
        this.interval = setInterval(()=>{
            if(path.length == 0){
                clearInterval(this);
            }
            context.move(path.shift());
        },this.delayTime);
        // for each action in array make corresponding move then wait for delay
    }
    
}