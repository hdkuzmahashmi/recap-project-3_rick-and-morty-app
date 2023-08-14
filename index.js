console.clear();
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
const maxPage = 1;
let page = 1;
const searchQuery = "";

fetchCharacters("character", page);

// Pagination

nextButton.addEventListener("click", async () => {
  page++;
  const data = await fetchCharacters("character", page);
});

// Fetching Data
async function fetchCharacters(slug, page) {
  cardContainer.innerHTML = "";
  const url = `https://rickandmortyapi.com/api/${slug}/?page=${page}`;
  const response = await fetch(url);
  const data = await response.json();

  data.results.forEach((person) => {
    const card = createCharacterCard(
      person.image,
      person.status,
      person.type,
      person.episode.length
    );
    cardContainer.append(card);
  });
}
