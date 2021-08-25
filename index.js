// Add your javascript here
(function(dom, launcher , _){
    var dom = pendo.dom
    var pokedex2 = document.getElementById('pendo-resource-center--pokedex');
    var launcherDiv = dom('.pendo-resource-center--container');
    /*
    var clickableCard = document.querySelector('.pendo-resource-center--card');
    */

    var fetchPokemon2 = () => {
        const promises = [];
        for (let i = 1; i <= 150; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then((res) => res.json()));
        }
        Promise.all(promises).then((allPokemon) => {
            const pokemon = allPokemon.map((result) => ({
                name: result.name,
                image: result.sprites['front_default'],
                type: result.types.map((type) => type.type.name).join(', '),
                id: result.id,
                move: result.moves.map((move) => move.move.name).join(', '),
            }));
            displayPokemon2(pokemon);
        });
    };

    var displayPokemon2 = (pokemon) => {
        const pokemonHTMLString = pokemon
            .map((poke) => 
            `
            <li data-pokeId="${poke.id}" class="pendo-resource-center--card">
                <h2 data-pokeId="${poke.id}" class="pendo-resource-center--card-title">#${poke.id}. ${poke.name} <span data-pokeId="${poke.id}"> <img data-pokeId="${poke.id}" class="pendo-resource-center--card-image" src="${poke.image}"/></span></h2>
                <div data-pokeId="${poke.id}" id="poke-details-${poke.id}" class="pendo-resource-center--details pendo-resource-center--collapsed">
                    <p data-pokeId="${poke.id}" class="pendo-resource-center--card-subtitle">Type: ${poke.type}</p>
                    <p data-pokeId="${poke.id}" class="pendo-resource-center--card-subtitle">Moves: ${poke.move}</p>
                <div>
            </li>
            `
            )
            .join('');
        pokedex2.innerHTML = pokemonHTMLString;
    };

    fetchPokemon2();

    launcherDiv.on('click', '.pendo-resource-center--card', function(e) {
        var pokeId = dom(eventTarget(e))[0].dataset.pokeId;
        togglePendoResourceCenterClass(pokeId)
    })

    function eventTarget(e) {
        return (e && e.target) || e.srcElement;
    }

    function togglePendoResourceCenterClass(id) {
        var pokeDetailId = document.getElementById(`poke-details-${id}`);
        pokeDetailId.classList.toggle("pendo-resource-center--collapsed");
    }

})(pendo.dom, pendo.BuildingBlocks.BuildingBlockResourceCenter, pendo._);
