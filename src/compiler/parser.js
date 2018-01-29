import Type from './types';
import Value from './value';
import SyntaxNode from './syntaxNode';

export default function parse(tokens) {
    let abstractSyntaxTrees = [];
    let cursor = {pos: 0};
    let tree;

    while (cursor.pos < tokens.length) {
        tree = buildTree(cursor, tokens);
        if (tree !== null) {
            abstractSyntaxTrees.push(tree);
        }
        else {
            console.log("Error while parsing");
        }
        cursor.pos++;
    }

    return abstractSyntaxTrees;
}

function buildNode(cursor, tokens) {
    let token = tokens[cursor.pos];
    switch (token.type) {

        case Type.number:
            let value = token.value;
            let color = token.color;
            while (tokens[cursor.pos + 1].type === Type.number && tokens[cursor.pos + 1].color === color) {
                cursor.pos++;
                value *= 10;
                value += tokens[cursor.pos].value;
            }
            if (color === "#ffffff") {
                return new SyntaxNode(Type.number, value);
            }
            else {
                return new SyntaxNode(Type.affectation, color, [new SyntaxNode(Type.number, value)]);
            }
            break;

        case Type.id:
            return new SyntaxNode(Type.id, token.color);
            break;

        case Type.operator:
            return new SyntaxNode(Type.operator,token.value);

        case Type.endLine:
            return new SyntaxNode(Type.endLine);
            break;
    }
    return null;
}

function buildTree(cursor, tokens) {
    let node = buildNode(cursor, tokens);
    cursor.pos++;

    if (node.type===Type.number){
        return(buildExpression(cursor,tokens,node));
    }

    return node;

}

function buildExpression(cursor, tokens, node) {
    //Recursive function that build the tree of the current expression.
    //Takes a node which value is a number (or a variable) ans the cursor right after it.

    // console.log("Expression node : ", node);

    let operatorNode = buildNode(cursor, tokens);

    if (operatorNode===null){
        //Error, should be an operator
        return null;
    }
    operatorNode.children.push(node);

    // console.log("Next node : ", operatorNode);

    if (operatorNode.type === Type.operator) {
        cursor.pos++;
        let nextNode=buildNode(cursor,tokens);
        cursor.pos++;

        //Low priority operator
        if (operatorNode.value===Value.add || operatorNode.value===Value.sub){
            operatorNode.children.push(buildExpression(cursor,tokens,nextNode));
            return operatorNode;
        }
        //High priority operator
        else {
            operatorNode.children.push(nextNode);
            return buildExpression(cursor,tokens,operatorNode);
        }
    }
    else if (operatorNode.type === Type.endLine) {
        return node;
    }
    else { //Error, operator or endLine expected
        return null;
    }
}


