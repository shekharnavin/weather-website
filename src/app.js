const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast');
const request = require('request');

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials/')


// Define paths for Engine config
app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerPartials(partialsPath, ()=>{
    console.log("Partial are registered");
});
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    else{
        //console.log(req.query.search);
        res.send({
            products:[]
        })
    }   
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/help/test', (req, res)=>{
    res.render('404', {
        title: 'test',
        name: "Andrew Mead",
        errorMessage: 'test article not found!!!'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: "Andrew Mead",
        errorMessage: 'Help article not found!!!'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){        
        return res.send({
            error: "You must proovide an address!!"
        })
    }
    else{        
        geocode(req.query.address, (error, data) => {
            if (error) {
                return res.send({error})
            }            
            forecast(data, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
    
                console.log(forecastData)
                res.send({
                    forcast: forecastData.forcast,
                    "location": forecastData.location,                    
                    address: req.query.address
                })
            })
        })
    }
})


app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: "Andrew Mead",
        errorMessage: 'Page not found!!!'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})