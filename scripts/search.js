/* ----------------------------------------------- SEARCH PAGE ----------------------------------------- */
/* Använde inspiration från https://renzosantamaria.github.io/Beerpedia/ ------------------------------- */

var searchInput = document.querySelector(".search-text"); //FRÅN SÖK TEXTRUTAN
var list = "";


let fetchBySearch = async function (userInput) { 
    let root = "https://api.punkapi.com/v2/beers?beer_name=" + userInput  + "&per_page=8"; // + "&per_page=10";
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
        document.querySelector(".form2-container").classList.remove("search-hidden")
        for (let i = 0; i < fetchResult.length; i++) {
            let li = document.createElement("li");
            ul.appendChild(li)

            list = document.querySelectorAll(".ul-form li");
            list[i].classList.add("li-form");
    
            list[i].innerHTML = fetchResult[i].name;           
        }
    }

    if (userInput.length == 0) {
        document.querySelector(".form2-container").classList.add("search-hidden")
    }

      
    //makes the list clickable
     for (let i = 0; i < list.length; i++) {
         list[i].addEventListener("click", function () {
             print(fetchBySearch(list[i].innerHTML)); //print funktionen måste få förändringar
             seeMore(); //beroende på print, vi kanske inte behöver skapa en seeMore() function
         })
     }
}


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