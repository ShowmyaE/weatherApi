const axios = require('axios');
const express=require('express')
const cors = require('cors')

const app=express()
app.use(express.json())
app.use(cors())
// Replace 'your_api_key' with your actual API key
const apiKey = '0f901f1cb3dd070737b7398651832e72';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';

async function getWeather(city) {
    try {
        console.log("GET", city, baseURL)
        const response = await axios.get(baseURL, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric' // 'metric' for Celsius, 'imperial' for Fahrenheit
            }
        });

        const data = response.data;
        console.log(`Weather in ${data.name}:`);
        console.log(`Temperature: ${data.main.temp}°C`);
        console.log(`Weather: ${data.weather[0].description}`);
        console.log(`Humidity: ${data.main.humidity}%`);
        console.log(`Wind Speed: ${data.wind.speed} m/s`);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
    }
    
}

// Example usage
getWeather('London');


app.get('/:location', async (req,res) => {
    let {location} = req.params
   console.log("Location", location);
   const getData = await getWeather('London');
   res.send(getData)

})


