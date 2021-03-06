const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', { //this is taking us to index.hbs in the views
        title: 'Weather',
        name: 'Apurva Verma'
    })
})

app.get('/about', (req, res) => { // this about is here for the link
    res.render('about', { //this about here identify the file name
        title: 'About Me',
        name: 'Apurva Verma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Apurva Verma'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({error : "Not found any address"});//since we are using data.error thats means we are taking error from a object so we need to pass a object
    }
    else
    {
        geocode(req.query.address,(error,{latitude , longitude , place}={})=>{
            if(error)
            {
                return res.send({error});
                
            }
            forecast(latitude , longitude, (error, {temperature,windspeed,feelslike}={})=>{
                if(error)
                {
                    return res.send({error});
                }
                res.send({
                    forecast: 'The temperature in ' + req.query.address + ' is ' + temperature + ' F. But it feelike '+ feelslike + ' F, with a windspeed of ' + windspeed +' .',
                    location: place,
                    address : req.query.address
                })
                // console.log(data.place);
                // console.log(forecastdata.temperature);
            })
        })
    }
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Apurva Verma',
        errormessage : 'help not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Apurva Verma',
        errormessage : 'pagenotfound'

    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });