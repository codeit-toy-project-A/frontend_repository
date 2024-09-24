import "./App.css";
import { Routes, Route } from "react-router-dom";
import PublicGroups from "./pages/PublicGroups";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicGroups />} />
      </Routes>
    </>
  );
}

export default App;
