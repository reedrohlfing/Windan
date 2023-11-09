// Check if a product is already in the wish list
function _isInWishList(productId) {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishList = JSON.parse(savedWishlist);
    }
    return wishList.hasOwnProperty(productId);
}

// Function to add a product to the wish list then update local wishlist
function _addToWishList(product) {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishList = JSON.parse(savedWishlist);
    }
    wishList[product.id] = product;
    localStorage.setItem('wishlist', JSON.stringify(wishList));
}

// Function to remove a product to the wish list
function _removeFromWishList(product) {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishList = JSON.parse(savedWishlist);
    }
    delete wishList[product.id];
    localStorage.setItem('wishlist', JSON.stringify(wishList));
}

// Function to handle the "Add to Wishlist" button click
function addToWishListClick(event) {
    // Get the parent grid-item element
    const gridItem = event.target.closest(".grid-item");

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishList = JSON.parse(savedWishlist);
    }

    // Check if the product is not already in the wish list
    if (!_isInWishList(gridItem.id)) {
        _addToWishList(gridItem);
        console.log(wishList);
        // You can also update the UI to indicate that the product is in the wish list
    }
}

// Function to handle the "Remove from Wishlist" button click
function removeFromWishListClick(event) {
    // Get the parent grid-item element
    const gridItem = event.target.closest(".grid-item");

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishList = JSON.parse(savedWishlist);
    }

    // Double check if the product is in the wish list
    if (_isInWishList(gridItem.id)) {
        _removeFromWishList(gridItem);
        console.log(wishList);
        // You can also update the UI to indicate that the product is in the wish list
    }
}

// Load wishlist items from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded...");

    // First time initialization of wishlist
    if (localStorage.getItem('wishlist') === null) {
        console.log("wishlist not initialized")
        localStorage.setItem('wishlist', JSON.stringify({}));
    }
    else {
        // Load the wishlist from localStorage
        console.log("a wishlist exists")
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            wishList = JSON.parse(savedWishlist);
            console.log(wishList)
        }
    }

    // Display all wish list saves when the button is clicked
    const wishlistSavesButton = document.getElementById("wishlist-saves-button");
    wishlistSavesButton.addEventListener("click", function () {
        const gridContainer = document.getElementById("grid-container");
        const gridItems = document.querySelectorAll(".grid-item");

        // Hide all grid items that aren't in wishlist
        gridItems.forEach((item) => {
            if (!_isInWishList(item.id)) {
                item.classList.toggle("hide", true);
            }
        })

        // Re-arrange grid container so that there is only 1 column
        gridContainer.style.gridTemplateColumns = "repeat(1, 1fr)";
        gridContainer.style.width = "50%";
        gridContainer.style.justifySelf = "center";
        gridContainer.style.margin = "0 auto";
        gridContainer.style.marginTop = "64px";
    })
});




