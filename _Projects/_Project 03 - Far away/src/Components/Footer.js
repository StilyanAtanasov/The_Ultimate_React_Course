export function Footer({ items }) {
  const percentage = Math.round((items.filter(item => item.packed).length / items.length) * 100);

  return (
    <footer>
      <p className="stats">
        <em>
          {items.length === 0
            ? `Start adding some items to your packing list 🚀`
            : percentage === 100
              ? `You got everything! Ready to go ✈️`
              : `💼 You have ${items.length} items on your list, and you already packed ${items.filter(item => item.packed).length} (${percentage}%)`}
        </em>
      </p>
    </footer>
  );
}
