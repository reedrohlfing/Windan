// Function to create grid items from product data
function createWishlistItems(data) {
    console.log("Creating wishlist items...");

    // Import wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
    console.log(wishlist);

    // Get wishlist product ids
    const wishlistProductIDs = Object.keys(wishlist)
    console.log(wishlistProductIDs)

    // Append each wishlist item to the wishlist Container
    const wishlistContainer = document.getElementById("wishlist-container")
    data.forEach((product) => {
        if (_isInWishList(product.id)) {
            console.log(product)
            var gridItem = buildGridItem(product)
            wishlistContainer.appendChild(gridItem)
        }
    });

    // Stop showing loading circle
    document.getElementById("loading-container").style.display = "none";
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
        const wishlist = JSON.parse(localStorage.getItem('wishlist'));
        console.log("wishlist:", wishlist)
    }

    // Display wishlist items
    const product_info = "product_info.json";
    fetch(product_info)
        .then((response) => response.json())
        .then((data) => {
            console.log("Data received:", data);
            createWishlistItems(data);
        })
        .catch((error) => {
            console.error("Error fetching product data:", error);
        });

    // Hide Search Button
    const searchButton = document.getElementById("search-icon");
    searchButton.style.display = "none";

    // Display Back Button
    const backButton = document.getElementById("back-button");
    backButton.style.display = "block";
});




