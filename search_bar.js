function navbarFilters() {
  const filterButtons = document.getElementById("filter-buttons");
  const searchContainer = document.querySelector(".search-container");
  const headerContainer = document.querySelector(".header-container");
  const headerTitle = document.querySelector(".header-title");
  const headerLeft = document.querySelector(".header-column-left");
  const headerRight = document.querySelector(".header-column-right");
  if (filterButtons.style.display === "none" || filterButtons.style.display === "") {
    filterButtons.style.display = "grid"; // Show the filter buttons
    // Show the search bar and hide the other navbar stuff
    headerContainer.style.gridTemplateColumns = "1fr 2.5fr";
    searchContainer.style.display = "contents";
    headerTitle.style.display = "none"
    headerRight.style.display = "none"
    headerLeft.style.justifyContent = "center" //"right"

  } else {
    filterButtons.style.display = "none"; // Hide the filter buttons
    searchContainer.style.display = "none"; // Hide search bar
    headerContainer.style.gridTemplateColumns = "1fr 1.5fr 1fr";
    headerTitle.style.display = "contents"
    headerRight.style.display = "contents"
    headerLeft.style.justifyContent = "center"
  }
}

function searchTags() {
  // Get references to the search input
  const searchInput = document.getElementById("search-input");

  // Get the search query from the input
  const query = searchInput.value.toLowerCase();

  // Get all grid items
  const gridItems = document.querySelectorAll(".grid-item");

  // Loop through grid items and check if their description matches the query
  gridItems.forEach(function (item) {
    const description = item.dataset.description.toLowerCase();
    if (description.includes(query)) {
      item.style.display = "block"; // Show matching items
    } else {
      item.style.display = "none"; // Hide non-matching items
    }
  });
}