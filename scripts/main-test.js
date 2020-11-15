console.log("It works!")

//------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------//
//-------------------------------- DOCUMENTATION IS HERE                --------------------------//
//-------------------------------- https://punkapi.com/documentation/v2 --------------------------//
//------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------//

//let beerId;

//-------------------- FETCHING API ---------------//
async function getBeer(beerNr) {
    const req = await fetch ("https://api.punkapi.com/v2/beers/" + beerNr) 
    const res = await req.json()
    return res
};

//--------------------PRINT FUNCTIONEN -------------//
async function print() {
let randomNr = Math.floor(Math.random() * 1000);     // returns a random integer from 0 to 999

let result = await getBeer(randomNr) // Anropar getBeer functionen och skickar med ett randomNr som parameter

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


//-------------------- DEN FÖRÄNDRADE PRINT FUNCTIONEN -------------//

//more changes needed
async function printBeer(id) {
    //let randomNr = Math.floor(Math.random() * 1000);     // returns a random integer from 0 to 999
    
    let result = await getBeer(id) // Anropar getBeer functionen och skickar med ett randomNr som parameter
    
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
let pageCounter = 1
var list = "";


let fetchBySearch = async function (userInput, pageCounter) { 
    let beer = "https://api.punkapi.com/v2/beers?beer_name=" + userInput  + "&per_page=10" + "&page=" + pageCounter// + "&per_page=10"; https://api.punkapi.com/v2/beers?page=2&per_page=80 
    //let beer = "https://api.punkapi.com/v2/beers?beer_name=" + userInput  + "&page=" + pageCounter + "&per_page=10" 

    console.log("Is root below viewable?")
    console.log(beer)

    let request = await fetch(beer)
    let result = await request.json();

    return result;
}

//----------------------------------------------//
//----------- WORKING WITH PAGINATION ----------//
//----------------------------------------------//

//1. global variables for pagination
let pageLimit = false;
let pageResultLength = 0
const pageContainer = document.querySelector(".pagination-div")
//let pageCounter = 1


let createList = async function (userInput, pageCounter) {
    //let id;
    let fetchResult = await fetchBySearch(userInput, pageCounter);

    let searchMain = document.querySelector(".form-container");
    let ul = document.createElement("ul");

    //ul.innerHTML = ""

    searchMain.appendChild(ul);

    ul.classList.add("ul-form");


    if(userInput.length > 0) {
        //ul.innerHTML = ""

        //added for pagination
        document.querySelector(".current-page").innerHTML = pageCounter
        console.log("Does this work? " + pageCounter)

        fetchResult = await fetchBySearch(userInput, pageCounter);
        pageResultLength = fetchResult.length
        console.log("pageresultlength vad blir det " + pageResultLength)
        console.log(fetchResult.length) //outputs 20 - check out with line 88
        if(fetchResult.length == 0) {
            pageLimit = true;
        }
        else    {
            pageLimit = false;

            //håll koll på raden nedanför
            pageCounter = 1;
        }
        //end of pagination code
        for (let i = 0; i < fetchResult.length; i++) {
            //let li = document.createElement("li");

            let li = document.createElement("li");
            //li.innerHTML = ""
            ul.appendChild(li)

            list = document.querySelectorAll(".ul-form li")
            list[i].classList.add("li-form")

            list[i].innerHTML = fetchResult[i].name;   
    
            

            //list.push(li)

            //FÖR ATT FÅ FRAM ID FÖR ÖLEN
            //id = fetchResult[i].id

            console.log("Och id är : " + fetchResult[i].id) //id is right
        
            li.addEventListener("click", function(){
                printBeer(fetchResult[i].id)
            })

 
        }

    }

    //pagination code
    else {
        fetchResult = await fetchBySearch(userInput, pageCounter);
        pageResultLength = fetchResult.length
        console.log("Does this output?" + fetchResult.length) //outputs 1
        if(fetchResult.length == 0) {
            pageLimit = true;
        }
        else{
            pageLimit = false;
        }
    }
    //end of pagination code

}

    /*TESTAR TÖMMA RESULTAT LISTAN IFALL SÖKFÄLTET ÄR TOMT
    if(userInput.length = 0){
        while (searchMain.hasChildNodes()) {  
            searchMain.removeChild(searchMain.firstChild);
          } 
    }

}

console.log(list)
*/



//---------------- TESTING REMOVING LIST -----------------//
//removes

//V1

let hideList = function() {
    
    if(searchInput.length == 0) {       
        for(let i = 0; i < list.length; i++) {
            list[i].remove();
        }
    }
    
   /*
    var aaa = document.querySelectorAll(".ul-form");    
    for(var a of aaa){
        //alert("TEST!!!")
        a.remove()
        a.innerHTML = ""
    }
    */
}



//V2
/*
let hideList = function() {
    if(searchInput.value.length == 0){
        for(var let of list){
            let.remove()
        }
    }
}
*/



searchInput.addEventListener("keyup", function () {
    createList(searchInput.value, pageCounter);
    hideList();
})


//-----------------------------------------------------------------------------------------------------------//
//-------------------------------------------PREVIOUS OCH NEXT BUTTONS---------------------------------------//
//-----------------------------------------------------------------------------------------------------------//




const nextButton = document.getElementById("next");

nextButton.addEventListener("click", function() {
    if(pageResultLength == 10) { 
        this.innerHTML=""
        console.log("page resultlength blir: " + pageResultLength)
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


const previousButton = document.getElementById("previous");

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
