// Check if a product is already in the wish list
function _isInWishList(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
    return wishlist.hasOwnProperty(productId);
}

// Function to add a product to the wish list then update local wishlist
function _addToWishList(product) {
    // Load wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
    wishlist[product.id] = product;
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Function to remove a product to the wish list
function _removeFromWishList(product) {
    // Load wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
    delete wishlist[product.id];
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Function to handle the "Add to Wishlist" button click
function addToWishListClick(event) {
    // Get the parent grid-item element
    const gridItem = event.target.closest(".grid-item");

    // Check if the product is not already in the wish list
    if (!_isInWishList(gridItem.id)) {
        _addToWishList(gridItem);
        console.log("Item Added: ", gridItem.id);
        console.log("Updated Wishlist: ", JSON.parse(localStorage.getItem('wishlist')))
        // You can also update the UI to indicate that the product is in the wish list
    }
}

// Function to handle the "Remove from Wishlist" button click
function removeFromWishListClick(event) {
    // Get the parent grid-item element
    const gridItem = event.target.closest(".grid-item");

    // Double check if the product is in the wish list
    if (_isInWishList(gridItem.id)) {
        _removeFromWishList(gridItem);
        console.log("Item Removed: ", gridItem.id);
        console.log("Updated Wishlist: ", JSON.parse(localStorage.getItem('wishlist')));
        // You can also update the UI to indicate that the product is in the wish list
    }

    // Reload the page to remove item from wishlist
    if (document.querySelector(".wishlist-container")) {
        location.reload()
    }

    // // Another option for removing the item, but if all items were removed, the "Add to wishlist" message wasn't being displayed
    // if (document.querySelector(".wishlist-container")) {
    //     const wishlistContainer = document.querySelector(".wishlist-container")
    //     wishlistContainer.removeChild(gridItem)
    // }
}

function buildGridItem(product) {
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
    img.alt = "Missing Product Image";
    img.setAttribute("onerror", "removeGridItem(this)");

    // Set the product-style attribute based on the product's style
    gridItem.setAttribute("product-style", product.style);

    // Set the product-style attribute based on the product's style
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

    // If the wishlist contains the product
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
    if (wishlist.hasOwnProperty(product.id)) {
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

    return gridItem;
}


function removeGridItem(element) {
    // Find the closest parent with the class .grid-item and remove it
    var gridItem = element.closest('.grid-item');
    if (gridItem) {
        gridItem.remove();
    }
}