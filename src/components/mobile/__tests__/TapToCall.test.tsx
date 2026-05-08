import * as React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { TapToCall, TapToEmail } from "../TapToCall";

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Mock navigator.userAgent
const mockUserAgent = (userAgent: string) => {
  Object.defineProperty(window.navigator, "userAgent", {
    value: userAgent,
    configurable: true,
  });
};

describe("TapToCall", () => {
  it("renders phone number with default variant", () => {
    render(<TapToCall phoneNumber="+1-555-123-4567" />);
    expect(screen.getByText("+1-555-123-4567")).toBeInTheDocument();
  });

  it("renders custom label when provided", () => {
    render(<TapToCall phoneNumber="+1-555-123-4567" label="Call Now" />);
    expect(screen.getByText("Call Now")).toBeInTheDocument();
  });

  it("renders with button variant", () => {
    render(
      <TapToCall
        phoneNumber="+1-555-123-4567"
        label="Contact"
        variant="button"
      />
    );
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("hides icon when showIcon is false", () => {
    const { container } = render(
      <TapToCall phoneNumber="+1-555-123-4567" showIcon={false} />
    );
    const icon = container.querySelector("svg");
    expect(icon).not.toBeInTheDocument();
  });

  it("shows icon by default", () => {
    const { container } = render(<TapToCall phoneNumber="+1-555-123-4567" />);
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});

describe("TapToEmail", () => {
  it("renders email address with default variant", () => {
    render(<TapToEmail email="test@example.com" />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("renders custom label when provided", () => {
    render(<TapToEmail email="test@example.com" label="Email Us" />);
    expect(screen.getByText("Email Us")).toBeInTheDocument();
  });

  it("renders with button variant", () => {
    render(
      <TapToEmail email="test@example.com" label="Contact" variant="button" />
    );
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("hides icon when showIcon is false", () => {
    const { container } = render(
      <TapToEmail email="test@example.com" showIcon={false} />
    );
    const icon = container.querySelector("svg");
    expect(icon).not.toBeInTheDocument();
  });

  it("shows icon by default", () => {
    const { container } = render(<TapToEmail email="test@example.com" />);
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
