const request = require('request')



const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=30088fb36eb2dda3c83bd80f4267d4f3&query=${latitude},${longitude}`
    request({url, json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather service.',undefined)
        }else if(body.error){
            callback('Unable to find location.')
        }else{
            callback(undefined,`It is ${body.current.weather_descriptions[0]} outside with ${body.current.temperature} degrees and ${body.current.precip}% chance of rain.`)
        }
    })
}


module.exports = forecast
