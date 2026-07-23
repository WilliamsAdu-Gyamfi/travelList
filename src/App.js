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
      <ParkingList />
      <Stats />
    </div>
  );
};

const Logo = function () {
  return <h1>🏞️Far Away🏘️</h1>;
};

const Form = function () {
  return (
    <div className="add-form">
      <h3>What do you need for your trip😍</h3>
    </div>
  );
};

const ParkingList = function () {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} />
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
