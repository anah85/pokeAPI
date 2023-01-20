const myUl$$ = document.getElementById("pokedex");
const getCharacter = async () => {
const characters =[];
for(let i= 1; i< 151; i++){
const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
const res = await response.json();
characters.push(res);
    }
    return characters;
};

//map de los pokemons
const mapPokemon = (characters) =>{

return characters.map((poke) => ({
name: poke.name,
image: poke.sprites.front_default,
type: poke.types.map((type) => type.type.name).join(', '),
id: poke.id,
}));
}
//console.log(mapPokemon);
//pintar los pokemons
const drawPokemon = (characters) => {
myUl$$.innerHTML = "";
for(const poke of characters){
let pokeLi$$ =document.createElement("li");
pokeLi$$.className ="card";

let pokeName$$ = document.createElement("h1");
pokeName$$.className ="card-title";
pokeName$$.textContent = poke.name;

let pokeImage$$ = document.createElement("img");
pokeImage$$.className ="card-image";
pokeImage$$.setAttribute("src", poke.image);
pokeImage$$.setAttribute("alt", poke.name);

let pokeId$$ = document.createElement("p");
pokeId$$.textContent = poke.id;

let pokeType$$ = document.createElement("p");
pokeType$$.className ="card-subtitle";
pokeType$$.textContent = poke.type;

pokeLi$$.appendChild(pokeName$$);
pokeLi$$.appendChild(pokeId$$);
pokeLi$$.appendChild(pokeImage$$);
pokeLi$$.appendChild(pokeType$$);

myUl$$.appendChild(pokeLi$$);
}
};
const drawInput = (characters) => {
const input$$ = document.querySelector("input");
input$$.addEventListener("input", ()=>
searchCharacters(input$$.value, characters)
);
};

const searchCharacters = (filtro, array) => {
let filteredCharacters = array.filter((poke) =>
poke.name.toLowerCase().includes(filtro.toLowerCase())
);
drawCharacters(filteredCharacters);
};


const init = async () => {
const characters = await getCharacter();
const mappedPoke = mapPokemon(characters);
drawPokemon(mappedPoke);
drawInput(mappedPoke);
};
init();