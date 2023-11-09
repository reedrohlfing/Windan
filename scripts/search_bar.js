function clickSearch() {
  const filterButtons = document.getElementById("filter-buttons")
  const headerContainer = document.querySelector(".header-container")
  const searchContainer = document.querySelector(".search-container")
  const headerTitle = document.querySelector(".header-title")
  const searchInput = document.getElementById("search-input")
  const searchClose = document.getElementById("close-search-button")
  const wishlistSaves = document.getElementById("wishlist-saves-button")
  const release = document.getElementById("release")
  const gridContainer = document.querySelector(".grid-container")
  if (filterButtons.style.display === "none" || filterButtons.style.display === "") {
    // Stop displaying the Title
    headerTitle.style.display = "none"

    // Stop displaying the release build
    release.style.display = "none"

    // Stop displaying the wishlist saves button
    wishlistSaves.style.display = "none"

    // Show the search/filter bar
    searchContainer.style.display = "contents" // Show the search bar
    searchClose.style.display = "block" // Show search close icon
    filterButtons.style.display = "grid" // Show the filter buttons
    gridContainer.style.marginTop = "96px" // Make space for filter buttons
    searchInput.focus(); // Focus on the search input to open the keyboard
  } else {
    // This will be executed when the search icon is clicked while search bar is open
    // Hide search bar, close button, and filter nav
    searchContainer.style.display = "none" // Hide search bar
    searchClose.style.display = "none" // Hide close icon
    filterButtons.style.display = "none" // Hide the filter buttons

    // Show the Title
    headerTitle.style.display = "contents"

    // Show the release build
    release.style.display = "block"

    // Show the wishlist saves button
    wishlistSaves.style.display = "block"

    // Move grid back up
    gridContainer.style.marginTop = "64px"
  }
}

function closeSearch() {
  const filterButtons = document.getElementById("filter-buttons")
  const searchContainer = document.querySelector(".search-container")
  const headerTitle = document.querySelector(".header-title")
  const searchClose = document.getElementById("close-search-button")
  const searchInput = document.getElementById("search-input")
  const wishlistSaves = document.getElementById("wishlist-saves-button")
  const release = document.getElementById("release")
  const gridContainer = document.querySelector(".grid-container")
  const gridItems = document.querySelectorAll(".grid-item");

  // Clear the search input
  searchInput.value = ""

  // Hide search bar, close button, and filter nav
  searchContainer.style.display = "none" // Hide search bar
  searchClose.style.display = "none" // Hide close icon
  filterButtons.style.display = "none" // Hide the filter buttons

  // Show the Title
  headerTitle.style.display = "contents"

  // Show the release build
  release.style.display = "block"

  // Show the wishlist saves button
  wishlistSaves.style.display = "block"

  // Move grid back up
  gridContainer.style.marginTop = "64px"

  // Redisplay all grid items
  gridItems.forEach((item) => {
    item.classList.toggle("hide", false);
  })

  // Stop displaying no search results if present
  const noSearchResults = document.querySelector("#no-search-results");
  noSearchResults.classList.toggle("no-search-results-inactive", true);
  noSearchResults.classList.toggle("no-search-results-active", false);

}

// Search Bar main functionality
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", input => {
  // Get all current grid items on page
  const gridItems = document.querySelectorAll(".grid-item");
  const query = input.target.value.toLowerCase();
  console.log(query);
  // Initiate match variable
  let match = false;
  // Loop through grid items and check if their title/description matches the query
  gridItems.forEach(item => {
    // Get the description and title of the current item
    const description = item.querySelector("#item-description").textContent.toLowerCase();
    const title = item.querySelector("#item-title").textContent.toLowerCase();

    // Checks to see if the item matched, creates a bool
    const isMatch = description.includes(query) || title.includes(query);

    // If there is not a match, hide the grid item
    item.classList.toggle("hide", !isMatch);

    // Turns match to true if the search matches any of the grid items
    if (isMatch) {
      match = true;
    }
  })
  // Only display "No Results" message is there are no results from search
  if (!match) {
    const noSearchResults = document.querySelector("#no-search-results");
    noSearchResults.classList.toggle("no-search-results-inactive", false);
    noSearchResults.classList.toggle("no-search-results-active", true);
  }
  else if (query == "") {
    const noSearchResults = document.querySelector("#no-search-results");
    noSearchResults.classList.toggle("no-search-results-inactive", true);
    noSearchResults.classList.toggle("no-search-results-active", false);
  }
  else {
    const noSearchResults = document.querySelector("#no-search-results");
    noSearchResults.classList.toggle("no-search-results-inactive", true);
    noSearchResults.classList.toggle("no-search-results-active", false);
  }
})