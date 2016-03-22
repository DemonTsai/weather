'use strict';

function weatherDataService()
{
    this.Service =
    {
        getMonthWeatherData : getMonthWeatherData,
        getWeekWeatherData : getWeekWeatherData,
        getCurrentWeatherData : getCurrentWeatherData,
        getMonthWeatherInfo : getMonthWeatherInfo,
        getWeekWeatherInfo : getWeekWeatherInfo
    };

    return this.Service;

    function getMonthWeatherData()
    {
        return $.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=Taipei&units=metric&cnt=16&appid=7cd96eb82151316259beeeee9d2fe046');
    }

    function getWeekWeatherData()
    {
        return $.get('http://api.openweathermap.org/data/2.5/forecast?q=Taipei,TW&units=metric&appid=7cd96eb82151316259beeeee9d2fe046');
    }

    function getCurrentWeatherData()
    {
        return $.get('http://api.openweathermap.org/data/2.5/weather?q=Taipei,TW&units=metric&appid=7cd96eb82151316259beeeee9d2fe046');
    }

    function getMonthWeatherInfo(monthWeatherData)
    {
        var monthWeatherInfo = [];

        monthWeatherInfo.country = monthWeatherData.city.country;
        monthWeatherInfo.city = monthWeatherData.city.name;
        monthWeatherInfo.coordinate = monthWeatherData.city.coord;

        _.map(monthWeatherData.list, function(dayWeatherData)
        {
            var dayWeatherInfo = {};
            var timeValue = new Date(dayWeatherData.dt * 1000);
            var date = timeValue.getFullYear() + '.' + (timeValue.getMonth() + 1) + '.' + timeValue.getDate();
            var time = timeValue.getHours() + ':' + timeValue.getMinutes() + ':' + timeValue.getSeconds();

            dayWeatherInfo.date = date;
            dayWeatherInfo.time = time;
            dayWeatherInfo.temp = dayWeatherData.temp;
            dayWeatherInfo.pressure = dayWeatherData.pressure;
            dayWeatherInfo.humidity = dayWeatherData.humidity;
            dayWeatherInfo.weather = dayWeatherData.weather;
            dayWeatherInfo.wind = dayWeatherData.speed;
            dayWeatherInfo.deg = dayWeatherData.deg;
            dayWeatherInfo.clouds = dayWeatherData.clouds;
            dayWeatherInfo.rain = dayWeatherData.rain;

            monthWeatherInfo.push(dayWeatherInfo);
        });

        return monthWeatherInfo;
    }

    function getWeekWeatherInfo(weekWeatherData)
    {
        var weekWeatherInfo = [];

        weekWeatherInfo.country = weekWeatherData.city.country;
        weekWeatherInfo.city = weekWeatherData.city.name;
        weekWeatherInfo.coordinate = weekWeatherData.city.coord;

        _.map(weekWeatherData.list, function(timeSlotWeather)
        {
            var timeSlotInfo = {};
            var timeValue = _.split(timeSlotWeather.dt_txt, ' ');
            var date = timeValue[0], time = timeValue[1];
            var dayWeatherInfo = _.find(weekWeatherInfo, { date : date });

            timeSlotInfo.time = time;
            timeSlotInfo.weather = timeSlotWeather.weather;
            timeSlotInfo.clouds = timeSlotWeather.clouds;
            timeSlotInfo.main = timeSlotWeather.main;
            timeSlotInfo.wind = timeSlotWeather.wind;
            timeSlotInfo.rain = timeSlotWeather.rain;

            if(dayWeatherInfo === undefined)
            {
                dayWeatherInfo = { date : date, info : [] };
                weekWeatherInfo.push(dayWeatherInfo);
            }

            dayWeatherInfo.info.push(timeSlotInfo);
        });

        return weekWeatherInfo;
    }
}
