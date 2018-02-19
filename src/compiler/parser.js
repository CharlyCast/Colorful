import Type from './types';
import Value from './value';
import SyntaxNode from './syntaxNode';

export default function parse(buffer) {
    let abstractSyntaxTrees = [];
    // let cursor = {pos: 0};
    let tree;

    while (buffer.top() !== null) {
        tree = buildTree(buffer);
        if (tree !== null) {
            if (tree.type !== Type.endLine) {
                abstractSyntaxTrees.push(tree);
            }
        }
        else {
            console.log("Error while parsing");
        }
    }

    return abstractSyntaxTrees;
}

function buildNode(buffer) {
    let token = buffer.pop();
    let color = token.color;
    switch (token.type) {

        case Type.number:
            let value = token.value;
            while (buffer.top().type === Type.number && buffer.top().color === color) {
                value *= 10;
                value += buffer.pop().value;
            }
            if (color === "#ffffff") {
                return new SyntaxNode(Type.number, value);
            }
            else {
                let affectation = new SyntaxNode(Type.affectation, color, [new SyntaxNode(Type.number, value)]);
                return new SyntaxNode(Type.id, color, [affectation]);
            }
            break;

        case Type.boolean:
            if (color === "#ffffff") {
                return new SyntaxNode(Type.boolean, token.value);
            }
            else {
                let affectation = new SyntaxNode(Type.affectation, color, [new SyntaxNode(Type.boolean, token.value)]);
                return new SyntaxNode(Type.id, color, [affectation]);
            }
            break;

        case Type.id:
            return new SyntaxNode(Type.id, token.color);
            break;

        case Type.operator:
            if (color !== "#ffffff") {
                buffer.put({
                    romaji: "var",
                    type: Type.id,
                    color: color
                })
            }
            // else {
            //     return new SyntaxNode(Type.operator, token.value, [new SyntaxNode(Type.id, color)],
            //         {priority: token.priority, associativity: token.associativity});
            // }
            return new SyntaxNode(Type.operator, token.value, [],
                {priority: token.priority, associativity: token.associativity});

            break;

        case Type.delimiter:
            return new SyntaxNode(Type.delimiter, token.value);
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

function buildTree(buffer) {
    //Build an abstract syntax tree that embodies the instruction starting at cursor position.

    let node = buildNode(buffer);

    if (node.type === Type.number || node.type === Type.boolean || node.type === Type.id) {
        return (buildExpression2(buffer, node));
    }

    //This is an affectation with an arrow  <-.
    else if (node.type === Type.affectation) {
        let value = buildNode(buffer);

        if (value.type !== Type.number && value.type !== Type.id & value.type !== Type.boolean) {
            return null;
        }
        //Building the corresponding expression
        else {
            node.children.push(buildExpression2(buffer, value));
        }
    }

    return node;

}

function buildExpression(buffer, node) {
    //Recursive function that build the tree of the current expression.

    let operatorNode = buildNode(buffer);

    if (operatorNode === null) {
        //Error, should be an operator
        return null;
    }
    operatorNode.children.push(node);

    if (operatorNode.type === Type.operator) {
        let nextNode;

        //If this is a white operator
        //While building the operatorNode, if it was colored its first child is a reference to its color
        //Else it has only one child
        if (operatorNode.children.length === 1) {
            nextNode = buildNode(buffer);
        }
        else {
            nextNode = operatorNode.children[0];
            operatorNode.children = [operatorNode.children[1]];
        }

        //Low priority operator
        if (operatorNode.value === Value.add || operatorNode.value === Value.sub || operatorNode.value === Value.or) {

            operatorNode.children.push(buildExpression(buffer, nextNode));
            return operatorNode;
        }

        //High priority operator
        else {
            operatorNode.children.push(nextNode);
            return buildExpression(buffer, operatorNode);
        }
    }
    else if (operatorNode.type === Type.endLine) {
        return node;
    }
    else { //Error, operator or endLine expected
        return null;
    }
}

function buildExpression2(buffer,initialNode) {
    let stack = [];
    let output = [initialNode];
    let token = buffer.top();
    let node;

    //While the next token is an expression token
    while (token !== null &&
    token.type === Type.number ||
    token.type === Type.boolean ||
    token.type === Type.operator ||
    token.type === Type.delimiter ||
    token.type === Type.id) {


        switch (token.type) {
            case Type.number :
            case Type.boolean :
            case Type.id:
                output.push(buildNode(buffer));
                break;
            case Type.operator :
                let loop = true;
                while (stack.length>0 && loop && stack[0].type === Type.operator) {
                    if (token.priority <= stack[0].rules.priority
                        || (token.priority <= stack[0].rules.priority && token.associativity === Value.left)) {
                        output.push(stack.shift());
                    }
                    else {
                        loop = false;
                    }
                }
                //Transform the operator token into a node and put it on the stack
                stack.unshift(buildNode(buffer));
                break;
            case Type.delimiter:
                if (token.value === Value.leftParenthesis) {
                    stack.unshift(buildNode(buffer));
                }
                else {
                    // Trow the parenthesis away and add the top stack
                    // operator to the output until we find a left parenthesis
                    buffer.pop();
                    while (stack.length > 0 && stack[0].value !== Value.leftParenthesis) {
                        output.push(stack.shift());
                    }
                }

        }

        token = buffer.top();
    }

    while (stack.length>0){
        if (stack[0].value===Value.leftParenthesis){
            // Error, unexpected parenthesis
            return null;
        }
        output.push(stack.shift());
    }

    console.log("Output : ",output);
    return null;
}