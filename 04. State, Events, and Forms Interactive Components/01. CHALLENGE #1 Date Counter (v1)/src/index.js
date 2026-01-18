"use script";

import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const stepDefaultValue = 1;
const countDefaultValue = 0;

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(stepDefaultValue);
  const [count, setCount] = useState(countDefaultValue);

  let textString = ``;
  if (count === 0) textString = `Today is`;
  else if (count < 0) textString = `${Math.abs(count)} days ago was`;
  else if (count > 0) textString = `${count} days from today is`;

  return (
    <div>
      <div>
        <button type="button" onClick={() => step > 1 && setStep(s => s - 1)}>
          -
        </button>
        <span>Step: {step}</span>
        <button type="button" onClick={() => setStep(s => s + 1)}>
          +
        </button>
      </div>
      <div>
        <button type="button" onClick={() => setCount(c => c - step)}>
          -
        </button>
        <span>Count: {count}</span>
        <button type="button" onClick={() => setCount(c => c + step)}>
          +
        </button>
      </div>

      <p>
        {textString} {new Date(Date.now()).addDays(count).toDateString()}
      </p>
    </div>
  );
}

const rootElement = document.getElementById(`root`);
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
