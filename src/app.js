const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)
app.get('', (req, res) => {
    res.render('index', {
        title: "Index"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help"
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { place_name, latitude, longitude } = {}) => {
        if (error) {
            res.send({error})
            return
        }
        console.log(place_name)
        forecast(latitude, longitude, (error, { description, temperature, feelslike } = {}) => {
            if (error) {
                res.send({error})
                return
            }
            res.send({description, temperature, feelslike,place_name})
        })
    })
})
app.get('*', (req, res) => {
    res.send("<h1>Code 404</h1>")
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})