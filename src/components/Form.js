import { useState } from "react";

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

export default Form;
