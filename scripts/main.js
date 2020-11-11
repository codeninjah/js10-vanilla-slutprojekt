console.log("It works!");

///----------------Testar att implementera search---------------//

//-------------------- FETCHING API ---------------//
async function getRandomBeer(rndNr) {
  let req = await fetch("https://api.punkapi.com/v2/beers/" + rndNr);
  let res = await req.json();
  return res;
}

//--------------------PRINT FUNCTIONEN -------------//

async function print() {
  let randomNr = Math.floor(Math.random() * 100); // returns a random integer from 0 to 99

  let result = await getRandomBeer(randomNr); // Anropar getRandomBeer functionen och skickar med ett randomNr som parameter

  console.log(result); //JUST TO TEST

  document.querySelector(".beer-pic").innerHTML =
    "<img src='" + result[0].image_url + "'/>";
  document.querySelector(".beer-name").innerText = result[0].name;

  const binfo = document.querySelector("#beer-info");

  binfo.innerHTML = "<p>" + result[0].description + "</p>";
  binfo.innerHTML += "<p>Alcohol by volume: " + result[0].abv + "</p>";
  binfo.innerHTML +=
    "<p>Volume: " + result[0].volume.value + " " + result[0].volume.unit;
  binfo.innerHTML +=
    "<p> Ingredients: " + Object.keys(result[0].ingredients) + "</p>";
  binfo.innerHTML +=
    "<p>Hops: " +
    Object.getOwnPropertyDescriptor(result[0].ingredients.hops[0].name[0]) +
    "</p>";
  //binfo.innerHTML += //Food pairing
  binfo.innerHTML += "<p>Brewer tips: " + result[0].brewers_tips + "</p>";

  binfo.classList.add("hidden");

  //test

  //---------------------END FUNKTIONEN PRINT -------------------//

  // VILL DU LADDA IN EN RANDOM BEER, ANVÄND BORTKOMMENTERADE FUNKTIONSANROPET NEDAN
  //print()

  const randomiseBtn = document.querySelector(".random-beer-btn");
  randomiseBtn.addEventListener("click", function () {
    print();
  });

  //------------------ EXEMPEL PÅ HUR DESCRIPTION SKULLE KUNNA FUNKA ----------//
  const bInfo = document.querySelector(".info");
  const bInfoText = document.querySelector("#beer-info");

  bInfo.addEventListener("click", function () {
    bInfoText.classList.remove("hidden");
  });
}




//------------------------Search functionen som inte fungerar-------radera hela skiten eller fixa?



const loadBeers = async () => {
   
  let url = 'https://api.punkapi.com/v2/beers/';

  fetch(url)
  .then(res => res.json())
  .then((out) => {
    
    for (i = 0; i < out.length; i++)
    {
    
      console.log(out[i]["id"])
      
      console.log(out[i].id);
    
      console.log(out[i]["image_url"])
      
      console.log(out[i].image_url);
  
    }
    
  })
  .catch(err => { throw err });

};
const beerList = document.getElementById('beerList');
const searchBar = document.getElementById('searchBar');
let res = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredBeers = res.filter((beer) => {
        return (
            beer.result[0].description.toLowerCase().includes(searchString) ||
            beer.result[0].image_url.includes(searchString)
        );
    });
    displayBeers(filteredBeers);
});

const displayBeers = (res) => {

    const htmlString = res
        .map((beer) => {
            return `
            <li class="beer">
                <h2>${beer.result.name}</h2>
                
                <img src="${result[0].image_url}"></img>
            </li>
        `;
        })
        .join('');
    beerList.innerHTML = htmlString;
};

loadBeers();






