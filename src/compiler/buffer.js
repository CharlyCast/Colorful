export default class Buffer {

    constructor(tokens) {
        this.tokens = tokens
    }

    // Remove the next token
    pop() {
        if (this.tokens.length > 0) {
            return this.tokens.shift();
        }
        else {
            return null;
        }
    }

    // Return the next token but don't remove it
    top() {
        if (this.tokens.length > 0) {
            return this.tokens[0];
        }
        else {
            return null;
        }
    }

    // Add a token on the top of the stack
    put(t) {
        this.tokens.unshift(t);
    }

    isEmpty() {
        return this.tokens.size() === 0;
    }
}