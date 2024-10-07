import "./App.css";
import { Routes, Route } from "react-router-dom";
import PublicGroups from "./pages/PublicGroups";
import GroupInsert from "./pages/GroupInsert";
import GroupInfo from "./pages/GroupInfo";
import PrivateGroupAccess from "./pages/PrivateGroupAccess";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicGroups />} />
        <Route path="/groupInsert" element={<GroupInsert />} />
        <Route path="/groupInfo/:id" element={<GroupInfo />} />
        <Route
          path="/privateGroupAccess/:id"
          element={<PrivateGroupAccess />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
