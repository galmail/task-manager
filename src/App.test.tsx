import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

jest.mock("./hooks/useFetchTasks", () => () => ({
  tasks: [],
  loading: false,
  error: null,
}));

describe("App tests", () => {
  test("no tasks available", () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(
      screen.getByText(/There are no tasks available/)
    ).toBeInTheDocument();
  });
});
