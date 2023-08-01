// Write your tests here

import React from "react";
import AppFunctional from "./AppFunctional";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

beforeEach(() => {
  render(<AppFunctional />);
});

test("sanity", () => {
  expect(true).toBe(true);
});

test("Check starting coordinates", async () => {
  expect(screen.getByText("Koordinatlar (2,2)"));
});

test("Check coordinates when moved", async () => {
  fireEvent.click(document.querySelector("#right"));
  fireEvent.click(document.querySelector("#down"));
  expect(screen.getByText("Koordinatlar (3,3)"));
});

test(`Check if the reset button is working`, () => {
  fireEvent.click(up);
  fireEvent.click(left);
  expect(steps.textContent).toBe("2 kere ilerlediniz");
  fireEvent.click(reset);
  expect(steps.textContent).toBe("0 kere ilerlediniz");
});
