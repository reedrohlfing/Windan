const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

// Register view engine, automatically looks in views folder
app.set('view engine', 'ejs');
app.set('views', 'server/views/')

app.use(express.static('client/public'))

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Initialize
// localStorage.setItem("currentPage", 1)
// localStorage.setItem("productInfo", "product_info.json")

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/home', (req, res) => {
    res.render('home')
});

app.get('/wishlist', (req, res) => {
    res.render('wishlist')
});

app.get('/recommendations', (req, res) => {
    res.render('recommendations')
});

// Render categories / filters
app.get('/surf', (req, res) => {
    res.render('index')
});

app.get('/city', (req, res) => {
    res.render('index')
});

app.get('/tops', (req, res) => {
    res.render('index')
});

app.get('/bottoms', (req, res) => {
    res.render('index')
});

app.get('/shorts', (req, res) => {
    res.render('index')
});

app.get('/shoes', (req, res) => {
    res.render('index')
});

app.get('/accessories', (req, res) => {
    res.render('index')
});

// // Redirect requests that haven't been made yet
// app.get('/advertising', (req, res) => {
//     res.redirect('/')
// })
// app.get('/get-updates', (req, res) => {
//     res.redirect('/')
// })

app.post('/submit', (req, res) => {
    console.log("Submit was clicked")
    const { name, email, recommendation } = req.body;
    console.log(req.body)
    const responseText = `Name: ${name}\nEmail: ${email}\nRecommendation: ${recommendation}\n\n`;

    fs.appendFile('responses.txt', responseText, (err) => {
        if (err) throw err;
        console.log('Response saved to responses.txt');
    });

    res.send('Response submitted successfully!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
