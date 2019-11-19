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
                sumblocks++;
                console.log(block);
            }
        }
    }
}