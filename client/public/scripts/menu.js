function clickMenu() {
    const filterContainer = document.getElementById("filter-container")
    const filterButtons = document.getElementById("filter-buttons")
    const headerContainer = document.querySelector(".header-container")
    const searchContainer = document.querySelector(".search-container")
    const headerTitle = document.querySelector(".header-title")
    const searchClose = document.getElementById("close-search-button")
    const wishlistSaves = document.getElementById("wishlist-saves-button")
    const gridContainer = document.querySelector(".grid-container")
    const middleContainer = document.querySelector(".middle-section")
    const loadMoreContainer = document.querySelector(".load-more-container")
    if (filterContainer.style.display === "none" || filterContainer.style.display === "") {
        // Stop displaying the load more container
        loadMoreContainer.classList.toggle("hide", true)

        // Show the Title
        headerTitle.style.display = "block"

        // Show the wishlist saves button
        wishlistSaves.style.display = "block"

        // Hide search bar
        searchContainer.style.display = "none" // Hide search bar
        searchClose.style.display = "none" // Hide close icon

        // Show the menu bar
        filterContainer.style.display = "block"
        filterButtons.style.display = "grid"
        middleContainer.style.marginTop = "104px" // Make space for filter buttons
    } else {
        // This will be executed when the menu icon is clicked while menu is open
        // Hide search bar, close button, and filter nav
        searchContainer.style.display = "none" // Hide search bar
        searchClose.style.display = "none" // Hide close icon
        filterContainer.style.display = "none" // Hide the filter buttons
        filterButtons.style.display = "none"

        // Show the Title
        headerTitle.style.display = "block"

        // Show the wishlist saves button
        wishlistSaves.style.display = "block"

        // Move grid back up and display
        middleContainer.style.marginTop = "72px"
    }
}

