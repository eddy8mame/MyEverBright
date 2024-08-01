import axios from "axios";
import { apiKey } from "../constants";

//https://api.weatherapi.com/v1/current.json?key=f0fdc40e5e06442aaa483201240108&q=London&aqi=no

const forecastEndpoint = params=> `https://api.weatherapi.com/v1/forecast.json?key=${process.env.EXPO_PUBLIC_OPEN_WEATHER}&q=${params.cityName}&days=${params.days}`;
const locationsEndpoint = params=> `https://api.weatherapi.com/v1/search.json?key=${process.env.EXPO_PUBLIC_OPEN_WEATHER}&q=${params.cityName}`;
const apiCall = async (endpoint) => {
    const options = {
        method: 'GET',
        url: endpoint,
    };
      try{
        const { data } = await axios.request(options);
        return data
      } catch (err) {
        console.log('error: ',err);
        return {err: err};
    }
}

export const fetchWeatherForecast = params=>{
  let forecastUrl = forecastEndpoint(params);
  console.log('Forecase Url', forecastUrl)
    return apiCall(forecastUrl);
}

export const fetchLocations = params=>{
    let locationsUrl = locationsEndpoint(params);
    return apiCall(locationsUrl);
}