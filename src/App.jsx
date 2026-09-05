import { useState } from "react";
import "./App.css";
import EmployeeForm from "./EmployeeForm";
import CreateProduct from "./CreateProduct";
import EventRegistration from "./EventRegistration";

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

        <button onClick={() => setPage("event")}>
          Event Registration
        </button>
      </div>

      {page === "employee" && <EmployeeForm />}

      {page === "product" && <CreateProduct />}

      {page === "event" && <EventRegistration />}
    </div>
  );
}

export default App;