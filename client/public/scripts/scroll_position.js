function clickHeadTitle() {
    window.scrollTo(0, 0)
}

// Store scroll position before the refresh
window.addEventListener('beforeunload', () => {
    localStorage.setItem('scrollPosition', window.scrollY.toString());
});

// Retrieve and set scroll position after the page has loaded
window.addEventListener('load', () => {
    const scrollPosition = localStorage.getItem('scrollPosition');
    const currentPage = parseInt(localStorage.getItem("currentPage"));
    console.log("Page load: ", currentPage)
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        localStorage.removeItem('scrollPosition'); // Optional: clear the stored position
    }
});

window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.header-container');
    var filterbar = document.getElementById('filter-container');
    var scrollPosition = window.scrollY;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // If on a larger screen, adjust the navbar to flex
    if (windowWidth > 1200) {
        if (scrollPosition > 30) {
            navbar.style.width = '75%';
            navbar.style.borderRadius = '10px';
            if (filterbar) {
                filterbar.style.width = '67.5%';
            }
        } else {
            navbar.style.width = '100%';
            navbar.style.borderRadius = '0';
            if (filterbar) {
                filterbar.style.width = '90%';
            }
        }
    }
});


