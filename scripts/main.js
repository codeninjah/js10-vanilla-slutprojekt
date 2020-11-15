console.log("It works!")

//-------------------- FETCHING API ---------------//
async function getRandomBeer(rndNr) {
    const req = await fetch ("https://api.punkapi.com/v2/beers/" + rndNr) 
    const res = await req.json()
    return res
};

//--------------------PRINT FUNCTIONEN -------------//
async function print() {
let randomNr = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99

let result = await getRandomBeer(randomNr) // Anropar getRandomBeer functionen och skickar med ett randomNr som parameter

console.log(result) //JUST TO TEST

document.querySelector(".beer-pic").innerHTML = "<img src='" + result[0].image_url + "'/>"
document.querySelector(".beer-name").innerText = result[0].name

const binfo = document.querySelector("#beer-info")

binfo.innerHTML = "<p>" + result[0].description + "</p>"
binfo.innerHTML += "<p>Alcohol by volume: " + result[0].abv + "</p>"
binfo.innerHTML += "<p>Volume: " + result[0].volume.value + " " + result[0].volume.unit
binfo.innerHTML += "<p> Ingredients: " + Object.keys(result[0].ingredients) + "</p>"
binfo.innerHTML += "<p> Hops: " + (result[0].ingredients.hops[0].name) + "</p>"
binfo.innerHTML += "<p>Food Pairing: " + result[0].food_pairing[0] + "</p>"
binfo.innerHTML += "<p>Brewer tips: " + result[0].brewers_tips + "</p>"

binfo.classList.add("hidden")
}


//---------------------END FUNKTIONEN PRINT -------------------//


// VILL DU LADDA IN EN RANDOM BEER, ANVÄND BORTKOMMENTERADE FUNKTIONSANROPET NEDAN
//print()


const randomiseBtn = document.querySelector(".random-beer-btn")
randomiseBtn.addEventListener("click", function(){
    print()
});


//------------------ EXEMPEL PÅ HUR DESCRIPTION SKULLE KUNNA FUNKA ----------//

const bInfo = document.querySelector(".info")
const bInfoText = document.querySelector("#beer-info")

bInfo.addEventListener("click", function(){
    bInfoText.classList.remove("hidden")
});