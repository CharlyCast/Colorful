import Tokenizer from './tokenizer';

export default class Interpreter{
    constructor(){
        this.tokenizer=new Tokenizer();
    }

    interpret(code){
        let tokens=this.tokenizer.tokenize(code);

        console.log("Tokens : ",tokens);
    }
}
