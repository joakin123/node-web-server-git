const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const { toUpper, upperCase } = require('lodash');
const path = require('path');

var app = express();
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
//adding middleware to express
app.use(express.static(__dirname + '/public')); //this add the directory path along side every header request
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log); 
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append file into server.log.');
        }
    })
    next();  // this next() function tells express the middleware his done with task
});

/*app.use((req, res, next) => {
    res.render('maintenance');
});*/


//Handlebars Helpers
var hbs = exphbs.create({});
hbs.handlebars.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.handlebars.registerHelper('screamIt', (text) => {
    return text + 'i am here';
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello World!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page'
    }); 
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});
app.listen(3000, () => {
    console.log('server is up in port 3000');
}); 