import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!Array.isArray(users)) {
      localStorage.setItem("users", JSON.stringify([])); // reset if corrupted
      alert("Corrupted user data. Try again.");
      return;
    }

    const userExists = users.find(u => u.email === email);
  if (userExists) {
    alert("User already exists");
  } else {
    const newUser = { email, password };
    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(newUser)); // auto-login

    alert("Signup successful. Welcome!");
    navigate("/"); // redirect to bookmarks
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 px-4 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-center mb-6">
          Create your account to get started.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
          <input
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-neutral-500 dark:text-neutral-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-black dark:text-white font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
