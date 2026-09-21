import { useState } from "react";

/*
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 2, packed: true },
];
*/

const App = function () {
  const [items, setItems] = useState([]);

  //HOW TO ADD ITEMS TO AN ARRAY
  const handleAddItems = function (newItem) {
    setItems((currentItems) => [...currentItems, newItem]);
  };

  //HOW TO REMOVE/DELETE ITEMS FROM AN ARRAY
  const handleDeleteItems = function (id) {
    setItems((currentItems) =>
      currentItems.filter((newItem) => newItem.id !== id),
    );
  };

  const handleToggle = function (id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  };

  const handleClear = function () {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items",
    );
    if (confirmed) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItems={handleToggle}
        onClearItems={handleClear}
      />
      <Stats items={items} />
    </div>
  );
};

const Logo = function () {
  return <h1>🏞️Far Away🏘️</h1>;
};

/*
const Form = function () {
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip😍</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..."></input>
      <button>ADD</button>
    </form>
  );
};
*/

const Form = function ({ onAddItems }) {
  // controlled elements
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!description) return; // we do this to avoid displaying empty strings

    // creating new item to be added to the previous one
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    console.log(newItem);

    onAddItems(newItem);

    //this is done to reset the input fields back to normal(1, "")
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <h3>What do you need for your trip😍</h3>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>ADD</button>
    </form>
  );
};

const PackingList = function ({
  items,
  onDeleteItem,
  onToggleItems,
  onClearItems,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">sort by input</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed</option>
        </select>
        <button onClick={onClearItems}>Clear All</button>
      </div>
    </div>
  );
};

const Item = function ({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

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

export default App;
