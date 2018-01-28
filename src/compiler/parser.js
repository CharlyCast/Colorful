import Type from './types';
import SyntaxNode from './syntaxNode';

export default function parse(tokens){
    let abstractSyntaxTrees=[];
    let cursor={pos:0};
    let node;

    while (cursor.pos<tokens.length){
        node = buildNode(cursor,tokens);
        if (node !== null){
            abstractSyntaxTrees.push(node);
        }
        else{
            console.log("Error while parsing");
        }
        cursor.pos++;
    }

    return abstractSyntaxTrees;
}

function buildNode(cursor,tokens){
    let token=tokens[cursor.pos];
    switch (token.type){
        case Type.number:
            let value=token.value;
            let color=token.color;
            while (tokens[cursor.pos+1].type===Type.number && tokens[cursor.pos+1].color===color){
                cursor.pos++;
                value*=10;
                value+=tokens[cursor.pos].value;
            }
            if (color==="#ffffff"){
                return new SyntaxNode(Type.number,value);
            }
            else {
                return new SyntaxNode(Type.affectation,color,[new SyntaxNode(Type.number,value)]);
            }
            break;
    }
    return null;
}
