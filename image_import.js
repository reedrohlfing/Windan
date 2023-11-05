document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded...");

    // Replace this with the actual URL of your JSON file or API endpoint
    const product_info = "product_info.json";

    const gridContainer = document.getElementById("grid-container");
    const filterButtons = document.querySelectorAll(".filter-button");
    const gridItems = document.querySelectorAll(".grid-item");

    // Function to create grid items from product data
    function createGridItems(data) {
        console.log("Creating grid items...");
        data.forEach((product) => {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");

            // Create an anchor element (<a>) for the image
            const link = document.createElement("a");
            link.href = product.siteURL; // Set the href attribute to the product's URL
            link.target = "_blank"; // Open the link in a new tab

            // Create an image element (<img>) and set its attributes
            const img = document.createElement("img");
            img.src = product.imageURL;
            img.alt = "Image";

            // Set the data-category attribute based on the product's category
            gridItem.setAttribute("data-category", product.category);

            // Append the image to the anchor element
            link.appendChild(img);

            // Append the anchor element to the grid item
            gridItem.appendChild(link);

            // Append the grid item to the grid container
            gridContainer.appendChild(gridItem);
        });
    }

    // Fetch product data from the external source
    console.log("Fetching data...");
    fetch(product_info)
        .then((response) => response.json())
        .then((data) => {
            console.log("Data received:", data);
            createGridItems(data);
        })
        .catch((error) => {
            console.error("Error fetching product data:", error);
        });

    // // Add click event listeners to filter buttons
    // filterButtons.forEach((button) => {
    //     button.addEventListener("click", function () {
    //         const category = this.getAttribute("data-category");
    //         console.log("Button clicked...");
    //         console.log(category)

    //         // Filter images by category
    //         gridItems.forEach((item) => {
    //             const itemCategory = item.getAttribute("data-category");
    //             console.log(itemCategory)

    //             if (category === "all") {
    //                 item.style.display = "block"; // Display all items
    //                 console.log(category)
    //             } 
    //             else if (category === itemCategory){
    //                 item.style.display = "block"; // Display matching items
    //                 console.log(category)
    //                 console.log(itemCategory)
    //             }
    //             else {
    //                 item.style.display = "none"; // Hide non-matching items
    //             }
    //         });
    //     });
    // });
});
