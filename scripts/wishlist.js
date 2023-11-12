// Function to create grid items from product data
function createWishlistItems(data) {
    console.log("Creating wishlist items...");

    // Import wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};

    // Get wishlist product ids
    const wishlistProductIDs = Object.keys(wishlist)

    // Append each wishlist item to the wishlist Container
    const wishlistContainer = document.getElementById("wishlist-container")
    console.log("Wishlist items:")
    data.forEach((product) => {
        if (_isInWishList(product.id)) {
            console.log("    ", product.id, product)
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

    // Display Back Button
    const backButton = document.getElementById("back-button");
    backButton.style.display = "block";

    // Initially don't show no-wishlist message
    const noWishlist = document.querySelector(".no-wishlist");

    // Get wishlist
    const wishlist = localStorage.getItem('wishlist')

    // First time initialization of wishlist
    if (wishlist === null) {
        console.log("wishlist not initialized", wishlist)
        localStorage.setItem('wishlist', JSON.stringify({}));

    }
    else if (wishlist == "{}") {
        // If wishlist is empty, display "Add to wishlist" message
        console.log("wishlist empty", wishlist)
        noWishlist.classList.toggle("hide", false);
        // Stop showing loading circle
        document.getElementById("loading-container").style.display = "none";
    }
    else {
        // If wishlist is not empty, hide "add to wishlist" message
        noWishlist.classList.toggle("hide", true);
        // Load the wishlist from localStorage
        console.log("a wishlist exists")
        const parsedWishlist = JSON.parse(wishlist);
        console.log("wishlist:", parsedWishlist)
        // Display wishlist items
        fetch("product_info.json")
            .then((response) => response.json())
            .then((data) => {
                console.log("Data received:", data);
                createWishlistItems(data);
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
    }
});




