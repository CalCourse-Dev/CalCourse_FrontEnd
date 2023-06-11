import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders CalCourse title", () => {
  render(<App />);
  const linkElement = screen.getByText(/CalCourse/i);
  expect(linkElement).toBeInTheDocument();
});
