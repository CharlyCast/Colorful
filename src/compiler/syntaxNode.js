

export default class SyntaxNode{

    constructor(type,value=null,children=[],rules=null){
        this.type=type;
        this.value=value;
        this.children=children;
        this.rules=rules;
    }
}
