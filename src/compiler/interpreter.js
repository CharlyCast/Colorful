import Lexer from './lexer';
import parse from './parser';
import Buffer from './buffer';

export default class Interpreter{
    constructor(){
        this.lexer=new Lexer();
    }

    interpret(code){
        let tokens=this.lexer.tokenize(code);
        let buffer= new Buffer(tokens);

        console.log("Tokens : ",tokens);

        console.log("Parsed tokens : ", parse(buffer));

        // console.log("Buffer : ", buffer.tokens);
        // console.log("top : ", buffer.top());
        // console.log("pop : ", buffer.pop());
        // console.log("Buffer : ", buffer.tokens);
    }
}
