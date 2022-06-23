let pokemonRepository = (function () {
    let privatePokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
            privatePokemonList.push(pokemon);
        } else {
            console.log(`Pokemon is not valid!`);
        }
    };

    function getAll() {
        return privatePokemonList;
    };

    function addListItem(pokemon) {
        let ulPokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class'); // Refers to the CSS class
        listPokemon.appendChild(button);
        ulPokemonList.appendChild(listPokemon);
        eventListener(button, pokemon);
    };

    /* Adding img 
    let container = document.querySelector('#container');
    let newImage = document.createElement('img');
    let newAshImg = document.createElement('img');
    newImage.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
    newAshImg.src = 'img/ash.png';
    container.appendChild(newImage)
    container.appendChild(newAshImg)
    */

    function eventListener(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
    };

    let container = document.querySelector('#container');
    let loadingMessage = document.createElement('div');
    container.append(loadingMessage)

    function showLoadingMessage() {
        loadingMessage.innerText = 'A couple of seconds please..';
        console.log('A couple of seconds pelase....');
    }

    function hideLoadingMessage() {
        loadingMessage.remove();
        console.log('All good, thanks for waiting!')
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) { // Allows me to get, or “fetch,” data asynchronously from external data sources. ".then()" is expecting a promise that in this case is the 'apiUrl' the code within is executed If the code in the promise is successfully completed.
            return response.json();                     // the response will be converted to a json. it will return a promise object.
        }).then(function (json) {                       // the second .then() statement will contain the callback function for this second promise.  when working with promises, is called “Promise Chaining.” this means that pokemonList will contain an array of JSON objects, each representing a single Pokémon.
            hideLoadingMessage();
            json.results.forEach(function (item) {  // The result of json, we are going to run it a forEach loop that presents all data from APi
                let pokemon = {
                    name: item.name.toUpperCase(),                // I am asking for each item the name 
                    detailsUrl: item.url            // I am asking for each item the detailsUrl (I use "detailsUrl" property to load the detailed data for given pokemon)
                };
                add(pokemon);                       // once the loop is run, i said add pokemon (the first function in pokemonRepository)
            });
        }).catch(function (e) {                     // If there is an error after push the pokemon(object), is gonna be caught right here 
            hideLoadingMessage();
            console.error(e);
        })
    }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            hideLoadingMessage();
            // Now we add the details to the item
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            let types = [];
			details.types.forEach((item) => types.push(item.type.name));
			item.types = types;
            item.weight = details.weight;
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }
    
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            //console.log(pokemon);
            showModal(pokemon);
        });
    };

    let modalContainer = document.querySelector('#modal-container');

    function showModal(pokemon) {
        modalContainer.innerHTML = ''; // Clear all existing modal content
        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close'); // this class exists in the CSS file.
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let pokemonImg = document.createElement('img');
        pokemonImg.src = pokemon.imageUrl;

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name.toUpperCase();

        let heightElement = document.createElement('p');
        heightElement.innerText = `Height: ${pokemon.height}`;
                                    
        let weightElement = document.createElement('p');
        weightElement.innerText = `Weight: ${pokemon.weight}`;

        let typesElement = document.createElement('p');
		typesElement.innerText = `Types: ${pokemon.types}`;
                                    
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(pokemonImg);
        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        modal.appendChild(typesElement);
        modalContainer.appendChild(modal); // modalContainer is the father of modal, modal has 3 childs who are button, title and content.

        modalContainer.classList.add('is-visible');
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal(pokemon);
    });

    let dialogPromiseReject; // This can be set later, by showDialog

    function hideModal() {
        modalContainer.classList.remove('is-visible');

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    function showDialog(pokemon) {
        showModal(pokemon);

        // We want to add a confirm and cancel button to the modal
        let modal = modalContainer.querySelector('.modal');

        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';

        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';

        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        // We want to focus the confirmButton so that the user can simply press Enter
        confirmButton.focus();
        return new Promise((resolve, reject) => {
            cancelButton.addEventListener('click', hideModal);
            confirmButton.addEventListener('click', () => {
                dialogPromiseReject = null; // Reset this
                hideModal();
                resolve();
            });

            // This can be used to reject from other functions
            dialogPromiseReject = reject;
        });
    }

    document.querySelector('#show-dialog').addEventListener('click', () => {
        showDialog('Confirm action', 'Are you sure you want to do this?').then(function () {
            alert('confirmed!');
        }, () => {
            alert('not confirmed');
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();

// I create pokemonList variable to extract the information inside the IIFE
let pokemonList = pokemonRepository.getAll();

pokemonRepository.loadList().then(function () {
    pokemonList.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


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


/*
=============================================================================
We are going to use the Loop with addListItem(), is not more needed this Loop
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
