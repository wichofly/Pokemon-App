let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Posion']},
    { name: 'Phyduck', height: 0.8, type: 'Water'},
    { name: 'Dragonite', height: 2.2, type: ['Dragon', 'Flying']},
    { name: 'Onix', height: 8.8, type: ['Rock', 'Ground'] },
    { name: 'Gangar', height: 1.5, type: ['Ghost', 'Posion']},
    { name: 'Picachu', height: 0.4, type: 'Electric'}
];

// "lenght"= gives the number of items in the Array. until now are 6 items

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
