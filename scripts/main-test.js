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
let randomNr = Math.floor(Math.random() * 100);     

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
    

    //JOBBA LITE MED BILDLÄNK, VERKAR BLI ETT FEL NÄR MAN SKA KÖRA RANDOM KNAPPEN

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

    //random knappen
    const randomiseBtn = document.querySelector(".random-beer-btn")
    randomiseBtn.addEventListener("click", function(){
        print();
    });

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
    let id = 0;
    let fetchResult = await fetchBySearch(userInput, pageCounter);

    let searchMain = document.querySelector(".form-container");
    let ul = document.createElement("ul");

    //ul.innerHTML = ""

    searchMain.appendChild(ul);

    ul.classList.add("ul-form");


    if(userInput.length >= 3) { 
        //ul.innerHTML = ""
        //added for pagination
        document.querySelector(".pagination-div").classList.remove("search-hidden")
        document.querySelector(".pagination-buttons").classList.remove("search-hidden")

        document.querySelector(".current-page").innerHTML = pageCounter
        console.log("Does this work? " + pageCounter)

        fetchResult = await fetchBySearch(userInput, pageCounter);
        pageResultLength = fetchResult.length
        console.log("pageresultlength vad blir det " + pageResultLength)
        console.log(fetchResult.length) //outputs 20 - check out with line 88

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
            //let li = document.createElement("li");

            let li = document.createElement("li");
            //li.innerHTML = ""
            ul.appendChild(li)

            list = document.querySelectorAll(".ul-form li")
            list[i].classList.add("li-form") 

             //FÖR ATT FÅ FRAM ID FÖR ÖLEN
            //id = fetchResult[i].id

            //LÄGGA TILL BAKIFRÅN ISTÄLLET? DVS FÖRSTA VÄRDET BLIR SISTA
            list[i].innerHTML = fetchResult[i].name;   
    
            //list.push(li)
          

            console.log("Och id är : " + fetchResult[i].id) //id is right
        
            li.addEventListener("click", function(){
                printBeer(fetchResult[i].id)
                console.log("You clicked on " + fetchResult[i].name)

                //hides the search input and the buttons
                document.querySelector(".form-div").classList.add("search-hidden")
                document.querySelector(".pagination-buttons").classList.add("search-hidden")
            })

 
        }

    }


    //pagination code
    else {
        //document.querySelector(".pagination-div").classList.add("search-hidden")

        document.querySelector(".pagination-div").classList.add("search-hidden")
        document.querySelector(".pagination-buttons").classList.add("search-hidden")

        fetchResult = await fetchBySearch(userInput, pageCounter);
        pageResultLength = fetchResult.length
        console.log("Does this output?" + fetchResult.length) //outputs 1
        if(fetchResult.length == 0) { //ändrat
            pageLimit = true;

            document.querySelector(".pagination-div").classList.add("search-hidden")
            document.querySelector(".pagination-buttons").classList.add("search-hidden")
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
    
    if(searchInput.value.length == 0) {       
        for(let i = 0; i < list.length; i++) {
            list[i].remove();
        }

        
        document.querySelector(".pagination-div").classList.add("search-hidden")
        document.querySelector(".pagination-buttons").classList.add("search-hidden")
        

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

//Needed becuase hideList() only applies when the search field is empty
let hide_List = function() {
    for(let i = 0; i < list.length; i++) {
        list[i].remove();
    }
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
    //hideList();
    createList(searchInput.value, pageCounter);
    hide_List();
})


//-----------------------------------------------------------------------------------------------------------//
//-------------------------------------------PREVIOUS OCH NEXT BUTTONS---------------------------------------//
//-----------------------------------------------------------------------------------------------------------//




const nextButton = document.getElementById("next");

nextButton.addEventListener("click", function() {
    if(pageLimit == false && pageResultLength == 10) { 
        //this.innerHTML=""
        console.log("page resultlength blir: " + pageResultLength)
        //hideList() //
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

// -----------------------------------------------------------------------------------//
//------------------- MAKES THE SEARCH BUTTON CLICKABLE AGAIN ------------------------//
//------------------- AND HIDES THE INFO ABOUT THE SHOWCASED BEER --------------------//
// -----------------------------------------------------------------------------------//

let searchBtn = document.querySelector("#search-btn")

searchBtn.addEventListener("click", function() {
    //hides the search input and the buttons
    document.querySelector(".form-div").classList.remove("search-hidden")
    hide_List()
    
    /*
    document.querySelector(".pagination-buttons").classList.remove("search-hidden")

    document.querySelector("#beer-info").classList.add("search-hidden")

    document.querySelector(".beer-pic").innerHTML = "<img src='" + "assets/beerorig.jpg" + "'>"

    document.querySelector(".beer-name").classList.add("search-hidden")

    document.querySelector(".search-text").value = ""
    */

})

//------------------ EXEMPEL PÅ HUR DESCRIPTION SKULLE KUNNA FUNKA ----------//

const bInfo = document.querySelector(".info")
const bInfoText = document.querySelector("#beer-info")

bInfo.addEventListener("click", function(){
    bInfoText.classList.remove("hide")
});

