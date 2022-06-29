const request = require('request');


const geocode = (address , callback)=>{
    const url='http://us1.locationiq.com/v1/search?key=pk.ca6048fa37ab1f5332f68691de418347&q=' + address + '&format=json&limit=1'
    request({url : url , json : true},(error,response)=>{
        if(error)//for internet
        {
            callback('Unable to connect to service',undefined);
        }
        else if(response.body.error)//if location not available
        {
            callback('Unable to find the location',undefined);
        }
        else
        {
            callback(undefined,{latitude : response.body[0].lat, longitude : response.body[0].lon , place : response.body[0].display_name });
        }
    })
}

module.exports=geocode