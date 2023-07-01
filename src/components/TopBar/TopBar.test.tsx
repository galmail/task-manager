import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopBar from "./TopBar";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  // ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("TopBar component", () => {
  it("renders the TopBar component", () => {
    render(<TopBar title="the top bar title" />);
    const title = screen.getByText(/the top bar title/);
    expect(title).toBeInTheDocument();
  });

  it("renders the back button on TopBar component", async () => {
    render(<TopBar title="the top bar title" canGoBack={true} />);
    const backButton = screen.getByLabelText("back");
    await userEvent.click(backButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
  });

  it("renders children in the TopBar component", () => {
    render(
      <TopBar title="the top bar title">
        <button>My Cool Button</button>
      </TopBar>
    );
    const button = screen.getByText(/My Cool Button/);
    expect(button).toBeInTheDocument();
  });
});
