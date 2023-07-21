const searchButton = document.getElementById("btnPokemon");
const pokemonInput = document.getElementById("pokemon");
const imageContainer = document.querySelector(".image-container");
const nameContainer = document.querySelector(".name-container");
const numberContainer = document.querySelector(".number-container");
const typesContainer = document.querySelector(".types-container");
const abilitiesContainer = document.querySelector(".abilities-container");
const statsContainer = document.querySelector(".stats-container");
const statsActive = document.querySelector(".base-stats");

searchButton.addEventListener("click", handleClick);

async function handleClick(event) {
  event.preventDefault();
  const pokemon = pokemonInput.value.toLowerCase();
  const pokemonData = await fetchPokemon(pokemon);
  if (pokemonData) {
    clearContainers();
    displayPokemonInfo(pokemonData);
    statsActive.classList.add("active");
    pokemonInput.value = "";
  }
}

async function fetchPokemon(pokemon) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    const data = await response.json();

    const pokemonImage = data.sprites.front_default;
    const pokemonName = data.forms.map((index) => index.name);
    const pokemonNumber = data.id;
    const pokemonTypes = data.types.map((index) => index.type.name);
    const pokemonAbilities = data.abilities.map((index) => index.ability.name);
    const pokemonStats = data.stats.map((index) => index.base_stat);
    const pokemonStatsName = data.stats.map((index) => index.stat.name);

    return {
      pokemonImage,
      pokemonName,
      pokemonNumber,
      pokemonTypes,
      pokemonAbilities,
      pokemonStats,
      pokemonStatsName,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

function clearContainers() {
  imageContainer.innerHTML = "";
  nameContainer.innerHTML = "";
  numberContainer.innerHTML = "";
  typesContainer.innerHTML = "";
  abilitiesContainer.innerHTML = "";
  statsContainer.innerHTML = "";
}

function displayPokemonInfo(pokemonData) {
  const imageDiv = document.createElement("img");
  imageDiv.className = "pokemon-image";
  imageDiv.src = pokemonData.pokemonImage;
  imageContainer.appendChild(imageDiv);

  const nameDiv = document.createElement("div");
  nameDiv.className = "name";
  nameDiv.textContent = `${pokemonData.pokemonName}`;
  nameContainer.appendChild(nameDiv);

  const numberDiv = document.createElement("div");
  numberDiv.className = "number";
  numberDiv.textContent = `${pokemonData.pokemonNumber}`;
  nameContainer.appendChild(numberDiv);

  const pokemonTypes = pokemonData.pokemonTypes;
  pokemonTypes.forEach((type) => {
    const typeDiv = document.createElement("div");
    typeDiv.className = type;
    typeDiv.textContent = type;
    typesContainer.appendChild(typeDiv);
  });

  const pokemonAbilities = pokemonData.pokemonAbilities;
  pokemonAbilities.forEach((ability) => {
    const abilityDiv = document.createElement("div");
    abilityDiv.className = "ability";
    abilityDiv.textContent = ability;
    abilitiesContainer.appendChild(abilityDiv);
  });

  const pokemonStats = pokemonData.pokemonStats;
  const pokemonStatsName = pokemonData.pokemonStatsName;

  pokemonStats.forEach((stat, index) => {
    const statsDiv = document.createElement("div");
    const statsNameDiv = document.createElement("div");
    const statsValueDiv = document.createElement("div");
    statsDiv.className = "stats";
    statsNameDiv.className = "stats-name";
    statsValueDiv.className = "stats-value";
    statsNameDiv.textContent = pokemonStatsName[index];
    statsValueDiv.textContent = stat;
    statsContainer.appendChild(statsDiv);
    statsDiv.appendChild(statsNameDiv);
    statsDiv.appendChild(statsValueDiv);
  });
}
