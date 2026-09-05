import { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import CreateProduct from "./CreateProduct";

function App() {
  const [page, setPage] = useState("employee");

  return (
    <div>
      <div className="navigation">
        <button onClick={() => setPage("employee")}>
          Employee Registration
        </button>

        <button onClick={() => setPage("product")}>
          Create Product
        </button>
      </div>

      {page === "employee" && <EmployeeForm />}
      {page === "product" && <CreateProduct />}
    </div>
  );
}

export default App;
