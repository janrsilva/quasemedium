import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import LoginButton from "./login";

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

it("shows Entrar when not logged and show user name if logged", () => {
  act(() => {
    render(<LoginButton />, container);
  });
  expect(container.textContent).toBe("Entrar");

  act(() => {
    const user = {name: "Janderson"}
    render(<LoginButton session={{user}} />, container);
  });
  expect(container.textContent).toBe("Oi, Janderson");
});