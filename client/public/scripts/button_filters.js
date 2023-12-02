function allButton() {
    // Filter images by category
    const gridItems = document.querySelectorAll(".grid-item");
    document.getElementById("more-filters").style.display = "none";
    gridItems.forEach((item) => {
        item.style.display = "grid"; // Display all items
    });
}

function surfButton() {
    // Filter images by category
    const gridItems = document.querySelectorAll(".grid-item");
    document.getElementById("more-filters").style.display = "none";
    gridItems.forEach((item) => {
        const itemCategory = item.getAttribute("product-style")
        if (itemCategory == "surf") {
            item.style.display = "grid"; // Display matching items
        }
        else {
            item.style.display = "none"; // Hide non-matching items
        }
    });
}

function cityButton() {
    // Filter images by category
    const gridItems = document.querySelectorAll(".grid-item");
    document.getElementById("more-filters").style.display = "none";
    gridItems.forEach((item) => {
        const itemCategory = item.getAttribute("product-style")
        if (itemCategory == "city") {
            item.style.display = "grid"; // Display matching items
        }
        else {
            item.style.display = "none"; // Hide non-matching items
        }
    });
}

function allFilters() {
    const moreFilters = document.getElementById("more-filters");
    // if More is clicked, but the filters are already displayed, this will stop displaying them
    if (moreFilters.style.display == "block") {
        moreFilters.style.display = "none";
    }
    // Otherwise, the other filters will be displayed and the price graph will be created
    else {
        moreFilters.style.display = "block";
        createPriceGraph();
    }
}

