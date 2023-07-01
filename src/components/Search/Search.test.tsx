import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Search from "./Search";
import { InputBaseProps } from "@mui/material";

describe("Search component", () => {
  it("renders the SearchInput component", () => {
    render(<Search />);
    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toBeInTheDocument();
  });

  it("changes the search input", () => {
    render(<Search />);
    const searchInput: HTMLInputElement = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "something" } });
    expect(searchInput.value).toBe("something");
  });

  it("passes the searchInputProps", () => {
    const searchInputProps: InputBaseProps = {
      placeholder: "search tasks...",
    };
    render(<Search {...searchInputProps} />);
    const searchInput: HTMLInputElement = screen.getByTestId("search-input");
    expect(searchInput.placeholder).toBe("search tasks...");
  });
});
