const axios = require('axios');
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const apiKey = '61da6ab2da16d13e50192e5c52c6f345';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';

async function getWeather(city) {
    try {
        console.log("GET", city, baseURL)
        const response = await axios.get(baseURL, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric'
            }
        });

        const data = response.data;
        console.log(`Weather in ${data.name}:`);
        console.log(`Temperature: ${data.main.temp}°C`);
        console.log(`Weather: ${data.weather[0].description}`);
        console.log(`Humidity: ${data.main.humidity}%`);
        console.log(`Wind Speed: ${data.wind.speed} m/s`);
        return data
    } catch (error) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    }

}
app.get('/:location', async (req, res) => {
    let { location } = req.params
    console.log("Location", location);
    const getData = await getWeather(location);
    res.send(getData)

})

app.listen(5000, () => {
    console.log('Server Running at http://localhost:5000')
})


