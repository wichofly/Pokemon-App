let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Posion']},
    { name: 'Phyduck', height: 0.8, type: 'Water'},
    { name: 'Dragonite', height: 2.2, type: ['Dragon', 'Flying']},
    { name: 'Onix', height: 8.8, type: ['Rock', 'Ground'] },
    { name: 'Gangar', height: 1.5, type: ['Ghost', 'Posion']},
    { name: 'Picachu', height: 1.0, type: 'Electric'}
];

for (let i = 0; i < pokemonList.length; i++){
    if(pokemonList[i].height > 1.0 && pokemonList[i].height < 2.5){
        document.write(pokemonList[i].name + ` Average pokemon ` + '<br>')
    } else if( pokemonList[i].height <= 1.0){
        document.write(pokemonList[i].name + ` Small pokemon `+ '<br>')
    } else {
        document.write(pokemonList[i].name + ` Big pokemon `+ '<br>')
    }
    if(pokemonList[i].height > 5.0) {
       document.write(pokemonList[i].name + ` Wow, that's big! `+ '<br>')
   }
}



