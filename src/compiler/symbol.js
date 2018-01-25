export default class Symbol {
    //A Colorful symbol is composed of a set of edges and a color.
    //The edges should be sorted to ease the symbol recognition by the compiler.
    //To do that, use symbol.sortVertex() and then symbol.sortEdges()
    //
    //indent is used to specify if this symbol is an indent block or not.

    constructor(edges, color, indent = false) {
        this.edges = edges;
        this.color = color;
        this.indent = indent;
    }

    sortVertex() {
        //For each edges sort the two vertices
        this.edges = this.edges.map((e) => [Math.min(e[0], e[1]), Math.max(e[0], e[1])])
    }

    sortEdges() {
        //Sort the edges by increasing value of the first vertex (or increasing value of the second in case of ties)
        this.edges = this.edges.sort((e1, e2) => compareEdges(e1, e2))
    }

    compareTo(s) {
        let v;
        for (let i = 0; i < Math.min(this.edges.length, s.edges.length); i++) {
            v = compareEdges(this.edges[i], s.edges[i]);
            if (v < 0) {
                return -1;
            }
            else if (v > 0) {
                return 1;
            }
        }
        if (this.edges.length < s.edges.length) {
            return -1;
        }
        else if (this.edges.length > s.edges.length) {
            return 1;
        }
        return 0;
    }
}

function compareEdges(e1, e2) {
    return 10 * e1[0] + e1[1] - 10 * e2[0] - e2[1];
}
