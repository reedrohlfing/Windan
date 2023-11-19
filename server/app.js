const express = require('express');
const app = express();
const port = 3000;

// Register view engine, automatically looks in views folder
app.set('view engine', 'ejs');
app.set('views', 'server/views/')

app.use(express.static('client/public'))

// app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/wishlist', (req, res) => {
    res.render('wishlist')
});

app.get('/recommendations', (req, res) => {
    res.render('recommendations')
});

// Redirect requests that haven't been made yet
app.get('/advertising', (req, res) => {
    res.redirect('/')
})
app.get('/get-updates', (req, res) => {
    res.redirect('/')
})

app.post('/submit', (req, res) => {
    const { name, email, recommendation } = req.body;
    const responseText = `Name: ${name}\nEmail: ${email}\nRecommendation: ${recommendation}\n\n`;

    appendFile('responses.txt', responseText, (err) => {
        if (err) throw err;
        console.log('Response saved to responses.txt');
    });

    res.send('Response submitted successfully!');
});

// If not matches are found above, this page will be loaded
app.use((req, res) => {
    console.log("No page matches found");
    res.status(404).redirect('/');
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
