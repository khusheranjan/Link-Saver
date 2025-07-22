/// <reference types="vitest" />


import { render, screen } from "@testing-library/react";
import Bookmarks from "../pages/Bookmarks";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  localStorage.setItem(
    "bookmarks",
    JSON.stringify([
      {
        url: "https://example.com",
        title: "example.com",
        summary: "Example summary",
        icon: "https://example.com/favicon.ico",
        tag: "General",
        createdAt: new Date().toISOString()
      }
    ])
  );
});

test("renders saved bookmark from localStorage", () => {
  render(
    <BrowserRouter>
      <Bookmarks />
    </BrowserRouter>
  );

  expect(screen.getByText("example.com")).toBeInTheDocument();
  expect(screen.getByText(/example summary/i)).toBeInTheDocument();
});
