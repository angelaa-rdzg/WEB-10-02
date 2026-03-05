const container = document.getElementById("pokemon-container");

// se hace el fecth de la pokeapi
fetch("https://pokeapi.co/api/v2/pokemon?limit=2000") // limite a 2000

// se obtienen los pokemon, la info se transforma a json
  .then(res => res.json())
  .then(data => {

    // se itera sobre cada pokemon, y se obtiene su info individual
    data.results.forEach(pokemon => {

      // se hace el fecth de la info
      fetch(pokemon.url)

      // se convierte a json
        .then(res => res.json())
        .then(info => {

          // se obtiene el tipo del pokemon, se mapea 
          const types = info.types
            .map(t => t.type.name) // se usa map para obtener el nombre del tipo


          // se agrega la info del pokemon al contenedor, se extrae y muestra el nombre, la imagen, el id y el tipo
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
  .catch(err => console.error(err)); // por si hay error se muestra en consola
