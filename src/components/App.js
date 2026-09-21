import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

export default App;
