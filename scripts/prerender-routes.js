(async()=>{
  const TOTAL_POKEMONS = 10;
  const TOTAL_POKEMON_PAGES = 5;

  const fs = require('fs');

  const pokemonIds = Array.from({length: TOTAL_POKEMONS}, (_, i)=> i + 1);
  const pokemonPages = Array.from({length: TOTAL_POKEMON_PAGES}, (_, i)=> i + 1);

  let fileContent = pokemonIds
  .map(
    id => `/pokemons/${id}`
  )
  .join('\n');

  fileContent += '\n';

  fileContent += pokemonPages.map(
    id => `/pokemons/pages/${id}`
  ).join('\n');

  fs.writeFileSync('routes.txt', fileContent);
  console.log('Route generates')

})();
