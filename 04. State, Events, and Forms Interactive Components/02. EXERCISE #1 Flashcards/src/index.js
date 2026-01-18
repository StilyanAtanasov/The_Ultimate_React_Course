"use script";

import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const rootElement = document.getElementById(`root`);
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question: "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

function App() {
  return (
    <div>
      <FlashCards questions={questions} />
    </div>
  );
}

function FlashCards({ questions }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleCardOnClick = clickedId => setSelectedId(clickedId !== selectedId ? clickedId : null);

  return (
    <div className="flashcards">
      {questions.map(q => (
        <div key={q.id} className={q.id === selectedId ? `selected` : ``} onClick={() => handleCardOnClick(q.id)}>
          <p>{q.id !== selectedId ? q.question : q.answer}</p>
        </div>
      ))}
    </div>
  );
}
