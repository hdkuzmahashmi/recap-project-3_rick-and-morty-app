export default function createSearchBar() {
  const formElement = document.createElement("form");
  formElement.classList.add("search-bar");
  formElement.setAttribute("data-js", "search-bar");

  // input element
  const inputElement = document.createElement("input");
  inputElement.classList.add("search-bar__input");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("name", "searchInput");
  formElement.append(inputElement);

  // button element
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("search-bar__button");
  buttonElement.setAttribute("type", "submit");
  formElement.append(buttonElement);

  // image element
  const imageElement = document.createElement("img");
  imageElement.classList.add("search-bar__icon");
  imageElement.setAttribute("src", "assets/magnifying-glass.png");
  buttonElement.append(imageElement);

  return formElement;
}
