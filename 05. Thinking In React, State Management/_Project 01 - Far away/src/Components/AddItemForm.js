import { useState } from "react";

export function AddItemForm({ onAddItem }) {
  const [description, setDescription] = useState(``);
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const item = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    onAddItem(item);

    setDescription(``);
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select name="quantity" placeholder="Quantity" value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" name="description" placeholder="Item..." value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
