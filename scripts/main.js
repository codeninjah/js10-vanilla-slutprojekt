console.log("It works!")
//test


//-------------------- FETCHING API ---------------//

async function getRandomBeer(rndNr) {
    const req = await fetch ("https://api.punkapi.com/v2/beers/" + rndNr) 
    const res = await req.json()
    return res
};

async function print() {
let randomNr = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99 

let result = await getRandomBeer(randomNr) // Anropar getRandomBeer functionen och skickar med ett randomNr som parameter


console.log(result) //JUST TO TEST
document.querySelector(".output").innerText = result[0].name
}


const randomiseBtn = document.querySelector(".random-beer-btn")
randomiseBtn.addEventListener("click", function(){
    print()
});


