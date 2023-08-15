import createCharacterCard from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 0;
let page = 1;
const searchQuery = "";

fetchCharacters("character", page);

// Pagination - final solution
nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters("character", page);
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters("character", page);
  }
});

// Fetching Data
async function fetchCharacters(slug, page) {
  cardContainer.innerHTML = "";
  const url = `https://rickandmortyapi.com/api/${slug}/?page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
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
}
