import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import data from "../public/data.json";
import fetchMock from "jest-fetch-mock";

const sleep = (ms: number) => {
  console.log(`Sleeping for ${ms / 1000} seconds`);
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

describe("App", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("images change every 3 seconds and loops", async () => {
    fetchMock.mockResponse(JSON.stringify(data));

    render(<App />);
    expect(
      await screen.findByText(/Nike Air VaporMax Plus/i)
    ).toBeInTheDocument();
    await sleep(3000);
    expect(await screen.findByText(/Yeezy Boost 350/i)).toBeInTheDocument();
    await sleep(3000);
    expect(await screen.findByText(/Yeezy Boost 700/i)).toBeInTheDocument();
    await sleep(3000);
    expect(
      await screen.findByText(/Nike Air VaporMax Plus/i)
    ).toBeInTheDocument();
  }, 10000);

  test("modal opens with product info", async () => {
    fetchMock.mockResponse(JSON.stringify(data));

    render(<App />);
    const item = await screen.findByText(/Nike Air VaporMax Plus/i);
    expect(item).toBeInTheDocument();
    fireEvent.click(item);
    expect(await screen.findByText(/more/i)).toBeInTheDocument();
    expect(await screen.findByText(/120/i)).toBeInTheDocument();
  });
});
