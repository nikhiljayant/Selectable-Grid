import SelectableGrid from "./components/SelectableGrid";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Selectable Grid</h1>
      <SelectableGrid rows={10} cols={10} />
    </div>
  );
}

export default App;
