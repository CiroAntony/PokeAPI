const pokemonContainer = document.querySelector('.pokemon-container');

//spinner
const spinner = document.querySelector('#spinner');

//boton de previous/next
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let offset = 1;
let limit = 15;


previous.addEventListener("click", () => {
    if (offset != 1) {
        offset -= 16;
        removeChildNodes(pokemonContainer);
        filtrarPokemons(offset, limit);
    }
});

next.addEventListener("click", () => {
    offset += 16;
    removeChildNodes(pokemonContainer);
    filtrarPokemons(offset, limit);
});

// Primera funcion
const fetchPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data);

            //spinner de carga
            spinner.style.display = "none";
        })
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

// segunda funcion
const filtrarPokemons = async (offset, limit) => {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
        await fetchPokemon(i);
    }
}


// tercera funcion para crear cards donde guardar
// los datos de la API
function createPokemon(pokemon) {
    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.classList.add("sprite")
    sprite.src = pokemon.sprites.other.home.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = "N°: " + `${pokemon.id.toString().padStart(3, 0)}`; // añade ceros antes del id de los pokemon

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = "Nombre: " + pokemon.name;

    const type = document.createElement("p");
    type.classList.add("type");
    type.textContent = "Tipo: " + pokemon.types[0].type.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.appendChild(type);

    pokemonContainer.appendChild(card);
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

filtrarPokemons(offset, limit);
