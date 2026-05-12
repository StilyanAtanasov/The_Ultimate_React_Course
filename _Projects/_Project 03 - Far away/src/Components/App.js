import { useState } from "react";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { Header } from "./Header";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleCheckItems(id) {
    setItems(items => items.map(item => (item.id === id ? { ...item, packed: !item.packed } : item)));
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure you want to delete all items?");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Header />
      <Main items={items} handleAddItems={handleAddItems} handleDeleteItems={handleDeleteItems} handleCheckItems={handleCheckItems} handleClearList={handleClearList} />
      <Footer items={items} />
    </div>
  );
}

export default App;
