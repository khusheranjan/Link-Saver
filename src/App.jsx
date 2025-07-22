import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Bookmarks from "./pages/Bookmarks";
import SummaryView from "./pages/SummaryView";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ThemeToggle from "./components/ThemeToggle";



export default function App() {
  const isAuthenticated = localStorage.getItem("user");

  return (
    <Router>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Bookmarks /> : <Navigate to="login" />} />
        <Route path="/summary/:id" element={<SummaryView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
