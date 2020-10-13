const request = require('request')

const geocode = (address, callback) => {
    debugger
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic3llZG1iaHppIiwiYSI6ImNrZWV1YnN1bjBqM2czMG5zcDY4YWdoOGIifQ.pICwUuH3w06LMMWG7J-5qg&limit=1"
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Cant connect to the API", undefined)
        }
        else if (body.features.length === 0) {
            callback("Cant find result against the given Coordinates", undefined)
        }
        else {
            callback(undefined, {
                place_name: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}
module.exports = geocode