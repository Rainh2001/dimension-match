import DimensionDisplay from "./components/DimensionDisplay";
import DimensionGridContainer from "./components/DimensionGridContainer";
import "./App.scss";

function App() {
  return (
    <div className="main">
      <DimensionGridContainer />
      <DimensionDisplay />
    </div>
  );
}

export default App;
