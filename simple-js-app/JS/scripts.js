let pokemonRepository = (function () {
    let privatePokemonList = [
        { name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Posion'] },
        { name: 'Phyduck', height: 0.8, type: 'Water' },
        { name: 'Dragonite', height: 2.2, type: ['Dragon', 'Flying'] },
        { name: 'Onix', height: 8.8, type: ['Rock', 'Ground'] },
        { name: 'Gangar', height: 1.5, type: ['Ghost', 'Posion'] },
        { name: 'Pikachu', height: 0.4, type: 'Electric' }
    ]

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon &&
            "height" in pokemon &&
            "types" in pokemon) {
            privatePokemonList.push(pokemon);
        } else {
            console.log(`Pokemon is not valid!`);
        }
    }

    function getAll() {
        return privatePokemonList;
    }

    function addListItem(pokemon) {
        let ulPokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class')
        listPokemon.appendChild(button);
        ulPokemonList.appendChild(listPokemon);
    }

    function showDetails(pokemon){
        console.log(pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
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
// I create pokemonList variable to extract the information inside the IIFE

let pokemonList = pokemonRepository.getAll();


/*
=============================================================================
We are going to use the Loop with addListItem()
=============================================================================
pokemonList.forEach(function (pokemon) {
    if (pokemon.height >= 3.0) {
        document.write(`${pokemon.name} (height: ${pokemon.height}) - Wow, thats's big! <br>`)
    } else if (pokemon.height > 1.0 && pokemon.height < 3.0) {
        document.write(`${pokemon.name} (height: ${pokemon.height}) - Medium <br>`)
    } else {
        document.write(`${pokemon.name} (height: ${pokemon.height}) - Small <br>`)
    }
})
*/

pokemonList.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
})

/*  ==================================================================
       All this below was part of the loop, it was cut and put inside  "function addListItem()"
    ==================================================================

    let ulPokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class')
    listPokemon.appendChild(button);
    ulPokemonList.appendChild(listPokemon)
*/
