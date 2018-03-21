import React, {Component} from 'react'

export default class Doc extends Component {
    render() {
        return (
            <div>
                <h2>General</h2>

                <p>
                    Colorful is a symbolic interpreted language designed to be used on portable device with
                    tactile screen. A code written in Colorful is a set of colored symbols, the colors act as variables
                    name so that it is no more needed to type anything with a keyboard.
                </p>

                <h2>Basic symbols</h2>

                <h3>Numbers and boolean</h3>

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
                    always have a color other than white, this is what replace names in Colorful.
                    Calling a variable this way result the exact same way as writing its name in any other language does.
                </p>
                <p>
                    There are two ways to assign a value to a variable. For any complex expression it should be done
                    with an arrow (the assign symbol) of the corresponding color followed by the expression to be
                    evaluated. For a simple assignment such as a numerical or boolean value it is easier to just
                    write the value in the right color, the corresponding variable will be assigned with this value.
                </p>
                <p>
                    <img src={"img/doc/assignArrow.png"}/> or <img src={"img/doc/assignDigit.png"}/> have the same
                    result : they store the value 1 in the variable orange.
                </p>

                <h3>Operators</h3>
                <p>
                    <img src={"img/doc/operators.png"}/> Respectively the addition, subtraction, multiplication,
                    division and modulo operators. A white operator behave as expected in any other language but a
                    colored one will be interpreted as a white operator followed by the variable of the corresponding
                    color.
                </p>
                <p>
                    <img src={"img/doc/whitePlus.png"}/> and <img src={"img/doc/coloredPlus.png"}/> behave exactly in
                    the same way. This could be generalized to most of colorful symbols..
                </p>

                <h3>Comparators</h3>
                <p>
                    <img src={"img/doc/comparators.png"}/> Comparators could also be either white or colored, in the
                    later case they will be interpreted as if followed by the corresponding colored variable.
                </p>

                <h3>Boolean operators</h3>
                <p>
                    <img src={"img/doc/andOr.png"}/> Respectively "and" and "or" operators.
                </p>

                <h2>Advanced symbols</h2>

                <p>
                    For more advanced syntax Colorful use the off-side rule which mean that blocks are identified by
                    their indentation. Whenever a new bloc is created everything in it should be indented exactly
                    one more time that the number of indentation of the symbol declaring the block (such as a if
                    symbol for instance).
                </p>

                <h3>Conditions</h3>
                <p>
                    <img src={"img/doc/ifElse.png"}/> Respectively the if and else symbol. If should always be followed
                    by a boolean or a boolean expression and then following block should be indented.
                    As for most operators, if the if symbol is colored it will be interpreted as if followed by the
                    corresponding variable. The else symbol doesn't need any condition (and don't support them for now).
                </p>

                <h3>Example</h3>
                <p>
                    <img src={"img/doc/ifCode.png"}/> This code does compare the orange variable to the violet, if the
                    orange is greater then orange take the value of violet, else orange take the value 0.
                </p>

                <h3>Loops</h3>
                <p>
                    <img src={"img/doc/while.png"}/> For now only the while loop is supported. The while symbol should
                    be followed by a boolean (or an expression resulting in a boolean).
                </p>
            </div>
        )
    }
}