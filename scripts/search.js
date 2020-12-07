/* ----------------------------------------------- SEARCH PAGE ----------------------------------------- */
/* -----------------------------------------------             ----------------------------------------- */

var searchInput = document.querySelector(".search-text"); //FRÅN SÖK TEXTRUTAN
var list = "";


let fetchBySearch = async function (userInput) { 
    let beer = "https://api.punkapi.com/v2/beers?beer_name=" + userInput  + "&per_page=1"; // + "&per_page=10";
    console.log("Is root below viewable?")
    console.log(beer)

    let request = await fetch(beer)
    let result = await request.json();

    return result;
}


let createList = async function (userInput) {
    let fetchResult = await fetchBySearch(userInput);

    let searchMain = document.querySelector(".form-container");
    let ul = document.createElement("ul");
    searchMain.appendChild(ul);
    ul.classList.add("ul-form");


    if(searchInput.value.length == 3) {
        document.querySelector(".form2-container").classList.remove("search-hidden")
        for (let i = 0; i < fetchResult.length; i++) {
            let li = document.createElement("li");
            ul.appendChild(li)

            list = document.querySelectorAll(".ul-form li");
            list[i].classList.add("li-form");
    
            list[i].innerHTML = fetchResult[i].name;           
        }
        
    }

      
//clickable
     for (let i = 0; i < list.length; i++) {
         list[i].addEventListener("click", function () {
             print(fetchBySearch(list[i].innerHTML)); 
              
        })
     }
}

//hides
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