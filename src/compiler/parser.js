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
    let color = token.color;
    switch (token.type) {

        case Type.number:
            let value = token.value;
            while (tokens[cursor.pos + 1].type === Type.number && tokens[cursor.pos + 1].color === color) {
                cursor.pos++;
                value *= 10;
                value += tokens[cursor.pos].value;
            }
            if (color === "#ffffff") {
                return new SyntaxNode(Type.number, value);
            }
            else {
                let affectation =new SyntaxNode(Type.affectation, color, [new SyntaxNode(Type.number, value)]);
                return new SyntaxNode(Type.id, color, [affectation]);
            }
            break;

        case Type.boolean:
            if (color === "#ffffff"){
                return new SyntaxNode(Type.boolean, token.value);
            }
            else {
                let affectation = new SyntaxNode(Type.affectation, color, [new SyntaxNode(Type.boolean, token.value)]);
                return new SyntaxNode(Type.id,color, [affectation]);
            }
            break;

        case Type.id:
            return new SyntaxNode(Type.id, token.color);
            break;

        case Type.operator:
            return new SyntaxNode(Type.operator, token.value);
            break;

        case Type.affectation:
            return new SyntaxNode(Type.affectation, token.color);
            break;

        case Type.endLine:
            return new SyntaxNode(Type.endLine);
            break;
    }
    return null;
}

function buildTree(cursor, tokens) {
    //Build an abstract syntax tree that embodies the instruction starting at cursor position.

    let node = buildNode(cursor, tokens);
    cursor.pos++;

    if (node.type === Type.number || node.type === Type.boolean) {
        return (buildExpression(cursor, tokens, node));
    }
    else if (node.type === Type.affectation) {
        let value = buildNode(cursor, tokens);
        cursor.pos++;
        if (value.type !== Type.number && value.type !== Type.id) {
            return null;
        }
        else {
            node.children.push(buildExpression(cursor, tokens, value));
        }
    }

    return node;

}

function buildExpression(cursor, tokens, node) {
    //Recursive function that build the tree of the current expression.
    //Takes a node which value is a number (or a variable) ans the cursor right after it.

    // console.log("Expression node : ", node);

    let operatorNode = buildNode(cursor, tokens);

    if (operatorNode === null) {
        //Error, should be an operator
        return null;
    }
    operatorNode.children.push(node);

    // console.log("Next node : ", operatorNode);

    if (operatorNode.type === Type.operator) {
        cursor.pos++;
        let nextNode = buildNode(cursor, tokens);
        cursor.pos++;

        //Low priority operator
        if (operatorNode.value === Value.add || operatorNode.value === Value.sub || operatorNode.value === Value.or) {
            operatorNode.children.push(buildExpression(cursor, tokens, nextNode));
            return operatorNode;
        }
        //High priority operator
        else {
            operatorNode.children.push(nextNode);
            return buildExpression(cursor, tokens, operatorNode);
        }
    }
    else if (operatorNode.type === Type.endLine) {
        return node;
    }
    else { //Error, operator or endLine expected
        return null;
    }
}


