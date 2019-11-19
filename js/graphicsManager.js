class GraphicsManager{
    constructor(){
        this.grid = $('#gridOuterDiv');
        
    }
    generateGrid(){
        // take input for grid size (default:2)
        this.gridSize = $('#gridSizeInput').val();

        // create a grid with the specified dimensions
        let gridStyle = {
            "display": "grid",
            "grid-template-columns": "repeat("+this.gridSize+", auto)",
            "grid-template-rows": "repeat("+this.gridSize+", auto)"
        }
        this.grid.css(gridStyle);
        
        // clean up grid
        this.grid.empty();
        let sumblocks = 0
        // populate grid with blocks
        for(let i=0;i<this.gridSize;i++){
            for(let j=0;j<this.gridSize;j++){
                let block = jQuery('<div/>', {
                    id: 'gridBlock'+ sumblocks,
                    "class": 'gridBlock emptyBlock'
                }).appendTo(this.grid);

                block.css("grid-area", (i+1) + " / " + (j+1) + " span 1 / span 1");
                block.attr("row", i+1);
                block.attr("col", j+1);
                console.log(block.css("grid-area"));

                sumblocks++;
            }
        }
        $('#gridBlock'+ (sumblocks - 1)).attr("id", "agentBlock");
        this.agentBlock = $('#agentBlock');
    }


    // blocks movement

    swapBlocks(block1, block2){
        let block1Row = block1.attr("row");
        let block1Col = block1.attr("col");

        let block2Row = block2.attr("row");
        let block2Col = block2.attr("col");

        block1.css({
            "grid-row": block2Row,
            "grid-column": block2Col
        });
        
        block2.css({
            "grid-row": block1Row,
            "grid-column": block1Col
        });

        block1.attr("row", block2Row);
        block1.attr("col", block2Col);

        block2.attr("row", block1Row);
        block2.attr("col", block1Col);
    }
    moveLeft(){
        let subjectRow = parseInt(this.agentBlock.attr("row"));
        let subjectCol = parseInt(this.agentBlock.attr("col")) - 1;
        this.swapBlocks(this.agentBlock, $('[row = '+ (subjectRow) + '][col = ' + (subjectCol) + ']'));
    }
    moveRight(){
        let subjectRow = parseInt(this.agentBlock.attr("row"));
        let subjectCol = parseInt(this.agentBlock.attr("col")) + 1;
        this.swapBlocks(this.agentBlock, $('[row = '+ (subjectRow) + '][col = ' + (subjectCol) + ']'));
    }
    moveUp(){
        let subjectRow = parseInt(this.agentBlock.attr("row")) - 1;
        let subjectCol = parseInt(this.agentBlock.attr("col"));
        this.swapBlocks(this.agentBlock, $('[row = '+ (subjectRow) + '][col = ' + (subjectCol) + ']'));
       

    }
    moveDown(){
        let subjectRow = parseInt(this.agentBlock.attr("row")) + 1;
        let subjectCol = parseInt(this.agentBlock.attr("col"));
        this.swapBlocks(this.agentBlock, $('[row = '+ (subjectRow) + '][col = ' + (subjectCol) + ']'));
 
    }


    
}