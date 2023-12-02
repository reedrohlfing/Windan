function responseFormSubmit(event) {
    console.log("Response Form Submitted");
    event.preventDefault();  // Prevent the default form submission behavior
    // Use Axios to send a POST request to the server
    const form = document.getElementById('response-form')
    axios.post('/submit', {
        // Include the data you want to send in the request body
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        recommendation: form.querySelector('#recommendation').value
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => {
            console.log(result)
            // Update the DOM or show a success message
            showSuccessMessage();
            // Reset the form
            form.reset();
        })
        .catch(err => console.log(err))
}

function showSuccessMessage() {
    // Hide the rec form
    document.getElementById('rec-form').style.display = "none";

    // Add code to display a success message to the user
    const successMessage = document.createElement('div');
    successMessage.innerHTML = 'Form submitted successfully!';
    successMessage.classList.add('success-message');
    successMessage.style.textAlign = 'center';
    successMessage.style.paddingTop = '50px';
    successMessage.style.paddingBottom = '50px';
    document.getElementById("middle-section").appendChild(successMessage);
    console.log("success message");

    // Optionally, you can set a timeout to remove the success message after a few seconds
    setTimeout(() => {
        successMessage.remove();
        document.getElementById('rec-form').style.display = "block";
    }, 5000); // Remove after 5 seconds (adjust as needed)
}


document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded...");

    // Show back button
    document.getElementById("back-button").style.display = "block";

    // Stop showing loading circle
    document.getElementById("loading-container").style.display = "none";
})