let abiltyArray =[];
let moveArray =[];

// initial API loading

async function getdata(){
    try{
        const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
        const initial_details = await data.json();
        initial_details.results.forEach(function(pokemon){
        fetchPokemonData(pokemon);
    });
    }
    catch(err){
        window.alert("Details not loaded")
    }
}

  
// getting Pokeomon data
async function fetchPokemonData(pokemon){
    let urlofPoke = pokemon.url;
    const data2 = await fetch(urlofPoke);
    const details = await data2.json();
    details.abilities.forEach(function(abi){
        fetchability(abi)   
    });
    details.moves.forEach(function(mov){
        fetchMove(mov);
    });
    const all_con = document.createElement("div");
    all_con.setAttribute("class","all-container");
    document.body.append(all_con);
    const i_n_container = document.createElement("div");
    i_n_container.setAttribute("class", "img-name-container");
    i_n_container.innerHTML=`
    <div class="image-con">
        <img class="img" src=${details.sprites.other.dream_world.front_default} />
    </div>
    <div class="detailcont">
        <h1 class="heading" id="name">${details.name}</h1>
        <h1 class="weight">Weight:${details.weight}</h1>
    </div>`
    all_con.append(i_n_container);
    const a_m_cont = document.createElement("div");
    a_m_cont.setAttribute("class","a-m-container");
    all_con.append(a_m_cont);
    const abi_cont = document.createElement("div");
    abi_cont.setAttribute("class","ability-container");
    a_m_cont.append(abi_cont);
    const abi_list = document.createElement("ul")
    const abi_head = document.createElement("h1");
    abi_head.innerText="Abilities";
    abi_cont.append(abi_head)
    for(let i=0;i<abiltyArray.length;i++){
        const abi_item = document.createElement("li");
        abi_item.innerText=abiltyArray[i];
        abi_list.append(abi_item);
    }
    abi_cont.append(abi_list);
    const mov_cont = document.createElement("div");
    mov_cont.setAttribute("class","move-container");
    a_m_cont.append(mov_cont);
    const mov_list = document.createElement("ul");
    const mov_head = document.createElement("h1");
    mov_head.innerText="Moves";
    mov_cont.append(mov_head);
    for(let i=0;i<moveArray.length;i++){
        const mov_item = document.createElement("li");
        mov_item.innerText=moveArray[i];
        mov_list.append(mov_item);
    }
    mov_cont.append(mov_list);
}  
  // Fetching abilities of Pokemon
function fetchability(abi){
    abiltyArray.push(abi.ability.name)
}
  // Fetching Moves of Pokemon
function fetchMove(mov){
    // console.log(mov.move.name);
    moveArray.push(mov.move.name)
}
getdata();