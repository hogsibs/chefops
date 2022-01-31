import "./App.css";
import ItemForm from "./shopping/ItemForm";

function App() {
  return <ItemForm onSubmit={(value) => console.log(value)} />;
}

export default App;
