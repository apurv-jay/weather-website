const request = require('request');

const forecast = (latitude, longitude, callback) =>{
    const url='http://api.weatherstack.com/current?access_key=b1b314a322f16d2a1312c8ef0c086098&query='+ latitude + ',' + longitude + '&units=f'

    request({url : url , json : true}, (error,response) => {
        if(error)//for internet
        {
            callback("Unable to connect to webservies", undefined);
        }
        else if(response.body.error)
        {
            callback("Location not found",undefined);
        }
        else
        {

            callback(undefined,{
                temperature : response.body.current.temperature,
                locate : response.body.location
            })
        }
    })

}

module.exports = forecast;