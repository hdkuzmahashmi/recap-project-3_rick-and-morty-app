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
let searchQuery = "";
let isSearch = false;

fetchCharacters(`character?page=${page}`);

// Pagination - final solution
// https://rickandmortyapi.com/api/character/&name=rick(wrong)
// character/?name=rick
// https://rickandmortyapi.com/api/character/?page=2&name=rick (right)
nextButton.addEventListener("click", () => {
  let slug = "";
  // `character/?page=${page}&name=${event.target.query.value}`
  if (page < maxPage) {
    page++;
    if (isSearch) {
      slug = `${searchQuery}`;
      console.log("slug", slug);
    } else {
      slug = `character?page=${page}`;
    }
    fetchCharacters(slug);
  }
  console.log("search query next", searchQuery);
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters(`character?page=${page}`);
  }
});

// Search Button
searchBar.addEventListener("submit", (event) => {
  isSearch = true;
  event.preventDefault();
  // https://rickandmortyapi.com/api/character/?page=2&name=rick (right)
  searchQuery = `character/?page=${page}&name=${event.target.query.value}`;
  fetchCharacters(searchQuery);
  console.log("search:", searchQuery);
});

// Fetching Data
async function fetchCharacters(slug) {
  cardContainer.innerHTML = "";

  const url = `https://rickandmortyapi.com/api/${slug}`;

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
  console.log("data", data);
}
