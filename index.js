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
  page++;
  prevButton.removeAttribute("disabled");
  if (page > maxPage) {
    page = maxPage;
    nextButton.setAttribute("disabled", "disabled");
  } else {
    nextButton.removeAttribute("disabled");
    fetchCharacters("character", page);
  }
  pagination.textContent = `${page} / ${maxPage}`;
});

prevButton.addEventListener("click", () => {
  page--;
  prevButton.removeAttribute("disabled");
  nextButton.removeAttribute("disabled");
  pagination.textContent = `${page} / ${maxPage}`;
  if (page === 1) {
    prevButton.setAttribute("disabled", "disabled");
  } else {
    pagination.textContent = `${page} / ${maxPage}`;
    fetchCharacters("character", page);
  }
});

// -- Pagination Way with infinite Loop --
// nextButton.addEventListener("click", () => {
//   page++;
//   if (page > maxPage) {
//     page = 1;
//   }
//   pagination.textContent = `${page} / ${maxPage}`;
//   fetchCharacters("character", page);
// });

// prevButton.addEventListener("click", () => {
//   page--;
//   pagination.textContent = `${page} / ${maxPage}`;
//   if (page < 1) {
//     page = maxPage;
//     pagination.textContent = `${maxPage} / ${maxPage}`;
//   }
//   fetchCharacters("character", page);
// });

// Fetching Data
async function fetchCharacters(slug, page) {
  cardContainer.innerHTML = "";
  const url = `https://rickandmortyapi.com/api/${slug}/?page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  maxPage = data.info.pages;

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
