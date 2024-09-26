import "./App.css";
import { Routes, Route } from "react-router-dom";
import PublicGroups from "./pages/PublicGroups";
import GroupInsert from "./pages/GroupInsert";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicGroups />} />
        <Route path="/groupInsert" element={<GroupInsert />} />
      </Routes>
    </>
  );
}

export default App;
