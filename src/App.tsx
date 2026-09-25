import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
      </Routes>
    </>
  );
}

export default App;