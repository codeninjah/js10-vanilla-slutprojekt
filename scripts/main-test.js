console.log("It works!")

//------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------//
//-------------------------------- DOCUMENTATION IS HERE                --------------------------//
//-------------------------------- https://punkapi.com/documentation/v2 --------------------------//
//------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------//

//let beerId;
let id;

//-------------------- FETCHING API ---------------//
async function getRandomBeer(rndNr) {
    const req = await fetch ("https://api.punkapi.com/v2/beers/" + rndNr) 
    const res = await req.json()
    return res
};

//--------------------PRINT FUNCTIONEN -------------//
async function print() {
let randomNr = Math.floor(Math.random() * 1000);     // returns a random integer from 0 to 999

let result = await getRandomBeer(randomNr) // Anropar getRandomBeer functionen och skickar med ett randomNr som parameter

console.log(result) //JUST TO TEST

document.querySelector(".beer-pic").innerHTML = "<img src='" + result[0].image_url + "'/>"
document.querySelector(".beer-name").innerText = result[0].name

const binfo = document.querySelector("#beer-info")

binfo.innerHTML = "<p>" + result[0].description + "</p>"
binfo.innerHTML += "<p>Alcohol by volume: " + result[0].abv + "</p>"
binfo.innerHTML += "<p>Volume: " + result[0].volume.value + " " + result[0].volume.unit
binfo.innerHTML += "<p> Ingredients: " + Object.keys( result[0].ingredients) + "</p>"
//binfo.innerHTML += //Hops
//binfo.innerHTML += //Food pairing
binfo.innerHTML += "<p>Brewer tips: " + result[0].brewers_tips + "</p>"

binfo.classList.add("hidden")
}


//---------------------END FUNKTIONEN PRINT -------------------//


//-------------------- DEN FÖRÄNDRADE PRINT FUNCTIONEN -------------//

//more changes needed
async function printBeer(id) {
    //let randomNr = Math.floor(Math.random() * 1000);     // returns a random integer from 0 to 999
    
    let result = await getRandomBeer(id) // Anropar getRandomBeer functionen och skickar med ett randomNr som parameter
    
    //testing
    console.log("Do I get this right? " + id) //output does not contain id
    console.log("Resultat är: " + result) //output is [OBJECT OBJECT] 25 times
    
    document.querySelector(".beer-pic").innerHTML = "<img src='" + result[0].image_url + "'/>"
    document.querySelector(".beer-name").innerText = result[0].name

    //another test
    console.log("DO I GET THE NAME OF THE BEER? " + result[0].name)
    
    const binfo = document.querySelector("#beer-info")
    
    binfo.innerHTML = "<p>" + result[0].description + "</p>"
    binfo.innerHTML += "<p>Alcohol by volume: " + result[0].abv + "</p>"
    binfo.innerHTML += "<p>Volume: " + result[0].volume.value + " " + result[0].volume.unit
    binfo.innerHTML += "<p> Ingredients: " + Object.keys( result[0].ingredients) + "</p>"
    //binfo.innerHTML += //Hops
    //binfo.innerHTML += //Food pairing
    binfo.innerHTML += "<p>Brewer tips: " + result[0].brewers_tips + "</p>"
    
    binfo.classList.add("hidden")
    }


/*------------------------------------------------             ------------------------------------------*/
/* ----------------------------------------------- SEARCH PAGE ----------------------------------------- */
/*------------------------------------------------             ----------------------------------------- */

var searchInput = document.querySelector(".search-text"); //FRÅN SÖK TEXTRUTAN
var list = "";


let fetchBySearch = async function (userInput) { 
    let root = "https://api.punkapi.com/v2/beers?beer_name=" + userInput  + "&per_page=10"; // + "&per_page=10";

    console.log("Is root below viewable?")
    console.log(root)

    let request = await fetch(root)
    let result = await request.json();

    return result;
}


let createList = async function (userInput) {
    let fetchResult = await fetchBySearch(userInput);

    let searchMain = document.querySelector(".form-container");
    let ul = document.createElement("ul");
    searchMain.appendChild(ul);
    ul.classList.add("ul-form");


    if(userInput.length > 0) {
        for (let i = 0; i < fetchResult.length; i++) {
            let li = document.createElement("li");
            ul.appendChild(li)

            list = document.querySelectorAll(".ul-form li");
            list[i].classList.add("li-form");
    
            list[i].innerHTML = fetchResult[i].name;   
            //console.log("Namn för id är : " + fetchResult[i].name) 
            
            //FÖR ATT FÅ FRAM ID FÖR ÖLEN
            id = fetchResult[i].id
            console.log("Och id är : " + fetchResult[i].id) //id is right

            //return id
        }
    }


//makes the list clickable
for (let i = 0; i < list.length; i++) {
        list[i].addEventListener("click", function () {
            printBeer(list[i].id); //printBeer funktionen måste få förändringar
        })
    }
}

//removes the list
let hideList = function() {
    if(searchInput.value.length == 0) {       
        for(let i = 0; i < list.length; i++) {
            list[i].remove();
        }
    }
}

searchInput.addEventListener("keyup", function () {
    createList(searchInput.value);
    hideList();
})


