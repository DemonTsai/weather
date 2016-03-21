'use strict';

function weatherDataService()
{
    this.Service =
    {
        getWeekWeatherData : getWeekWeatherData,
        getCurrentWeatherData : getCurrentWeatherData,
        getWeatherInfo : getWeatherInfo
    };

    return this.Service;

    function getWeekWeatherData()
    {
        return $.get('http://api.openweathermap.org/data/2.5/forecast?q=Taipei,TW&appid=b1b15e88fa797225412429c1c50c122a');
    }

    function getCurrentWeatherData()
    {
        return $.get('http://api.openweathermap.org/data/2.5/weather?q=Taipei,TW&appid=b1b15e88fa797225412429c1c50c122a');
    }

    function getWeatherInfo(weatherData)
    {
        var weatherInfo = {};
        var timeValue = (weatherData.dt_txt !== undefined) ?_.split(weatherData.dt_txt, ' ') :weatherData.dt;

        //Set time & date
        if(timeValue instanceof Array)
        {
            weatherInfo.date = timeValue[0];
            weatherInfo.time = timeValue[1];
        }
        else
        {
            weatherInfo.time = timeValue;
        }

        //Fetch snow info
        if(weatherData.snow)
        {
            weatherInfo.snow = weatherData.snow;
        }

        //Fetch rain info
        if(weatherData.rain)
        {
            weatherInfo.rain = weatherData.rain;
        }

        weatherInfo.weather = weatherData.weather;
        weatherInfo.clouds = weatherData.clouds;
        weatherInfo.main = weatherData.main;
        weatherInfo.wind = weatherData.wind;

        return weatherInfo;
    }
}
