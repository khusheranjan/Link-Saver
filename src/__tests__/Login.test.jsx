/// <reference types="vitest" />

import { render, screen } from "@testing-library/react";
import Login from "../pages/auth/Login";
import { BrowserRouter } from "react-router-dom";

test("renders login form inputs", () => {
  render(<BrowserRouter><Login /></BrowserRouter>);
  expect(screen.getByPlaceholderText("m@example.com")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
});
