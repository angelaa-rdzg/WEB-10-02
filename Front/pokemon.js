const container = document.getElementById("pokemon-container");


fetch("https://pokeapi.co/api/v2/pokemon?limit=2000") 


// Despliegue de pokemons

// se obtienen los pokemon, la info se transforma a json
  .then(res => res.json())
  .then(data => {

    data.results.forEach(pokemon => {

      fetch(pokemon.url)

        .then(res => res.json())
        .then(info => {

          const types = info.types
            .map(t => t.type.name) // se usa map para obtener el nombre del tipo


          // se usa innerHTML para modificar el contenido del tag 
          container.innerHTML += `
            <div class="Task-tag">
              <h2>${info.name}</h2>  
              <img src="${info.sprites.front_default}">
              <p><strong>ID:</strong> ${info.id}</p>
              <p><strong>Tipo:</strong> ${types}</p>
            </div>
          `;

        });

    });

  })
  .catch(err => console.error(err)); 



  // Filtro
const searchInput = document.getElementById("buscar");

searchInput.addEventListener("input", function() {
  const searchTerm = this.value.toLowerCase();
  const pokemonTags = document.querySelectorAll(".Task-tag");

  pokemonTags.forEach(tag => {
    const name = tag.querySelector("h2").textContent.toLowerCase();
    const idText = tag.querySelector("p:nth-of-type(1)").textContent.toLowerCase();
    const typeText = tag.querySelector("p:nth-of-type(2)").textContent.toLowerCase();

  // si conciide se muestra, si no se oculta
  if (tag.textContent.toLowerCase().includes(searchTerm)) {
    tag.style.display = "block";
  } else {
    tag.style.display = "none";
  }
  });
});


