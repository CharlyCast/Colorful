

export default class SyntaxNode{

    constructor(type,value=null,children=[]){
        this.type=type;
        this.value=value;
        this.children=children;
    }
}
