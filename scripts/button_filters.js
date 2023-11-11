function allButton() {
    // Filter images by category
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((item) => {
        item.style.display = "grid"; // Display all items
    });
}

function surfButton() {
    // Filter images by category
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category")
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
    gridItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category")
        if (itemCategory == "city") {
            item.style.display = "grid"; // Display matching items
        }
        else {
            item.style.display = "none"; // Hide non-matching items
        }
    });
}
