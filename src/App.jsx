import { useState } from "react";
import "./App.css";
import PostsList from "./components/posts/postList";
import ProductsTable from "./components/products/productsTable";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-yellow-300">Vite + React</h1>
      <ProductsTable />
    </>
  );
}

export default App;
