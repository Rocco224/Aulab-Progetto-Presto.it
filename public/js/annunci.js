function createNewCard(obj) {
    const cardsContainer = document.getElementById("cardsContainer");

    const card = document.createElement("div");
    card.classList.add("card", "col-12", "col-md-6", "col-lg-4", "m-2", "p-0", "rounded", "shadow");
    card.setAttribute("style", "width: 18rem")
    cardsContainer.appendChild(card);

    const badge = document.createElement("span");
    badge.classList.add("badge", "position-absolute", "top-0", "end-0", "px-3", "fs-6", "fw-semibold");
    switch (obj.type) {
        case "sell":
            badge.classList.add("text-bg-danger");
            badge.textContent = "Sell";
            break;

        case "search":
            badge.classList.add("text-bg-success");
            badge.textContent = "Search";
            break;
    }
    card.appendChild(badge);

    randomImg = Math.floor(Math.random() * (100 - 1 + 1) + 1)

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.setAttribute("src", `https://picsum.photos/id/${randomImg}/200/300`);
    img.setAttribute("alt", "Card image cap");
    card.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    const cardSubtitle = document.createElement("h5");
    cardSubtitle.classList.add("card-subtitle", "text-primary");
    cardSubtitle.textContent = `€ ${obj.price}`;
    cardBody.appendChild(cardSubtitle);

    const cardTitle = document.createElement("h1");
    cardTitle.classList.add("card-title", "mb-3");
    cardTitle.textContent = obj.name;
    cardBody.appendChild(cardTitle);

    const cardText = document.createElement("p");
    cardText.classList.add("card-text", "mb-2");
    cardText.textContent = "Some quick example text to build on the card title and make up the bulk of the cards content";
    cardBody.appendChild(cardText);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "d-flex", "justify-content-around", "align-items-center", "text-primary", "bg-white");
    card.appendChild(cardFooter);

    const category = document.createElement("div");
    category.classList.add("d-flex", "flex-row-reverse");
    cardFooter.appendChild(category);

    const data = document.createElement("div");
    data.classList.add("d-flex", "flex-row-reverse");
    cardFooter.appendChild(data);

    const tag = document.createElement("p");
    tag.classList.add("m-0");
    tag.textContent = obj.category;
    category.appendChild(tag);

    const tagIcon = document.createElement("i");
    tagIcon.classList.add("bi", "bi-tag-fill", "pe-1");
    category.appendChild(tagIcon);

    const date = new Date(obj.createdAt);

    const calendar = document.createElement("p");
    calendar.classList.add("m-0");
    calendar.textContent = date.toLocaleDateString();
    data.appendChild(calendar);

    const calendarIcon = document.createElement("i");
    calendarIcon.classList.add("bi", "bi-calendar-fill", "pe-1");
    data.appendChild(calendarIcon);
}

function filterAds(ads, options) {
    let filteredAds = ads.filter((ad) => {

        let isAdRequired = true;

        if (options.searchInputValue.length > 0) {
            isAdRequired = ad.name.toLowerCase().includes(options.searchInputValue.toLowerCase());
        }
        if (isAdRequired && options.categorySelectValue.length > 0) {
            isAdRequired = ad.category.toLowerCase() == options.categorySelectValue.toLowerCase();
        }
        if (isAdRequired && options.minPriceInputValue.length > 0) {
            isAdRequired = parseFloat(ad.price) >= parseFloat(options.minPriceInputValue);
        }
        if (isAdRequired && options.maxPriceInputValue.length > 0) {
            isAdRequired = parseFloat(ad.price) < parseFloat(options.maxPriceInputValue);
        }

        return isAdRequired;
    });

    return filteredAds;
}

function sortAds(ads, sortSelectValue) {
    switch (sortSelectValue) {
        case "descByDate":
            ads.sort((left, right) => {
                return parseInt(right.createdAt) - parseInt(left.createdAt);
            })    
            break;
        case "ascByDate":
            ads.sort((left, right) => {
                return parseInt(left.createdAt) - parseInt(right.createdAt);
            })  
            break;
        case "ascByPrice":
            ads.sort((left, right) => {
                return parseFloat(left.price) - parseFloat(right.price);
            })  
            break;
        case "descByPrice":
            ads.sort((left, right) => {
                return parseFloat(right.price) - parseFloat(left.price);
            })  
            break;
        case "ascByAlpha":
            ads.sort((left, right) => {
                return left.name.toLowerCase().localeCompare(right.name.toLowerCase());
            }) 
            break;
        case "descByAlpha":
            ads.sort((left, right) => {
                return right.name.toLowerCase().localeCompare(left.name.toLowerCase());
            }) 
            break;
    }
}

function addCategory(ads, categorySelect) {

    const categorySet = new Set();
    ads.forEach((ad) => {
        categorySet.add(ad.category);
    });

    categorySet.forEach((category) => {
        const categoryOption = document.createElement("option");
        categoryOption.setAttribute("value", category);
        categoryOption.textContent = category;

        categorySelect.appendChild(categoryOption);
    });
}

document.addEventListener('DOMContentLoaded', async () => {

    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");
    const minPriceInput = document.getElementById("minPriceInput");
    const maxPriceInput = document.getElementById("maxPriceInput");
    const sortSelect = document.getElementById("sortSelect");
    const researchForm = document.getElementById("researchForm");

    fetch("../../server/api/annunci.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (ads) {

        ads.forEach((ad) => {
            createNewCard(ad);
        });

        addCategory(ads, categorySelect);

        researchForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const options = {
                searchInputValue: searchInput.value,
                categorySelectValue: categorySelect.value,
                minPriceInputValue: minPriceInput.value,
                maxPriceInputValue: maxPriceInput.value,
            }

            const sortSelectValue = sortSelect.value;

            while (cardsContainer.hasChildNodes()) {
                cardsContainer.removeChild(cardsContainer.firstChild)
            }

            filteredAds = filterAds(ads, options);

            sortAds(filteredAds, sortSelectValue);

            filteredAds.forEach((ad) => {
                createNewCard(ad);
            });
        })
    })
    .catch(function (error) {
        console.error(error);
    });

});