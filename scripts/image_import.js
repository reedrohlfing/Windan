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

            // Add the product id to the grid-item
            gridItem.id = product.id;

            // Create an anchor element (<a>) for the image
            const link = document.createElement("a");
            link.id = "item-link";
            link.href = product.siteURL; // Set the href attribute to the product's URL
            link.target = "_blank"; // Open the link in a new tab

            // Create an image element (<img>) and set its attributes
            const img = document.createElement("img");
            img.id = "item-image";
            img.src = product.imageURL;
            img.alt = "Image";

            // Set the data-category attribute based on the product's category
            gridItem.setAttribute("data-category", product.category);

            // Append the image to the anchor element
            link.appendChild(img);

            // Append the anchor element to the grid item
            gridItem.appendChild(link);

            // Create div with 2 columns for product info and wishlist button
            const itemDescDiv = document.createElement("div");
            itemDescDiv.id = "item-desc-div";
            const itemInfo = document.createElement("div");
            itemInfo.id = "item-info-div";
            const itemWishlist = document.createElement("div");
            itemWishlist.id = "item-wishlist-div";

            // Create item title
            const title = document.createElement("h4");
            title.id = "item-title";
            title.textContent = product.title;

            // Add item description
            const description = document.createElement("p");
            description.id = "item-description";
            description.style.display = "none";
            description.textContent = product.description;

            // Create item price
            const price = document.createElement("p");
            price.id = "item-price";
            price.textContent = "$" + product.price;

            // Create item wishlist button
            const wishlistButton = document.createElement("img");
            wishlistButton.id = "item-wishlist-button"
            wishlistButton.alt = "Wishlist Button"
            wishlistButton.src = "icons/wishlist-button.png"

            // Create item wishlist button
            const savedButton = document.createElement("img");
            savedButton.id = "item-saved-button"
            savedButton.alt = "Saved Button"
            savedButton.src = "icons/wishlist-check.png"

            if (_isInWishList(product.id)) {
                wishlistButton.style.display = "none"
                savedButton.style.display = "block"
            }
            else {
                wishlistButton.style.display = "block"
                savedButton.style.display = "none"
            }

            // Add button functionality for hovering and clicking
            wishlistButton.onclick = function () {
                addToWishListClick(event);
                // Show the saved check
                wishlistButton.style.display = "none"
                savedButton.style.display = "block"
            }
            savedButton.onclick = function () {
                removeFromWishListClick(event);
                // Remove the saved check
                wishlistButton.style.display = "block"
                savedButton.style.display = "none"
            }

            wishlistButton.onmouseover = function () {
                wishlistButton.src = "icons/wishlist-button-dark.png"; // Change to hovered img src

            }

            wishlistButton.onmouseout = function () {
                wishlistButton.src = "icons/wishlist-button.png"; // Reset to normal image src
            }

            // Append title description and price to item info div
            itemInfo.appendChild(title);
            itemInfo.appendChild(description);
            itemInfo.appendChild(price);

            // Append wishlist button to itemWishlist div
            itemWishlist.appendChild(wishlistButton);
            itemWishlist.appendChild(savedButton);

            // Append the item info and item wish list divs to the item description div
            itemDescDiv.appendChild(itemInfo);
            itemDescDiv.appendChild(itemWishlist);

            // Append the grid item to the grid container
            gridItem.appendChild(itemDescDiv);
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
});
