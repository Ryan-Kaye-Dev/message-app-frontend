import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import NotFoundPage from "../pages/NotFoundPage";

import "../src/stylesheets/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
