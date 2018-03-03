import Lexer from './lexer';
import parse from './parser';
import Buffer from './buffer';
import Type from './types';
import Value from './value';

export default class Interpreter {
    constructor() {
        this.lexer = new Lexer();
        this.heap={};
    }

    interpret(code) {
        let tokens = this.lexer.tokenize(code);
        let buffer = new Buffer(tokens);
        let syntaxTree=parse(buffer);

        console.log("Tokens : ", tokens);

        console.log("Parsed tokens : ", syntaxTree);

        this.execute(syntaxTree);

        console.log("Heap : ", this.heap);
    }

    execute(syntaxTree){
        //Execute the syntax tree correctly parsed by the eponymous function
        switch (syntaxTree.type){
            case Type.block:
                console.log("Block of size ", syntaxTree.children.length);
                for (let i=0;i<syntaxTree.children.length;i++){
                    this.execute(syntaxTree.children[i]);
                }
                break;
            case Type.id:
                console.log("id");
                if (syntaxTree.children.length>0){
                    this.execute(syntaxTree.children[0]);
                }
                syntaxTree.payload=this.heap[syntaxTree.value];
                break;
            case Type.operator:
                this.execute(syntaxTree.children[0]);
                this.execute(syntaxTree.children[1]);
                switch (syntaxTree.value){
                    case Value.add:
                        syntaxTree.payload=syntaxTree.children[0].payload+syntaxTree.children[1].payload;
                        break;
                    case Value.sub:
                        syntaxTree.payload=syntaxTree.children[0].payload-syntaxTree.children[1].payload;
                        break;
                    case Value.mult:
                        syntaxTree.payload=syntaxTree.children[0].payload*syntaxTree.children[1].payload;
                        break;
                    case Value.div:
                        syntaxTree.payload=Math.floor(syntaxTree.children[0].payload/syntaxTree.children[1].payload);
                        break;
                    case Value.or:
                        syntaxTree.payload=syntaxTree.children[0].payload || syntaxTree.children[1].payload;
                        break;
                    case Value.and:
                        syntaxTree.payload=syntaxTree.children[0].payload && syntaxTree.children[1].payload;
                        break;
                    case Value.less:
                        syntaxTree.payload=syntaxTree.children[0].payload<syntaxTree.children[1].payload;
                        break;
                    case Value.greater:
                        syntaxTree.payload=syntaxTree.children[0].payload>syntaxTree.children[1].payload;
                        break;
                    case Value.leq:
                        syntaxTree.payload=syntaxTree.children[0].payload<=syntaxTree.children[1].payload;
                        break;
                    case Value.geq:
                        syntaxTree.payload=syntaxTree.children[0].payload>=syntaxTree.children[1].payload;
                        break;
                    case Value.equal:
                        syntaxTree.payload=syntaxTree.children[0].payload===syntaxTree.children[1].payload;
                        break;
                    default:
                        console.log("Error while interpreting, unexpected arguments : ", syntaxTree);
                }
                break;
            case Type.number:
                syntaxTree.payload=syntaxTree.value;
                break;
            case Type.boolean:
                if (syntaxTree.value==="false"){
                    syntaxTree.payload=false;
                }
                else {
                    syntaxTree.payload=false;
                }
                break;
            case Type.affectation:
                this.execute(syntaxTree.children[0]);
                this.heap[syntaxTree.value]=syntaxTree.children[0].payload;
                console.log("Affected : ", syntaxTree.children[0].payload);
                break;
            case Type.conditional:
                break;
        }
    }
}
