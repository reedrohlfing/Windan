document.addEventListener("DOMContentLoaded", function () {
    console.log("Attempting to categorize products..")

    // Fetch product data from the external source
    createCategorizedGrids("product_info.json");

    // Stop showing loading circle
    document.getElementById("loading-container").style.display = "none";
});

async function createCategorizedGrids(jsonFilePath) {
    try {
        const response = await fetch(jsonFilePath);
        const data = await response.json();
        console.log("JSON DATA: ", data);
        const containers = document.querySelectorAll(".categorized-container");

        // Ceate a list of available categories
        let categories = [];
        containers.forEach(categoryContainer => {
            // Clear existing content in the grid container
            let categoryGrid = categoryContainer.querySelector(".category-grid");
            categoryGrid.innerHTML = '';

            // Strip 'grid-container-' from the container id to get to category
            categories.push(categoryContainer.id.substring(15))
        })
        console.log("Categories: ", categories);

        // Add every product that has a matching category to a category container
        data.forEach(product => {
            let gridItem = buildGridItem(product);
            let gridItemCategory = gridItem.getAttribute("data-category")
            if (categories.includes(gridItemCategory)) {
                let containerId = "grid-container-" + gridItemCategory;
                let categoryContainer = document.getElementById(containerId)
                let categoryGrid = categoryContainer.querySelector(".category-grid");

                categoryGrid.appendChild(gridItem);
            }
            else {
                console.log(gridItemCategory, " not found in", categories)
            }

        })
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

