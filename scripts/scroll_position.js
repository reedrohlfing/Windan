// Store scroll position before the refresh
window.addEventListener('beforeunload', () => {
    localStorage.setItem('scrollPosition', window.scrollY.toString());
});

// Retrieve and set scroll position after the page has loaded
window.addEventListener('load', () => {
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        localStorage.removeItem('scrollPosition'); // Optional: clear the stored position
    }
});