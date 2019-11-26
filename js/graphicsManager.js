class GraphicsManager{
    constructor(){
        this.grid = $('#gridOuterDiv');
        this.initialBlocksGenerate = true;
        this.initialGridGenerate = true;
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

                sumblocks++;
            }
        }
        $('#gridBlock'+ (sumblocks - 1)).attr("id", "agentBlock");
        this.agentBlock = $('#agentBlock');

        // number of movable blocks
        this.movableBlocks = $('#blocksNoInput').val();

        if(this.initialGridGenerate){
            let gridInput = $('#gridSizeInput');
            let context = this;
            gridInput.change(function(){
                context.generateGrid();
            });
            this.initialGridGenerate = false;
        }
    }

    editBlocks(){
        // change number
        this.movableBlocks = $('#blocksNoInput').val();
        
        
        // repopulate options with number of movable blocks


        let blockOptionsDiv = $('#gridBlocksOptionDiv');
        blockOptionsDiv.empty();

        let currentLetter = "A";
        
        for(let i=0; i<this.movableBlocks;i++){
            let htmlString = '<div class="blockOption"><span class="blockTitle" title='+currentLetter+'>'+currentLetter+': </span><span>X:</span><input class="blockCoordX" type="number" value = "1" min="1" max="6"><span>Y:</span><input class="blockCoordY" type="number" value = "1" min="1" max="6"></div>';
            currentLetter = nextCharacter(currentLetter);
            let option = $.parseHTML(htmlString)
            blockOptionsDiv.append(option);
        }
        this.generateBlocks();
    }

    generateBlocks(){
        $('.gridBlock').each(function(index){
            $(this).empty();
            $(this).removeClass("movableBlock");
        });
        $('.blockOption').each(function(index){
            let blockTitle = $(this).find(".blockTitle").attr("title");
            let blockX = $(this).find(".blockCoordX").val();
            let blockY = $(this).find(".blockCoordY").val();

            let block = $('[row = '+ (blockX) + '][col = ' + (blockY) + ']:not(#agentBlock):not(.movableBlock)');

            block.attr("title",blockTitle);
            block.addClass("movableBlock");
            block.append("<div>"+blockTitle+"</div>");
        });
        // regenerate movable blocks on input box change if first time
        if(this.initialBlocksGenerate){
            let blockOptionsDiv = $('#gridBlocksOptionDiv');
            let context = this;
            blockOptionsDiv.change(function(){
                context.generateBlocks();
            });
            $('#blocksNoInput').change(function(){
                context.editBlocks();
            });
            this.initialBlocksGenerate = false;
        }
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