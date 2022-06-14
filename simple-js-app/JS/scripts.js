let pokemonRepository = (function () {
    let privatePokemonList = [
        { name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Posion'] },
        { name: 'Phyduck', height: 0.8, type: 'Water' },
        { name: 'Dragonite', height: 2.2, type: ['Dragon', 'Flying'] },
        { name: 'Onix', height: 8.8, type: ['Rock', 'Ground'] },
        { name: 'Gangar', height: 1.5, type: ['Ghost', 'Posion'] },
        { name: 'Picachu', height: 0.4, type: 'Electric' }
    ]

    function add(pokemon){
        privatePokemonList.push(pokemon);
    }

    function getAll() {
        return privatePokemonList;
    }

    return {
        add: add,
        getAll: getAll,
    };
    
})();

// "lenght"= gives the number of items in the Array. until now are 6 items

/*
for (let i = 0; i < pokemonList.length; i++){
    if(pokemonList[i].height >= 3.0) {

        // An easier way to do it is String Template Literals, with back ticks (` `)
        // and do not forget the variable inside of ${}     
       document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big! <br>`)
    } else if(pokemonList[i].height > 1.0 && pokemonList[i].height < 3.0){
        document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) - Medium <br>`)
    } else {
        document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) - Small <br>`)
    }
}
*/

let pokemonList= pokemonRepository.getAll();


pokemonList.forEach(function (pokemon) {
    if (pokemon.height >= 3.0) {
        document.write(`${pokemon.name} (height: ${pokemon.height}) - Wow, thats's big! <br>`)
    } else if (pokemon.height > 1.0 && pokemon.height < 3.0) {
        document.write(`${pokemon.name} (height: ${pokemon.height}) - Medium <br>`)
    } else {
        document.write(`${pokemon.name} (height: ${pokemon.height}) - Small <br>`)
    }
})