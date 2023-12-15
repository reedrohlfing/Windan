const gridContainer = document.getElementById("grid-container");
const filterButtons = document.querySelectorAll(".filter-button");
const gridItems = document.querySelectorAll(".grid-item");
const itemsPerPage = 25;

// Function to create grid items from product data
function createGridItems(data, page) {
    console.log("Creating grid items...");

    // Calculate the start and end index based on the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get a subset of data based on the current page
    const pageData = data.slice(startIndex, endIndex);

    // Check if there are more items to display
    const moreItems = data.length > endIndex;

    pageData.forEach((product) => {
        var gridItem = buildGridItem(product)
        gridContainer.appendChild(gridItem);
    });

    document.getElementById("load-more-container").style.display = "block";
    // Check if there are more items to display
    if (!moreItems) {
        // If no more items, hide the "Load More" button
        document.getElementById("load-more-container").style.display = "none";
    }
    // Stop showing loading circle
    document.getElementById("loading-container").style.display = "none";
}

// Function to load more items
function loadMore() {
    currentPage = parseInt(localStorage.getItem("currentPage"));
    currentPage++;
    console.log("load more, page #: ", currentPage)
    localStorage.setItem("currentPage", currentPage);
    fetchProductPageData();
}


// Fetch product data from the external source
function fetchProductPageData() {
    console.log("Fetching data...");
    let current_page = localStorage.getItem("currentPage");
    let product_info = localStorage.getItem("productInfo");
    console.log("Current page: ", current_page, ", Product info: ", product_info);
    fetch(product_info)
        .then((response) => response.json())
        .then((data) => {
            createGridItems(data, current_page);
        })
        .catch((error) => {
            console.error("Error fetching product data:", error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded...");

    // Check the current route
    let currentRoute = window.location.pathname;
    console.log(currentRoute)

    // Load initial set of items
    localStorage.setItem("currentPage", 1)

    // Check the page being loaded
    if (currentRoute == "/surf") {
        localStorage.setItem("productInfo", "product_info_surf.json");
    } else if (currentRoute == "/city") {
        localStorage.setItem("productInfo", "product_info_city.json");
    } else if (currentRoute == "/tops") {
        localStorage.setItem("productInfo", "product_info_tops.json");
    } else if (currentRoute == "/bottoms") {
        localStorage.setItem("productInfo", "product_info_bottoms.json");
    } else if (currentRoute == "/shorts") {
        localStorage.setItem("productInfo", "product_info_shorts.json");
    } else if (currentRoute == "/shoes") {
        localStorage.setItem("productInfo", "product_info_shoes.json");
    } else if (currentRoute == "/accessories") {
        localStorage.setItem("productInfo", "product_info_accessories.json");
    } else {
        localStorage.setItem("productInfo", "product_info.json");
    }
    fetchProductPageData();
});
