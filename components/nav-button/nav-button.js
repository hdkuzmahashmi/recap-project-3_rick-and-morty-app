export default function createButton(name) {
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("button", `button--${name}`);
  buttonElement.setAttribute("data-js", `button-${name}`);
  buttonElement.textContent = name;

  return buttonElement;
}
