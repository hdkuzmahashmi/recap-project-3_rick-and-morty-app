import createCharacterCard from "./components/card/card.js";
import createButton from "./components/nav-button/nav-button.js";
import createPagination from "./components/nav-pagination/nav-pagination.js";
import createSearchBar from "./components/search-bar/search-bar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const navigation = document.querySelector('[data-js="navigation"]');

// Append things to DOM
const searchBarElement = createSearchBar();
searchBarContainer.append(searchBarElement);
const buttonElementPrev = createButton("prev");
navigation.append(buttonElementPrev);
const paginationElement = createPagination();
navigation.append(paginationElement);
const buttonElementNext = createButton("next");
navigation.append(buttonElementNext);

// States
let maxPage = 0;
let page = 1;
let searchQuery = "";
let isSearch = false;

fetchCharacters(`character?page=${page}`);

// Pagination - final solution
buttonElementNext.addEventListener("click", () => {
  let slug = "";

  if (page < maxPage) {
    page++;
    if (isSearch) {
      slug = `character/?page=${page}${searchQuery}`;
    } else {
      slug = `character?page=${page}`;
    }
    fetchCharacters(slug);
  }
});

buttonElementPrev.addEventListener("click", () => {
  let slug = "";
  if (page > 1) {
    page--;
    if (isSearch) {
      slug = `character/?page=${page}${searchQuery}`;
    } else {
      slug = `character?page=${page}`;
    }
    fetchCharacters(slug);
  }
});

// Search Button (ausgelagert)
searchBarElement.addEventListener("submit", (event) => {
  let slug = "";
  isSearch = true;
  event.preventDefault();
  searchQuery = `&name=${event.target.elements.searchInput.value}`;
  slug = `character/?page=${page}${searchQuery}`;
  fetchCharacters(slug);
});

// Fetching Data
async function fetchCharacters(slug) {
  cardContainer.innerHTML = "";
  try {
    const url = `https://rickandmortyapi.com/api/${slug}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.status !== 404) {
      maxPage = data.info.pages;

      paginationElement.textContent = `${page} / ${maxPage}`;

      data.results.forEach((person) => {
        const card = createCharacterCard(
          person.image,
          person.name,
          person.status,
          person.type,
          person.episode.length
        );
        cardContainer.append(card);
      });
    } else paginationElement.textContent = "0 / 0";
  } catch (error) {
    console.error(error);
  }
}
