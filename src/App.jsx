import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import ThemeToggle  from "./components/ThemeToggle";

function App() {
  const isAuthenticated = localStorage.getItem("user");

  return (
    <Router>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Bookmarks /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
