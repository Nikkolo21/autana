const wc = require('which-country'); //Geo reverse country

const _showPosition = (position) => {
    console.log(wc([position.coords.longitude, position.coords.latitude]));
} //Geolocalization

export const _getLocation = () => {
    navigator.geolocation ?
        navigator.geolocation.getCurrentPosition(_showPosition)
        : console.log("Geolocation is not supported by this browser.");
}