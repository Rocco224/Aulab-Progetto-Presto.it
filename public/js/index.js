function generateCategories(category) {
    const card = document.createElement("div");
    card.classList.add("category-card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("category-body");
    card.appendChild(cardBody);

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("rounded-icon-container");
    cardBody.appendChild(iconContainer);

    const icon = document.createElement("i");
    const categoryIconArray = category.icon.split(" ");
    categoryIconArray.forEach((clazz) => {
        icon.classList.add(clazz);
    });
    iconContainer.appendChild(icon);

    const title = document.createElement("h3");
    title.textContent = category.name;
    cardBody.appendChild(title);

    const announcementCounter = document.createElement("p");
    announcementCounter.textContent = `${category.announcementsCount} Annunci`;
    cardBody.appendChild(announcementCounter);
    
    return card;
}

fetch("../../server/api/categorie.json")
    .then((response) => {
       return response.json();
    })
    .then ((categories) => {
        
        const categoryContainer = document.getElementById("categoryContainer");

        categories.forEach(category => {
            const card = generateCategories(category);  
            
            const col = document.createElement("div");
            col.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3", "p-0");
            col.appendChild(card);

            categoryContainer.appendChild(col);
        });

    })
    .catch((error) => {
        console.error(error);
    })


    const workWithUsForm = document.getElementById("workWithUsForm");
  
    workWithUsForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if(!workWithUsForm.checkValidity()) {
            console.error("Validazione non a buon fine");
        }

        workWithUsForm.classList.add("was-validated");

        // invio i dati al server
        // TODO
    })