const POKEMON_LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
const POKEMON_SEARCH_URL = "https://pokeapi.co/api/v2/pokemon/";
const $loadingListPlaceholder = document.querySelector(
  ".loading-list-placeholder"
);
const $form = document.querySelector("form");
const $errorPokemonCard = document.querySelector(".error-pokemon-card");
const $initialPokemonCard = document.querySelector(".initial-pokemon-card");
const $pokemonSearchButton = document.querySelector(".pokemon-search-button");
const $pokemonSearchInput = document.querySelector(".pokemon-search-input");
const $pokemonListContainer = document.querySelector(".pokemon-list-container");
const $pokemonPaginationContainer = document.querySelector(
  ".pokemon-pagination-container"
);
const $pokemonCardContainer = document.querySelector(".pokemon-card-container");
const $homepageButton = document.querySelector(".homepage-button");

function initialize(pokeApiURL) {
  return fetch(pokeApiURL)
    .then((response) => {
      if (!response.ok) return "Something went wrong, please try again later.";
      showElement($loadingListPlaceholder);
      return response.json();
    })
    .then((responseJSON) => {
      const {
        results: pokemonList,
        count: pokemonCount,
        next: nextURL,
        previous: previousURL,
      } = responseJSON;
      console.log(responseJSON);
      showPagination(pokemonCount, nextURL, previousURL);
      hideElement($loadingListPlaceholder);
      return showPokemonList(pokemonList);
    })
    .catch((error) => console.error(error));
}

function showPagination(count, next, previous) {
  const POKEMON_PER_PAGE = 20;
  const totalPages = Math.ceil(count / POKEMON_PER_PAGE);
  const $pokemonPagination = document.querySelector(".pokemon-pagination");

  if (previous) {
    const $previous = document.createElement("li");
    const $previousLink = document.createElement("a");
    $previous.className = "page-item";
    $previousLink.className = "page-link";
    $previousLink.textContent = "Previous";
    $previous.appendChild($previousLink);
    $pokemonPagination.appendChild($previous);
  }

  for (let i = 0; i < totalPages; i++) {
    const pageNumber = 1 + i;
    const $page = document.createElement("li");
    const $pageLink = document.createElement("a");
    $page.className = "page-item";
    $pageLink.className = "page-link";
    $page.appendChild($pageLink);
    $pageLink.textContent = pageNumber;
    $pageLink.dataset.page = pageNumber;
    $pokemonPagination.appendChild($page);
  }

  if (next) {
    const $next = document.createElement("li");
    const $nextLink = document.createElement("a");
    $next.className = "page-item";
    $nextLink.className = "page-link";
    $nextLink.textContent = "Next";
    $next.appendChild($nextLink);
    $pokemonPagination.appendChild($next);
  }
}

function showPokemonList(pokemon) {
  const $pokemonList = document.querySelector(".pokemon-list");
  pokemon.forEach((pokemon) => {
    const $li = document.createElement("li");
    $li.classList.add("list-group-item");
    $li.textContent = `${capitalizeFirstLetter(pokemon.name)}`;
    $li.addEventListener("click", () => {
      removeActiveAnimationClass();
      addActiveAnimationClass($li);
      deletePreviousPokemonCards();
      loadSinglePokemon(`${POKEMON_SEARCH_URL}${pokemon.name}`);
    });
    return $pokemonList.appendChild($li);
  });
}

function loadSinglePokemon(pokemonURL) {
  return fetch(pokemonURL)
    .then((api_response) => {
      if (!api_response.ok)
        return "Something went wrong, please try again later.";
      return api_response.json();
    })
    .then((pokemonInfo) => {
      hideElement($initialPokemonCard);
      return createPokemonCard(pokemonInfo);
    })
    .catch((error) => console.error(error));
}

function createPokemonCard(pokemon) {
  const {
    height: height,
    weight: weight,
    name: name,
    types: types,
    id: id,
    sprites: { front_default: image },
    abilities: abilities,
  } = pokemon;
  const $pokemonCard = document.createElement("div");
  $pokemonCard.classList.add("pokemon-card");
  const $pokemonCardBody = document.createElement("div");
  $pokemonCardBody.classList.add("card-body");
  const $pokemonDescription = document.createElement("ul");
  $pokemonDescription.classList.add("pokemon-description");
  $pokemonDescription.appendChild(showPokemonNumber(id));
  $pokemonDescription.appendChild(
    showPokemonType(types.map((types) => types.type.name))
  );
  $pokemonDescription.appendChild(
    showPokemonAbilities(abilities.map((abilities) => abilities.ability.name))
  );
  $pokemonDescription.appendChild(showPokemonWeight(weight));
  $pokemonDescription.appendChild(showPokemonHeight(height));
  $pokemonCardBody.appendChild(showPokemonName(name));
  $pokemonCardBody.appendChild($pokemonDescription);
  $pokemonCard.appendChild(showPokemonImage(image, name));
  $pokemonCard.appendChild($pokemonCardBody);

  return $pokemonCardContainer.appendChild($pokemonCard);
}

function showPokemonImage(image, name) {
  const $image = document.createElement("img");
  $image.classList.add("card-img-top", "pokemon-card-image");
  $image.src = image;
  $image.alt = `An image depicting the front part of Pokemon ${capitalizeFirstLetter(
    name
  )}`;
  return $image;
}

function showPokemonName(name) {
  const $h5 = document.createElement("h5");
  $h5.classList.add("pokemon-name");
  $h5.textContent = `${capitalizeFirstLetter(name)}`;
  return $h5;
}

function showPokemonNumber(id) {
  const $li = document.createElement("li");
  $li.textContent = `Number: ${id}`;
  return $li;
}

function showPokemonType(types) {
  const $li = document.createElement("li");
  const newArray = [];
  types.forEach((type) => {
    newArray.push(capitalizeFirstLetter(type));
  });
  $li.textContent = `Type: ${newArray.join(" - ")}`;
  return $li;
}

function showPokemonAbilities(abilities) {
  const $li = document.createElement("li");
  let newArray = [];
  abilities.forEach((ability) => {
    newArray.push(capitalizeFirstLetter(ability));
  });
  $li.textContent = `Abilities: ${newArray.join(", ")}`;
  return $li;
}

function showPokemonWeight(weight) {
  const $li = document.createElement("li");
  $li.textContent = `Weight: ${weight}`;
  return $li;
}

function showPokemonHeight(height) {
  const $li = document.createElement("li");
  $li.textContent = `Height: ${height}`;
  return $li;
}

function capitalizeFirstLetter(string) {
  const newString = string.charAt(0).toUpperCase() + string.slice(1);
  return newString;
}

$pokemonSearchButton.addEventListener("click", (event) => {
  hideElement($initialPokemonCard);
  hideElement($pokemonListContainer);
  hideElement($pokemonPaginationContainer);
  validateForm();
  event.preventDefault();
});

function validateForm(event) {
  let pokemonName = $pokemonSearchInput.value.toLowerCase();

  const errors = {
    "search-bar-input": validateSearchBar(pokemonName),
  };

  const success = handleErrors(errors) === 0;

  if (success) {
    deletePreviousPokemonCards();
    showElement($homepageButton);
    loadSearchBarPokemon(`${POKEMON_SEARCH_URL}${pokemonName}`);
  }
}

function validateSearchBar(pokemon) {
  const regEx = /^[a-z]+$/i;
  const regEx2 = /^[a-z]+-[a-z]+$/i;
  const regEx3 = /^[a-z]+-[a-z]+-[a-z]+$/i;

  if (!regEx.test(pokemon)) {
    if (!regEx2.test(pokemon)) {
      if (!regEx3.test(pokemon)) {
        return "The Pokemon name has invalid characters.";
      }
    }
  }
  if (pokemon.length >= 30) return "The Pokemon name is too long.";

  return "";
}

function handleErrors(errors) {
  const error = errors;
  const keys = Object.keys(errors);
  let errorQuantity = 0;

  keys.forEach(function (key) {
    if (error[key]) {
      $form[key].classList.add("error");
      $form[key].value = "";

      const $errorDescription = document.querySelector(".error-description");
      $errorDescription.textContent = error[key];
      deletePreviousPokemonCards();
      showElement($homepageButton);
      showElement($errorPokemonCard);
      errorQuantity++;
    } else {
      $form[key].classList.remove("error");
      hideElement($errorPokemonCard);
    }
  });
  return errorQuantity;
}

function loadSearchBarPokemon(pokemonSearchURL) {
  return fetch(pokemonSearchURL)
    .then((api_response) => {
      if (!api_response.ok)
        return "Something went wrong, please try again later.";
      return api_response.json();
    })
    .then((api_responseJSON) => {
      return createPokemonCard(api_responseJSON);
    })
    .catch((error) => {
      console.error(error);
      return createCatchCardError();
    });
}

function createCatchCardError() {
  $pokemonSearchInput.value = "";
  $pokemonSearchInput.classList.add("error");
  showElement($errorPokemonCard);
  const $errorDescription = document.querySelector(".error-description");
  $errorDescription.textContent = "That Pokemon doesn't exist. Try again.";
}

$homepageButton.addEventListener("click", (event) => {
  deletePreviousPokemonCards();
  $pokemonSearchInput.classList.remove("error");
  removeActiveAnimationClass();
  hideElement($homepageButton);
  hideElement($errorPokemonCard);
  showElement($pokemonListContainer);
  showElement($pokemonPaginationContainer);
  showElement($initialPokemonCard);
});

function deletePreviousPokemonCards() {
  const $pokemonCards = document.querySelectorAll(".pokemon-card");
  $pokemonCards.forEach((card) => {
    card.remove();
  });
}

function removeActiveAnimationClass() {
  const $element = document.querySelector(".list-group-item.active-list-item");
  if ($element === null) return;
  return $element.classList.remove("active-list-item");
}

function addActiveAnimationClass(element) {
  return element.classList.add("active-list-item");
}

function hideElement(element) {
  element.classList.add("hidden");
}

function showElement(element) {
  element.classList.remove("hidden");
}

initialize(POKEMON_LIST_URL);
