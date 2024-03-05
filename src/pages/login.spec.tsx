import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Login } from ".";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Login />);
  });
});
