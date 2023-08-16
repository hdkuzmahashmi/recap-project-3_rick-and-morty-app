import createCharacterCard from "./components/card/card.js";
import createSearchBar from "./components/search-bar/search-bar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);

// Append things to DOM
const searchBarElement = createSearchBar();
searchBarContainer.append(searchBarElement);

const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 0;
let page = 1;
let searchQuery = "";
let isSearch = false;

fetchCharacters(`character?page=${page}`);

// Pagination - final solution
nextButton.addEventListener("click", () => {
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

prevButton.addEventListener("click", () => {
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
searchBar.addEventListener("submit", (event) => {
  let slug = "";
  isSearch = true;
  event.preventDefault();
  console.log("event", event);
  console.log("event target elements", event.target.elements.searchInput.value);
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

      pagination.textContent = `${page} / ${maxPage}`;

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
    } else pagination.textContent = "0 / 0";
  } catch (error) {
    console.error(error);
  }
}
