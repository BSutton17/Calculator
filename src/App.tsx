import { useState } from 'react'
import './App.css'

// Main component function called App
function App() {

  // Using the 'useState' hook to create three state variables: 'answer', 'display', and 'showFakeDisplay'
  const [answer, setAnswer] = useState("0");
  const [display, setDisplay] = useState("");
  const [showFakeDisplay, setShowFakeDisplay] = useState(false);

  // Trimmed expression used for calculations without leading/trailing whitespace
  const et = display.trim();

  // Function to check if a symbol is an operator (+, -, *, or /)
  const isOperator = (symbol: string) =>{
    return /[*/+-]/.test(symbol)
  }

  // Function to handle button presses in the calculator
  const buttonPress = (symbol: string) => {
    // Clear the calculator display and reset state variables if 'AC' button is pressed
    if (symbol === "clear") {
      setShowFakeDisplay(false);
      setAnswer("0");
      setDisplay("0");
    }
    // Toggle the sign of the displayed answer if '+/-' button is pressed
    else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    }
    // Convert the displayed answer to a percentage if '%' button is pressed
    else if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    }
    // Append the operator symbol to the display and update 'showFakeDisplay' to false
    else if (isOperator(symbol)) {
      setShowFakeDisplay(false);
      if (answer === "") return;
      setDisplay(et + " " + symbol + " ")
    }
    // Calculate the result if '=' button is pressed
    else if (symbol === "=") {
      calculate();
    }
    // Append '0' to the display if '0' button is pressed, but avoid leading zeros
    else if (symbol === "0") {
      setShowFakeDisplay(false);
      if (display.charAt(0) !== "0") {
        setDisplay(display + symbol)
      }
    }
    // Append a decimal point to the display if '.' button is pressed, but avoid multiple decimals in one number
    else if (symbol === ".") {
      const lastNumber = display.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      if (lastNumber.includes(".")) return;
      if (display === "") {
        setDisplay("0.");
      } else {
        setDisplay(display + symbol);
      }
      setShowFakeDisplay(false);
    }
    // Append the symbol to the display if any other button is pressed
    else {
      setShowFakeDisplay(false);
      if (display.charAt(0) === "0") {
        setDisplay(display.slice(1) + symbol);
      } else {
        setDisplay(display + symbol)
      }
    }
  };
  
  // Function to calculate the result of the expression in the display
  const calculate = () => {
    // If the last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    
    // Clean the expression so that two operators in a row use the last operator
    const parts = et.split(" ");
    const newParts = [];

    // Go through parts backward to handle consecutive operators
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newDisplay = newParts.join(" ");

    let newAnswer;
    // Evaluate the newDisplay to get the new answer
    if (isOperator(newDisplay.charAt(0))) {
      newAnswer = eval(answer + newDisplay);
    } else {
      newAnswer = eval(newDisplay);
    }

    // Check the type of the original operands and round the answer accordingly
    const originalOperand = parseFloat(display);
    if (isFinite(originalOperand) && originalOperand % 1 !== 0) {
      const decimalPlaces = originalOperand.toString().split(".")[1].length;
      newAnswer = newAnswer.toFixed(decimalPlaces);
    }

    // Set the new answer in the state variable and clear the display
    setAnswer(newAnswer.toString());
    setDisplay("");
    
    // Set the answer in the fake display and show it
    setShowFakeDisplay(true);
  }


  return (
    <div id="wrapper">
    <h1>Calculator</h1>
      <div id="container"> 
        <div id="display">{answer}</div>
        {showFakeDisplay && <div id="fake-display">{answer}</div>}
        <div id="secondary-display">{display}</div>
        <button id="clear" onClick={() => buttonPress("clear")} className="btn">AC</button>
        <button id="negative" onClick={() => buttonPress("negative")} className="btn">+/-</button>
        <button id="percent" onClick={() => buttonPress("percent")} className="btn">%</button>
        <button id="divide" onClick={() => buttonPress("/")}className="btn">/</button>
        <button id="multiply" onClick={() => buttonPress("*")} className="btn">X</button>
        <button id="subtract" onClick={() => buttonPress("-")} className="btn">-</button>
        <button id="add" onClick={() => buttonPress("+")} className="btn">+</button>
        <button id="equals" onClick={() => buttonPress("=")} className="btn">=</button>
        <button id="decimal" onClick={() => buttonPress(".")} className="btn">.</button>
        <button id="one" onClick={() => buttonPress("1")} className="btn">1</button>
        <button id="two" onClick={() => buttonPress("2")} className="btn">2</button>
        <button id="three" onClick={() => buttonPress("3")} className="btn">3</button>
        <button id="four" onClick={() => buttonPress("4")} className="btn">4</button>
        <button id="five" onClick={() => buttonPress("5")} className="btn">5</button>
        <button id="six" onClick={() => buttonPress("6")} className="btn">6</button>
        <button id="seven" onClick={() => buttonPress("7")} className="btn">7</button>
        <button id="eight" onClick={() => buttonPress("8")} className="btn">8</button>
        <button id="nine" onClick={() => buttonPress("9")} className="btn">9</button>
        <button id="zero" onClick={() => buttonPress("0")} className="btn">0</button>

      </div>
      <footer>Created by Bryson Sutton</footer>
    </div>
  )
}

export default App
