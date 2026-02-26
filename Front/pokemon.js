
const evoluciones = [
  { name: "vaporeon", img: "poke1", text: "name1" }, 
  { name: "jolteon",  img: "poke2", text: "name2" }, 
  { name: "flareon",  img: "poke3", text: "name3" }, 
  { name: "espeon",   img: "poke4", text: "name4" }, 
  { name: "umbreon",  img: "poke5", text: "name5" }, 
  { name: "leafeon",  img: "poke6", text: "name6" }, 
  { name: "glaceon",  img: "poke7", text: "name7" }, 
  { name: "sylveon",  img: "poke8", text: "name8" }  
];

evoluciones.forEach(pokemon => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById(pokemon.img).src = data.sprites.front_default;
      document.getElementById(pokemon.text).textContent = data.name;
    })
    .catch(err => console.error(err));
});
