import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 2, packed: true },
];

const App = function () {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
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

const Form = function () {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!description) return; // we do this to avoid displaying empty strings

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    console.log(newItem);

    //this is done to reset the input fields back to normal(1, "")
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip😍</h3>

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

const PackingList = function () {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

const Item = function ({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button>❌</button>
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
