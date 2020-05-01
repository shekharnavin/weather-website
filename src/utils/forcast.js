const request = require('request')

const forecast = (data, callback) => {   
    const url = 'http://api.weatherstack.com/current?access_key=2b79f5b8119c4008bf6a1b256e7102c6&query=' + data.latitude + ',' + data.longitude
    console.log(url);
    request({ url: url, json: true }, (error, response = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {            
            callback('Unable to find location', undefined)
        } else {            
            callback(undefined, {
                "forcast": response.body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.feelslike + '% chance of rain.',
                "location": response.body.location.name + "," + response.body.location.region+ "," + response.body.location.country
            })
        }
    })
}

module.exports = forecast