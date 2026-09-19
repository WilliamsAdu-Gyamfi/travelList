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

  const handleAddItems = function (newItem) {
    setItems((currentItems) => [...currentItems, newItem]);
  };

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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItems={handleToggle}
      />
      <Stats />
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

const PackingList = function ({ items, onDeleteItem, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>
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

const Stats = function () {
  return (
    <footer className="stats">
      <em>You have X items on your List, and you already packed X (X%)</em>
    </footer>
  );
};

export default App;
