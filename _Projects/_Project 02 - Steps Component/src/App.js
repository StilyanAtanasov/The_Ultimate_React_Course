import { useState } from "react";

const defaultStep = 1;
const defaultModalIsOpen = true;
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return <StepsModal steps={messages}></StepsModal>;
}

function StepsModal({ steps }) {
  const [currentStep, setCurrentStep] = useState(defaultStep);
  const [isModalOpen, setIsModalOpen] = useState(defaultModalIsOpen);

  const handleNextClick = () =>
    currentStep < steps.length && setCurrentStep((s) => s + 1);

  const handlePreviousClick = () =>
    currentStep > 1 && setCurrentStep((s) => s - 1);

  const handleOpenCloseModal = () => setIsModalOpen((s) => !s);

  return (
    <>
      <button className="close" onClick={handleOpenCloseModal}>
        &times;
      </button>
      {isModalOpen && (
        <section className="steps">
          <div className="numbers">
            {steps.map((_, i) => (
              <div key={i} className={currentStep >= i + 1 ? "active" : ""}>
                {i + 1}
              </div>
            ))}
          </div>

          <p className="message">
            Step {currentStep}: {steps[currentStep - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePreviousClick}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </section>
      )}
    </>
  );
}
