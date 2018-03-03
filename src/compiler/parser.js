import Type from './types';
import Value from './value';
import SyntaxNode from './syntaxNode';

export default function parse(buffer) {
    let abstractSyntaxTrees = new SyntaxNode(Type.block);
    // let cursor = {pos: 0};
    let tree;

    while (buffer.top() !== null) {
        tree = buildTree(buffer);
        if (tree !== null) {
            if (tree.type !== Type.endLine) {
                abstractSyntaxTrees.children.push(tree);
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
            buildColoredNodes(buffer, color);
            return new SyntaxNode(Type.operator, token.value, [],
                {priority: token.priority, associativity: token.associativity});

            break;

        case Type.delimiter:
            return new SyntaxNode(Type.delimiter, token.value);
            break;

        case Type.affectation:
            return new SyntaxNode(Type.affectation, token.color);
            break;

        case Type.loop:
            buildColoredNodes(buffer, color);
            return new SyntaxNode(Type.loop, token.value);
            break;

        case Type.conditional:
            buildColoredNodes(buffer, color);
            return new SyntaxNode(Type.conditional, token.value);
            break;

        case Type.endLine:
            return new SyntaxNode(Type.endLine);
            break;
    }

    console.log("Error while building a node, unrecognized type");
    return null;
}

function buildColoredNodes(buffer, color) {
    if (color !== "#ffffff") {
        buffer.put({
            romaji: "var",
            type: Type.id,
            color: color
        })
    }
}

function buildTree(buffer, indent = 0) {
    //Build an abstract syntax tree that embodies the instruction starting at cursor position.

    //Removing the indentation
    for (let i = 0; i < indent; i++) {
        if (buffer.top() === null || buffer.top().type !== Type.indent) {
            return new SyntaxNode(Type.endBlock);
        }
        buffer.pop();
    }

    let node = buildNode(buffer);

    if (node.type === Type.number || node.type === Type.boolean || node.type === Type.id) {
        return (buildExpression(buffer, node));
    }

    if (node.type === Type.delimiter) {
        return (buildExpression(buffer, node));
    }

    //This is an affectation with an arrow  <-.
    else if (node.type === Type.affectation) {
        let value = buildNode(buffer);

        if (value.type !== Type.number && value.type !== Type.id &&
            value.type !== Type.boolean && value.type !== Type.delimiter) {
            console.log("Expression parsing failed, non-numerical token");
            return null;
        }
        //Building the corresponding expression
        else {
            node.children.push(buildExpression(buffer, value));
        }
    }

    if (node.type === Type.loop) {
        node.children.push(buildExpression(buffer));
        node.children.push(new SyntaxNode(Type.block));
        buildBlock(node.children[1], buffer, indent);
    }

    if (node.type === Type.conditional) {
        if (node.value !== Value.if) {
            console.log("Eror : if expected");
        }

        node.children.push(buildExpression(buffer));
        node.children.push(new SyntaxNode(Type.block));

        buildBlock(node.children[1], buffer, indent);

        node.children.push(new SyntaxNode(Type.block));

        if (buffer.top !== null && buffer.top().type === Type.conditional && buffer.top().value === Value.else) {
            buffer.pop();
            buildBlock(node.children[2], buffer, indent);
        }
    }

    return node;

}

function buildBlock(block, buffer, indent) {
    //build the block's children

    //Removing the endLine and building the next instruction
    buffer.pop();
    let instruction = buildTree(buffer, indent + 1);

    while (instruction.type !== Type.endBlock) {
        //While the next instruction is correctly indented, we add it to the block of the loop
        block.children.push(instruction);

        buffer.pop();
        instruction = buildTree(buffer, indent + 1);
    }
}

// Build a tree from the expression using shunting yard algorithm
function buildExpression(buffer, initialNode = buildNode(buffer)) {
    let stack = [];
    let output = [];
    let token = buffer.top();

    if (
        initialNode.type === Type.number ||
        initialNode.type === Type.boolean ||
        initialNode.type === Type.id) {
        output.push(initialNode);
    }

    //While the next token is an expression token
    while (
        token !== null &&
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
                while (stack.length > 0 && loop && stack[0].type === Type.operator) {
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
                    if (stack.length > 0 && stack[0].value === Value.leftParenthesis) {
                        stack.shift();
                    }
                }

        }

        token = buffer.top();
    }

    while (stack.length > 0) {
        if (stack[0].value === Value.leftParenthesis) {
            // Error, unexpected parenthesis
            console.log("Unexpected or expected parenthesis");
            console.log("Stack : ", stack);
            return null;
        }
        output.push(stack.shift());
    }

    // console.log("Output : ", output.slice());
    return polishToTree(output);
}

//Transform the reverse polish input into a syntax tree
function polishToTree(polish) {
    let stack = [];
    let node;
    while (polish.length > 0) {
        node = polish.shift();

        if (node.type === Type.operator) {
            if (stack.length < 2) {
                console.log("Insufficient number of arguments");
                return null;
            }
            else {
                node.children.unshift(stack.pop());
                node.children.unshift(stack.pop());
                stack.push(node);
            }
        }
        else {
            stack.push(node);
        }
    }

    if (stack.length === 1) {
        return stack.pop();
    }
    else {
        console.log("Unexpected polish notation", stack);
        return null;
    }
}