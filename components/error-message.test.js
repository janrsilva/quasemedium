import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ErrorMessage from "./error-message";

let container = null;
beforeEach(() => {
  // configurar o elemento do DOM como o alvo da renderização
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Limpar ao sair
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("dont show a error message without a children text", () => {
  act(() => {
    render(<ErrorMessage></ErrorMessage>, container);
  });
  expect(container.textContent).toBe("");
  act(() => {
    render(<ErrorMessage>Errei</ErrorMessage>, container);
  });
  expect(container.textContent).toBe("Errei");
});