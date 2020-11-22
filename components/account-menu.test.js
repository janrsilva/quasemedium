import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import AccountMenu from "./account-menu";

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

it("renders with or without a name", () => {
  act(() => {
    render(<AccountMenu />, container);
  });
  expect(container.textContent).toBe("");

  act(() => {
    render(<AccountMenu name="Janderson" />, container);
  });
  expect(container.textContent).toBe("Oi, Janderson");

  act(() => {
    render(<AccountMenu name="Pedro de Alcântara Francisco Antônio João Carlos Xavier de Paula Miguel Joaquim José Gonzaga Pascoal Cipriano Serafim de Bragança e Bourbon" />, container);
  });
  expect(container.textContent).toBe("Oi, Pedro");
});