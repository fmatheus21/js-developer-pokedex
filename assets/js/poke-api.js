

const pokeApi = {};



function detailsPokemon(pokeDetail) {

  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  const abilities = pokeDetail.abilities.map((abilitiesName) => abilitiesName.ability.name);
  const [ability] = abilities;
  pokemon.abilities = abilities;
  pokemon.ability = ability;

  const stats = pokeDetail.stats.map((statValue) => statValue.base_stat);
  const [baseStat] = stats;
  pokemon.stats = stats;
  pokemon.baseStat = baseStat;

  const stat = pokeDetail.stats.map((statName) => statName.stat.name);
  const [nameStats] = stat;
  pokemon.stat = stat;
  pokemon.nameStats = nameStats;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(detailsPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};