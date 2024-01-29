let url = "https://pokeapi.co/api/v2/pokemon";

function onPress(inputName) {
  $.get(url, function (data, status) {
    if (status === "success") {
      url = data.next;
      displayPokemonList(data);
    } else {
      console.log("Status was: " + status);
    }
  });
}

async function displayPokemonList(data) {
  const pokemonList = data.results;
  let pokemonListWithImages = await retrievePokemonImages(pokemonList);

  buildHTML(pokemonListWithImages);
}

async function retrievePokemonImages(pokemonList) {
  let pokemonListWithImages = [];
  for (pokemon of pokemonList) {
    const pokemonReference = { name: pokemon.name, image: "" };
    await $.get(pokemon.url, (data, status) => {
      if (status === "success") {
        const pokemonImagUrl =
          data.sprites.versions["generation-v"]["black-white"].animated
            .front_default;
        pokemonReference.image = pokemonImagUrl;
        pokemonListWithImages.push(pokemonReference);
        console.log(pokemonReference);
      } else {
        console.log("Failed to retrieve image for ", pokemon.name);
      }
    });
  }
  return pokemonListWithImages;
}

function buildHTML(pokemonList) {
  const pokemonHtmlList = pokemonList.map((pokemon) => {
    const pokemonContainer = document.createElement("div");
    pokemonContainer.setAttribute(
      "style",
      "width: 250px; display: inline-block;" +
        "margin: 5px; background-color: cornflowerblue; border-radius: 30px;"
    );
    const titleButton = buildButtonTag(pokemon);
    pokemonContainer.append(titleButton);

    const image = buildImageTag(pokemon);
    pokemonContainer.append(image);

    return pokemonContainer;
  });
  $("#displayedText").html(pokemonHtmlList);
}

function buildButtonTag(pokemon) {
  const titleButton = document.createElement("button");
  titleButton.setAttribute("onclick", () => {});
  titleButton.innerHTML = pokemon.name;
  return titleButton;
}

function buildImageTag(pokemon) {
  const image = document.createElement("img");
  image.setAttribute("src", pokemon.image);
  image.setAttribute("style", "width: 100px; height: 100px;");
  return image;
}
