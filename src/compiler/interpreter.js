import Lexer from './lexer';
import parse from './parser';

export default class Interpreter{
    constructor(){
        this.lexer=new Lexer();
    }

    interpret(code){
        let tokens=this.lexer.tokenize(code);

        console.log("Tokens : ",tokens);

        console.log("Parsed tokens : ", parse(tokens));
    }
}
