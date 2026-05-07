import { useState } from "react";
import "./styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion items={faqs} />
    </div>
  );
}

function Accordion({ items }) {
  const [openNumber, setOpenNumber] = useState(null);

  const toggleItem = number => {
    setOpenNumber(prevNumber => (prevNumber === number ? null : number));
  };

  return (
    <section className="accordion">
      {items.map((item, index) => (
        <AccordionItem key={index} number={index + 1} title={item.title} text={item.text} isOpen={openNumber === index + 1} setIsOpen={toggleItem} />
      ))}
    </section>
  );
}

function AccordionItem({ number, title, text, isOpen, setIsOpen }) {
  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(number)}>
      <span className="number">{number <= 9 ? String(number).padStart(2, "0") : number}</span>
      <h3 className="title">{title}</h3>
      <p className="icon">{isOpen ? "-" : "+"}</p>

      {isOpen && <p className="content-box">{text}</p>}
    </div>
  );
}
