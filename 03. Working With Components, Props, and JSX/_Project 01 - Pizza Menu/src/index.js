import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById(`root`));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const openHour = 12;
const closeHour = 22;
const pizzaData = [
  {
    name: `Focaccia`,
    ingredients: `Bread with italian olive oil and rosemary`,
    price: 6,
    photoPath: `pizzas/focaccia.jpg`,
    soldOut: false,
  },
  {
    name: `Pizza Margherita`,
    ingredients: `Tomato and mozarella`,
    price: 10,
    photoPath: `pizzas/margherita.jpg`,
    soldOut: false,
  },
  {
    name: `Pizza Spinaci`,
    ingredients: `Tomato, mozarella, spinach, and ricotta cheese`,
    price: 12,
    photoPath: `pizzas/spinaci.jpg`,
    soldOut: false,
  },
  {
    name: `Pizza Funghi`,
    ingredients: `Tomato, mozarella, mushrooms, and onion`,
    price: 12,
    photoPath: `pizzas/funghi.jpg`,
    soldOut: false,
  },
  {
    name: `Pizza Salamino`,
    ingredients: `Tomato, mozarella, and pepperoni`,
    price: 15,
    photoPath: `pizzas/salamino.jpg`,
    soldOut: true,
  },
  {
    name: `Pizza Prosciutto`,
    ingredients: `Tomato, mozarella, ham, aragula, and burrata cheese`,
    price: 18,
    photoPath: `pizzas/prosciutto.jpg`,
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header></Header>
      <Menu></Menu>
      <Footer></Footer>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {pizzaData.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzaData.map((p) => (
              <li
                className={`pizza ${p.soldOut ? `sold-out` : ``}`}
                key={p.name}
              >
                <Pizza {...p}></Pizza>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later :)</p>
      )}
    </main>
  );
}

function Pizza({ name, ingredients, price, photoPath, soldOut }) {
  return (
    <>
      <img src={photoPath} alt={name}></img>
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? `SOLD OUT` : price}</span>
      </div>
    </>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour}></Order>
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
}

function Order({ openHour, closeHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}
