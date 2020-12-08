//------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------//
//-------------------------------- DOCUMENTATION IS HERE                --------------------------//
//-------------------------------- https://punkapi.com/documentation/v2 --------------------------//
//------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------//
// FOR RANDOM
// https://api.punkapi.com/v2/beers/random 


//-------------------- FETCHING API ---------------//
async function getBeer(beerNr) {
    const req = await fetch ("https://api.punkapi.com/v2/beers/" + beerNr) 
    const res = await req.json()
    return res
};

//--------------------PRINT FUNCTIONEN -------------//
async function printRnd() {

const req = await fetch ("https://api.punkapi.com/v2/beers/random ")
const result = await req.json()

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

//-------------------- DEN FÖRÄNDRADE PRINT FUNCTIONEN -------------//

async function printBeer(id) {    
    let result = await getBeer(id) 

    document.querySelector(".beer-pic").innerHTML = "<img src='" + result[0].image_url + "'/>"
    document.querySelector(".beer-name").innerText = result[0].name
    
    const binfo = document.querySelector(".beer-info")
    
    binfo.innerHTML = "<p>" + result[0].description + "</p>"
    binfo.innerHTML += "<p>Alcohol by volume: " + result[0].abv + "</p>"
    binfo.innerHTML += "<p>Volume: " + result[0].volume.value + " " + result[0].volume.unit
    binfo.innerHTML += "<p> Ingredients: " + Object.keys( result[0].ingredients) + "</p>"
    binfo.innerHTML += "<p> Hops: " + (result[0].ingredients.hops[0].name) + "</p>"
    binfo.innerHTML += "<p>Food Pairing: " + result[0].food_pairing[0] + "</p>"
    binfo.innerHTML += "<p>Brewer tips: " + result[0].brewers_tips + "</p>"
    }

/* -------------------------------------------------------------------------------------------------------*/
/* ------------------------------------------------             ------------------------------------------*/
/* ----------------------------------------------- SEARCH PAGE ----------------------------------------- */
/* ------------------------------------------------             ----------------------------------------- */
/* ------------------------------------------------------------------------------------------------------ */

var searchInput = document.querySelector(".search-text"); //FRÅN SÖK TEXTRUTAN
let pageCounter = 1
var list = "";


let fetchBySearch = async function (userInput, pageCounter) { 
    let beer = "https://api.punkapi.com/v2/beers?beer_name=" + userInput  + "&per_page=10" + "&page=" + pageCounter// + "&per_page=10"; https://api.punkapi.com/v2/beers?page=2&per_page=80 

    let request = await fetch(beer)
    let result = await request.json();

    return result;
}

//----------------------------------------------//
//----------- WORKING WITH PAGINATION ----------//
//----------------------------------------------//

let pageLimit = false;
let pageResultLength = 0
const pageContainer = document.querySelector(".pagination-div")


let createList = async function (userInput, pageCounter) {
    let id = 0;
    let fetchResult = await fetchBySearch(userInput, pageCounter);

    let searchMain = document.querySelector(".form-container");
    let ul = document.createElement("ul");

    searchMain.appendChild(ul);

    ul.classList.add("ul-form");


    if(userInput.length >= 3) { 
        document.querySelector(".pagination-div").classList.remove("search-hidden")
        document.querySelector(".pagination-buttons").classList.remove("search-hidden")
        document.querySelector(".current-page").innerHTML = pageCounter

        fetchResult = await fetchBySearch(userInput, pageCounter);
        pageResultLength = fetchResult.length

        if(fetchResult.length == 0) {
            pageLimit = true;

            document.querySelector(".pagination-div").classList.add("search-hidden")
            document.querySelector(".pagination-buttons").classList.add("search-hidden")

        }
        else    {
            pageLimit = false;
            //håll koll på raden nedanför
            pageCounter = 1;
        }
        //end of pagination code

        for (let i = 0; i < fetchResult.length; i++) {

            let li = document.createElement("li");
            ul.appendChild(li)

            list = document.querySelectorAll(".ul-form li")
            list[i].classList.add("li-form") 

            list[i].innerHTML = fetchResult[i].name
        
            li.addEventListener("click", function(){
                printBeer(fetchResult[i].id)
                document.querySelector(".form-div").classList.add("search-hidden")
                document.querySelector(".pagination-buttons").classList.add("search-hidden")
                document.querySelector(".beer-info").classList.remove("hide")
            })
 
        }

    }

    else {
        document.querySelector(".pagination-div").classList.add("search-hidden")
        document.querySelector(".pagination-buttons").classList.add("search-hidden")

        fetchResult = await fetchBySearch(userInput, pageCounter);
        pageResultLength = fetchResult.length

        if(fetchResult.length == 0) { 
            pageLimit = true;

            document.querySelector(".pagination-div").classList.add("search-hidden")
            document.querySelector(".pagination-buttons").classList.add("search-hidden")
        }
        else{
            pageLimit = false;
        }
    }

}

//---------------- TESTING REMOVING LIST -----------------//

let hideList = function() {
    
    if(searchInput.value.length == 0) {       
        for(let i = 0; i < list.length; i++) {
            list[i].remove();
        }

        document.querySelector(".pagination-div").classList.add("search-hidden")
        document.querySelector(".pagination-buttons").classList.add("search-hidden")
        
    }
    
}

//Needed becuase hideList() only applies when the search field is empty
let hide_List = function() {
    for(let i = 0; i < list.length; i++) {
        list[i].remove();
    }
}


if(searchInput){
searchInput.addEventListener("keyup", function () {
    createList(searchInput.value, pageCounter);
    hide_List();
});
}

//-----------------------------------------------------------------------------------------------------------//
//-------------------------------------------PREVIOUS OCH NEXT BUTTONS---------------------------------------//
//-----------------------------------------------------------------------------------------------------------//


const nextButton = document.getElementById("next");

if(nextButton){
nextButton.addEventListener("click", function() {
    if(pageLimit == false && pageResultLength == 10) { 
        pageCounter++
        createList(searchInput.value, pageCounter)
        document.querySelector(".current-page").innerHTML = pageCounter;
       
        for(let i = 0; i < list.length; i++) {
            list[i].remove();
            }
         }
        
    if (pageResultLength != 10) {
        pageCounter = pageCounter
    }

    else {
        for(let i = 0; i < list.length; i++) {
            list[i].remove();
        }
    } 
   
})
}


const previousButton = document.getElementById("previous");

if(previousButton){
previousButton.addEventListener("click", function() {
    
    if(pageCounter != 1) {
        for(let i = 0; i < list.length; i++) {
            list[i].remove();
            
        }
        hideList()
        pageCounter--
        createList(searchInput.value, pageCounter);
        document.querySelector(".current-page").innerHTML = pageCounter
    }
  
})
}

// -----------------------------------------------------------------------------------//
//------------------- MAKES THE SEARCH BUTTON CLICKABLE AGAIN ------------------------//
//------------------- AND HIDES THE INFO ABOUT THE SHOWCASED BEER --------------------//
// -----------------------------------------------------------------------------------//

let searchBtn = document.querySelector("#search-btn")

if(searchBtn){
searchBtn.addEventListener("click", function() {
    document.querySelector(".form-div").classList.remove("search-hidden")
    hide_List()
})
}

//--------------------- DETTA ÄR TILL FÖR INDEX SIDAN -------------------//

const randomiseBtn = document.querySelector(".random-beer-btn")

if(randomiseBtn){
randomiseBtn.addEventListener("click", function(){
    printRnd()
    bInfoText.classList.add("hide")
});
}

const bInfo = document.querySelector(".info")
const bInfoText = document.querySelector("#beer-info")

if(bInfo && bInfoText){
bInfo.addEventListener("click", function(){
    bInfoText.classList.remove("hide")
});
}