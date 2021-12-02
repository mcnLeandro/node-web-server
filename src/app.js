const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()
const port = 3000
const publicDirecryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../tamplates/views')
const partialsPath = path.join(__dirname, '../tamplates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirecryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Leandro!"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'common help!',
        name: 'leandrooo'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "ghaaaaa",
        name:'leandri'
    })
})

app.get('/weather', (req, res) => {

    const sendError = (error) => {
        res.send({
            error: error
        })
    }

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address!!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    
        if (error) return sendError(error);
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if (error) return sendError(error);
    
    
            console.log(location)
            console.log('Data', forecastData)
            return res.send({
                forecast:forecastData,
                location: location,
                address: req.query.address
            })
        })
    
    })

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'you must provide a serce term'
        })
    }
    res.send({
        products:[]
    })

})

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: '404',
        name: "Leandro",
        errorMessage: 'Helpe article not found'
    })
})
app.get('*', (req, res) => {
    res.render("404", {
        title: '404',
        name: "Leandro",
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})
