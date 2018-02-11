export default class Buffer {

    constructor(tokens) {
        this.tokens=tokens
    }

    pop(){
        if (this.tokens.length>0){
            return this.tokens.shift();
        }
        else {
            return null;
        }
    }

    top(){
        if (this.tokens.length>0){
            return this.tokens[0];
        }
        else {
            return null;
        }
    }
}