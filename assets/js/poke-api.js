
const pokeApi = {} /* objeto */

/* Essa função serve para enxutar o código da lista li no main */
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    /* Convertento o typeSlot pra type.name */
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    /* [type] é o primeiro type do array */

    pokemon.types = types
    pokemon.type = type

    /* pokeDetail.sprites.other.dream_world.front_default é o local onde tem as informações de cada foto */
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

/* 
-> Função para fazer a requisição;
-> Requisição para o pokemon no servidor;
-> Converter a lista que está em string para json;
-> E transformar a lista do detalhe.
*/
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

/* Método */
/* 
-> Função para fazer a requisição;
-> Requisição para o pokemon no servidor;
-> Buscando a lista (return url);
-> Converter a lista que está em string para uma lista em json;
-> Converte a lista de json para os resultados do pokemon que é o que importa;
-> Converte a lista de pokemon para uma lista de requisições do detalhe dos pokemons (código acima);
-> E transformar a lista em busca do detalhe;
-> Requisição dos detalhes da lista esperando todos terminarem (promise.all)
-> Retorna a uma lista de detalhes em json dos pokemons para que a lista li (objeto convertPokemonToLi) possa obter mais detalhes do pokemon.
*/
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}