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
    console.log(currentPage)
    localStorage.setItem("currentPage", currentPage);
    fetchProductPageData(currentPage);
}


// Fetch product data from the external source
function fetchProductPageData(currentPage) {
    console.log("Fetching data...");
    console.log("Current page: ", currentPage);
    fetch("product_info.json")
        .then((response) => response.json())
        .then((data) => {
            console.log("Data received:", data);
            createGridItems(data, currentPage);
        })
        .catch((error) => {
            console.error("Error fetching product data:", error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded...");
    console.log("initial page: ", localStorage.getItem("currentPage"))
    // Initialize page to 1
    if (localStorage.getItem("currentPage") == null) {
        localStorage.setItem("currentPage", 1)
        let currentPage = localStorage.getItem("currentPage");
        // Load initial set of items
        fetchProductPageData(currentPage);
    }
    else {
        let currentPage = parseInt(localStorage.getItem("currentPage"));
        for (let i = 1; i <= currentPage; i++) {
            //load all pages
            fetchProductPageData(i)
        }
    }


});
