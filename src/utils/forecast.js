const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=28817f2cc4695c9fb40774e8ff3eed80&query="+latitude+","+longitude
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback("Cant connect to the api",undefined)
        }
        else if(body.error){
            callback(response.body.error.info,undefined)
        }
        else{
            callback(undefined, {
                description :body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                feelslike : body.current.feelslike
            })
        }
    })

}
module.exports = forecast