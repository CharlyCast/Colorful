import React, {Component} from 'react'

export default class Doc extends Component {
    render() {
        return (
            <div>
                <h3>General</h3>

                <p>
                    Colorful is a symbolic interpreted language designed to be used on portable device with
                    tactile screen. A code written in Colorful is a set of colored symbols, the colors act as variables
                    name so that it is no more needed to type anything with a keyboard.
                </p>

                <h3>Basic symbols</h3>

                <h4>Numbers and boolean</h4>

                <p>
                    <img src={"img/doc/numbers.png"}/> Numbers are basics symbols that can be used to specify a value
                    for a variable or expression.
                    A number is a sequence of numerals of te same color, if the color is
                    different from white then the variable corresponding to that color will be set to the value of the
                    colored number. This behavior could be use alone or in any expression to shorten the code.
                </p>
                <p>
                    <img src={"img/doc/boolean.png"}/> Boolean behave in the exact same way as numerals except that
                    there could not be two booleans side by side. There is two values for boolean : True or False.
                </p>

                <h3>Variables</h3>

                <p>
                    <img src={"img/doc/variable.png"}/> Variable can be call with the triangle symbol, they should
                    always have a color other than white, this is what replace the name in Colorful.
                    Calling a variable this way result in the exact same way as writing its name in any other language.
                </p>
                <p>
                    There are two ways to assign a value to a variable. For any complex expression it should be done
                    with an arrow (the assign symbol) of the corresponding color followed by the expression to be
                    evaluated. For a simple assignment such as a numerical or boolean value it is easier to just
                    write the value in the right color, the corresponding variable will be assigned with this value.
                </p>
            </div>
        )
    }
}