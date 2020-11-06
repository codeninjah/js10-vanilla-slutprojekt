console.log("It works!")
//test

/*
if(document.querySelector(".beer-pic").innerText.length == 0) {
    document.querySelector(".beer-card").classList.add(".hidden")
}
*/

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

//document.querySelector(".beer-card").classList.remove(".hidden")

document.querySelector(".beer-pic").innerHTML = ""

document.querySelector(".beer-pic").innerHTML = "<img src='" + result[0].image_url + "'/>"
document.querySelector(".beer-name").innerText = result[0].name

}


// VILL DU LADDA IN EN RANDOM BEER, ANVÄND BORTKOMMENTERADE FUNKTIONSANROPET NEDAN
//print()



const randomiseBtn = document.querySelector(".random-beer-btn")
randomiseBtn.addEventListener("click", function(){
    print()
});


