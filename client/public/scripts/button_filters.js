function allButton() {
    // Filter images by category
    const gridItems = document.querySelectorAll(".grid-item");
    document.getElementById("more-filters").style.display = "none";
    gridItems.forEach((item) => {
        item.style.display = "grid"; // Display all items
    });
}

function surfButton() {
    // Filter images by category
    const gridItems = document.querySelectorAll(".grid-item");
    document.getElementById("more-filters").style.display = "none";
    gridItems.forEach((item) => {
        const itemCategory = item.getAttribute("product-style")
        if (itemCategory == "surf") {
            item.style.display = "grid"; // Display matching items
        }
        else {
            item.style.display = "none"; // Hide non-matching items
        }
    });
}

function cityButton() {
    // Filter images by category
    const gridItems = document.querySelectorAll(".grid-item");
    document.getElementById("more-filters").style.display = "none";
    gridItems.forEach((item) => {
        const itemCategory = item.getAttribute("product-style")
        if (itemCategory == "city") {
            item.style.display = "grid"; // Display matching items
        }
        else {
            item.style.display = "none"; // Hide non-matching items
        }
    });
}

function allFilters() {
    const moreFilters = document.getElementById("more-filters");
    // if More is clicked, but the filters are already displayed, this will stop displaying them
    if (moreFilters.style.display == "block") {
        moreFilters.style.display = "none";
    }
    // Otherwise, the other filters will be displayed and the price graph will be created
    else {
        moreFilters.style.display = "block";
        createPriceGraph();
    }
}

function createPriceGraph() {
    const ctx = document.getElementById('price-histogram').getContext('2d');

    // Pull all active products
    var active_products = document.querySelectorAll('.grid-item');

    // Filter out elements with display set to "none"
    active_products = Array.from(active_products).filter(product => product.style.display !== "none");

    // Calculate how many columns to have
    var lowest_price = 999999;
    var highest_price = -999999;
    active_products.forEach(function (product) {
        var product_price = +product.querySelector('#item-price').textContent.substring(1);
        if (product_price > highest_price) {
            highest_price = product_price;
        }
        if (product_price < lowest_price) {
            lowest_price = product_price;
        }
    })
    var ranges = generatePriceRanges(lowest_price, highest_price);

    // For loop to tally products within price category
    active_products.forEach(function (product) {
        var product_price = +product.querySelector('#item-price').textContent.substring(1);
        updateTally(product_price, ranges)
    })

    // Extract tally values from the ranges
    var tallyValues = ranges.map(function (range) {
        return range.tally;
    });

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ranges.map(function (range) {
                return `$${range.start}`;
            }),
            datasets: [{
                label: 'Number of Products',
                data: tallyValues,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                fill: true, // Fill the area below the line
            }]
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        autoSkip: false,
                        display: true,
                    },
                    gridLines: {
                        display: false,
                    },
                    scaleLabel: {
                        display: false, // Hide x-axis title
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        display: false, // Hide y-axis ticks
                    },
                    gridLines: {
                        display: false,
                    },
                    scaleLabel: {
                        display: false, // Hide y-axis title
                    }
                }]
            }
        }
    });

    // // Set the maximum height of the canvas
    // const maxHeight = window.innerHeight / 10;

    // // Get the canvas element
    // const canvas = document.getElementById('price-histogram');

    // // Set the canvas height based on the maximum height
    // canvas.style.height = `${maxHeight}px`;

    // // Redraw the chart after adjusting the canvas size
    // chart.update();



}

function generatePriceRanges(lowestPrice, highestPrice) {
    // Calculate the difference between the highest and lowest prices
    var priceDifference = highestPrice - lowestPrice;

    // Determine the range size based on the difference
    var rangeSize;
    if (priceDifference >= 500) {
        rangeSize = 100;
    } else if (priceDifference >= 250) {
        rangeSize = 50;
    } else {
        rangeSize = 25;
    }

    // Calculate the number of ranges needed
    var numberOfRanges = Math.max(Math.ceil(priceDifference / rangeSize), 4);

    // Initialize an array to store the ranges
    var priceRanges = [{ start: 0, end: 0, tally: 0 }];

    // Generate ranges
    for (var i = 0; i < numberOfRanges; i++) {
        var startRange = lowestPrice + i * rangeSize;
        var endRange = startRange + rangeSize;

        // Round to 2 decimal places for better readability
        startRange = parseFloat(startRange.toFixed(2));
        endRange = parseFloat(endRange.toFixed(2));

        // Add the range to the array
        priceRanges.push({ start: startRange, end: endRange, tally: 0 });
    }

    priceRanges.push({ start: highestPrice, end: highestPrice, tally: 0 });

    return priceRanges;
}

function updateTally(price, ranges) {
    for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        if (price >= range.start && price <= range.end) {
            range.tally++;
            break;  // Break out of the loop once the range is found
        }
    }
}