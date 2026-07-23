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
      <h3>Whta do you need for your trip😍</h3>
    </div>
  );
};

const ParkingList = function () {
  return <div className="list">LIST</div>;
};

const Stats = function () {
  return (
    <footer className="stats">
      <em>You have X items on your List, and you already packed X (X%)</em>
    </footer>
  );
};

export default App;
