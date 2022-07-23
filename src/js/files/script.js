// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";


const iconMenu = document.querySelector('.menu__icon');
if (iconMenu) {
    const menuBody = document.querySelector('.menu__body');
    iconMenu.addEventListener('click', function () {
        menuBody.classList.toggle('_active');
    })

}

/*++++++++++++++++++*/

/*
let s = 5;
let limit = document.querySelector('#limit-img');
limit.addEventListener("change", function () {
    s = this.value;
});
*/
const url = `https://api.thecatapi.com/v1/images/search?limit=10`;
const api_key = '5bd4105c-6faf-4fb2-a589-dbd26ba1dc7d';
const url_breeds = `https://api.thecatapi.com/v1/images/search?breed_ids={}`;

fetch(url, {
    headers: {
        'x-api-key': api_key
    }
})
    .then((response) => {
        return response.json();
    })

    .then((data) => {

        let imagesData = data;
        imagesData.map(function (imageData) {
            let image = document.createElement('img');
            //use the url from the image object
            image.src = `${imageData.url}`;
            let gridCell = document.createElement('a');
            gridCell.classList.add('gallery__image');
            gridCell.setAttribute("href", image.src);
            //gridCell.classList.add('gallery__image');

            gridCell.appendChild(image)
            document.getElementById('grid').appendChild(gridCell);

        });
    })
    .catch(function (error) {
        console.log(error);
    });

/*__________________________________________________________*/


let storedBreeds = []

fetch(url_breeds, {
    headers: {
        'x-api-key': api_key
    }
})
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        data = data.filter(img => img.image?.url != null)

        storedBreeds = data;

        for (let i = 0; i < storedBreeds.length; i++) {
            const breed = storedBreeds[i];
            let option = document.createElement('option');

            //skip any breeds that don't have an image
            if (!breed.image) continue

            //use the current array index
            option.value = i;
            option.innerHTML = `${breed.name}`;
            document.getElementById('breed_selector').appendChild(option);

        }
        //show the first breed by default
        showBreedImage(0)
    })
    .catch(function (error) {
        console.log(error);
    });

function showBreedImage(index) {
    document.getElementById("breed_image").src = storedBreeds[index].image.url;

    document.getElementById("breed_json").textContent = storedBreeds[index].temperament


    document.getElementById("wiki_link").href = storedBreeds[index].wikipedia_url
    document.getElementById("wiki_link").innerHTML = storedBreeds[index].wikipedia_url
}