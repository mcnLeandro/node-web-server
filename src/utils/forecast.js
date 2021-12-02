const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=23e922ff3b34285d423b9745c3ad1472&query=${long},${lat}&units=f`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect ot weather servise!!', undefined)
        } else if(body.error) {
            callback('Unable to find location!!', undefined)
        } else {
            const current = body.current
            callback(undefined, {
                weather_description :current.weather_descriptions[ 0 ],
                temperature :current.temperature,
                feelslike :current.feelslike,
            })
        }
    })
}

module.exports = forecast