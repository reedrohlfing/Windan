function clickSearch() {
  const filterButtons = document.getElementById("filter-buttons")
  const headerContainer = document.querySelector(".header-container")
  const searchContainer = document.querySelector(".search-container")
  const headerTitle = document.querySelector(".header-title")
  const searchInput = document.getElementById("search-input")
  const searchClose = document.getElementById("close-search-button")
  const wishlistSaves = document.getElementById("wishlist-saves-button")
  const gridContainer = document.querySelector(".grid-container")
  const middleContainer = document.querySelector(".middle-section")
  const searchResultsContainer = document.querySelector(".search-results-container")
  const loadMoreContainer = document.querySelector(".load-more-container")
  if (filterButtons.style.display === "none" || filterButtons.style.display === "") {
    // Stop displaying the Title
    headerTitle.style.display = "none"

    // Stop displaying the wishlist saves button
    wishlistSaves.style.display = "none"

    // Stop displaying the load more container
    loadMoreContainer.classList.toggle("hide", true)

    // Show the search/filter bar
    searchContainer.style.display = "contents" // Show the search bar
    searchResultsContainer.classList.toggle("hide", false) // Show the search results
    searchClose.style.display = "block" // Show search close icon
    filterButtons.style.display = "grid" // Show the filter buttons
    middleContainer.style.marginTop = "96px" // Make space for filter buttons
    searchInput.focus(); // Focus on the search input to open the keyboard
  } else {
    // This will be executed when the search icon is clicked while search bar is open
    // Hide search bar, close button, and filter nav
    searchContainer.style.display = "none" // Hide search bar
    searchClose.style.display = "none" // Hide close icon
    filterButtons.style.display = "none" // Hide the filter buttons

    // Show the Title
    headerTitle.style.display = "block"

    // Show the wishlist saves button
    wishlistSaves.style.display = "block"

    // Move grid back up and display
    middleContainer.style.marginTop = "64px"
  }
}

function closeSearch() {
  const filterButtons = document.getElementById("filter-buttons")
  const searchContainer = document.querySelector(".search-container")
  const headerTitle = document.querySelector(".header-title")
  const searchClose = document.getElementById("close-search-button")
  const searchInput = document.getElementById("search-input")
  const wishlistSaves = document.getElementById("wishlist-saves-button")
  const gridContainer = document.querySelector(".grid-container")
  const middleContainer = document.querySelector(".middle-section")
  const searchResultsContainer = document.querySelector(".search-results-container")
  const loadMoreContainer = document.querySelector(".load-more-container")
  const gridItems = document.querySelectorAll(".grid-item");

  // Clear the search input
  searchInput.value = ""

  // Hide search bar, close button, and filter nav
  searchContainer.style.display = "none" // Hide search bar
  searchClose.style.display = "none" // Hide close icon
  filterButtons.style.display = "none" // Hide the filter buttons

  // Hide the search results container
  searchResultsContainer.classList.toggle("hide", true)

  // Show the Title
  headerTitle.style.display = "block"

  // Show the wishlist saves button
  wishlistSaves.style.display = "block"

  // Show the load more button
  loadMoreContainer.classList.toggle("hide", false)

  // Move grid back up
  middleContainer.style.marginTop = "64px"

  // Show the grid Container
  gridContainer.classList.toggle("hide", false);

  // Stop displaying no search results if present
  const noSearchResults = document.querySelector("#no-search-results");
  noSearchResults.classList.toggle("no-search-results-inactive", true);
  noSearchResults.classList.toggle("no-search-results-active", false);

}

var allProductData; // Declare allProductData in the outer scope
// Fetch product data from the external source
function fetchProductData() {
  // Get all products
  console.log("Fetching data...");
  fetch("product_info.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("Data received:", data);
      allProductData = data; // Assign data to allProductData
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
}

// Search Bar main functionality
var searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", input => {
  // Get all products
  fetchProductData();
  const gridContainer = document.querySelector(".grid-container");
  const query = input.target.value.toLowerCase();
  console.log(query);

  // Hide grid container
  gridContainer.classList.toggle("hide", true);

  // Remove any previous search contents
  const searchResultsContainer = document.querySelector(".search-results-container")
  while (searchResultsContainer.firstChild) {
    searchResultsContainer.removeChild(searchResultsContainer.firstChild);
  }

  // Initiate match variable
  let match = false;
  let matches = [];

  // Loop through grid items and check if their title/description matches the query
  console.log(allProductData)
  allProductData.forEach((product) => {
    // Get the description and title of the current item
    const description = product.description.toLowerCase();
    const title = product.title.toLowerCase();

    // Checks to see if the item matched, creates a bool
    const isMatch = description.includes(query) || title.includes(query);

    // Create a list of matches then create new gridContainer
    if (isMatch) {
      match = true;
      matches.push(product);
    }
  })


  // Only display "No Results" message is there are no results from search
  if (!match) {
    const noSearchResults = document.querySelector("#no-search-results");
    noSearchResults.classList.toggle("no-search-results-inactive", false);
    noSearchResults.classList.toggle("no-search-results-active", true);
  }
  else if (query == "") {
    gridContainer.classList.toggle("hide", false);
    const noSearchResults = document.querySelector("#no-search-results");
    noSearchResults.classList.toggle("no-search-results-inactive", true);
    noSearchResults.classList.toggle("no-search-results-active", false);
  }
  else {
    // There are matches
    const noSearchResults = document.querySelector("#no-search-results");
    noSearchResults.classList.toggle("no-search-results-inactive", true);
    noSearchResults.classList.toggle("no-search-results-active", false);

    // After for loop completes, create grid Container based on items in list
    matches.forEach(product => {
      var gridItem = buildGridItem(product);
      searchResultsContainer.appendChild(gridItem);
    })
  }
})