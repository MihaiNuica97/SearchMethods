class GraphNode {
    constructor(state,parentNode,action,pathCost,depth){
        this.state = state;//State object representing n*n size grid
        this.parentNode = parentNode;//parent node in the tree. null if root node
        this.action = action;//action taken to get to the current state. null if root node
        this.pathCost = pathCost;//to be implemented in A*
        this.depth = depth;//depth level of the node aka # of parent nodes
    }
}