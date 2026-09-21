const Stats = function ({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some Items to your List</em>
      </p>
    );

  const numItems = items.length;
  const numItemsPacked = items.filter((item) => item.packed).length;
  const itemsPercentage = Math.round((numItemsPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {itemsPercentage === 100
          ? "You got everything packed 🧳"
          : ` You have ${numItems} items on your List, and you already packed
        ${numItemsPacked} (${itemsPercentage}%)`}
      </em>
    </footer>
  );
};

export default Stats;
