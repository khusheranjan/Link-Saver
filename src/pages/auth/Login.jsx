import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 px-4 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-center mb-6">
          Enter your email and password to access your account.
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
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-neutral-500 dark:text-neutral-400 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-black dark:text-white font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
