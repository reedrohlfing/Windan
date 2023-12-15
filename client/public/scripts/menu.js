function clickMenu() {
    const filterContainer = document.getElementById("filter-container");
    if (filterContainer.style.display === "none" || filterContainer.style.display === "") {
        // Show the Title
        document.querySelector(".header-title").style.display = "block";

        // Show the wishlist saves button
        document.getElementById("wishlist-saves-button").style.display = "block";

        // Hide search bar
        document.querySelector(".search-container").style.display = "none";
        document.getElementById("close-search-button").style.display = "none";

        // Show the menu bar
        filterContainer.style.display = "block";
        document.getElementById("menu-options").style.display = "grid";
        document.querySelector(".middle-section").style.marginTop = "104px"; // Make space for filter buttons
    } else {
        // This will be executed when the menu icon is clicked while menu is open
        // Hide search bar, close button, and filter nav
        document.querySelector(".search-container").style.display = "none";
        document.getElementById("close-search-button").style.display = "none";
        filterContainer.style.display = "none";
        document.getElementById("style-buttons").style.display = "none";

        // Show the Title
        document.querySelector(".header-title").style.display = "block";

        // Show the wishlist saves button
        document.getElementById("wishlist-saves-button").style.display = "block";

        // Move grid back up and display
        document.querySelector(".middle-section").style.marginTop = "72px";
    }
}

function stylesButton() {
    // Show the all, surf, city style options
    document.getElementById("style-buttons").style.display = "grid";

    // Hide filter buttons
    document.getElementById("more-filters").style.display = "none";
}

function filtersButton() {
    // Hide style buttons
    document.getElementById("style-buttons").style.display = "none";

    // Show price and categories options
    document.getElementById("more-filters").style.display = "block";
}
