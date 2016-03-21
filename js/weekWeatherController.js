'use strict';

$(function()
{
    var weatherService = new weatherDataService();

    weatherService.getCurrentWeatherData().success(
        function(weatherData)
        {
            console.log('Get current weather info.')
            console.log(weatherService.getWeatherInfo(weatherData));
        }
    )

    weatherService.getWeekWeatherData().success(
        function(weatherData)
        {
            var weekWeatherInfo = [];

            _.map(weatherData.list, function(timeSlotWeather)
            {
                var weatherInfo = weatherService.getWeatherInfo(timeSlotWeather);

                if(_.find(weekWeatherInfo, { date: weatherInfo.date }) === undefined)
                {
                    weekWeatherInfo.push({ date : weatherInfo.date, info : [] });
                }

                var idx = weekWeatherInfo.length-1;

                if(_.find(weekWeatherInfo[idx].info, { time: weatherInfo.time }) === undefined )
                {
                    weekWeatherInfo[idx].info.push(weatherInfo);
                }
            });

            painWeatherPreview();
            painWeatherDetail(0);
            painWeatherIcon();

            $('#js-forecast-day-1').click(function(){ painWeatherDetail(0) });
            $('#js-forecast-day-2').click(function(){ painWeatherDetail(1) });
            $('#js-forecast-day-3').click(function(){ painWeatherDetail(2) });
            $('#js-forecast-day-4').click(function(){ painWeatherDetail(3) });
            $('#js-forecast-day-5').click(function(){ painWeatherDetail(4) });

            function painWeatherIcon()
            {
                $('#js-forecast-day-1 .weather-pic').addClass('-' + weekWeatherInfo[0].info[0].weather[0].main);
                $('#js-forecast-day-2 .weather-pic').addClass('-' + weekWeatherInfo[1].info[0].weather[0].main);
                $('#js-forecast-day-3 .weather-pic').addClass('-' + weekWeatherInfo[2].info[0].weather[0].main);
                $('#js-forecast-day-4 .weather-pic').addClass('-' + weekWeatherInfo[3].info[0].weather[0].main);
                $('#js-forecast-day-5 .weather-pic').addClass('-' + weekWeatherInfo[4].info[0].weather[0].main);
            }

            function painWeatherPreview()
            {
                $('#js-forecast-day-1 .weather-date').text(weekWeatherInfo[0].date);
                $('#js-forecast-day-2 .weather-date').text(weekWeatherInfo[1].date);
                $('#js-forecast-day-3 .weather-date').text(weekWeatherInfo[2].date);
                $('#js-forecast-day-4 .weather-date').text(weekWeatherInfo[3].date);
                $('#js-forecast-day-5 .weather-date').text(weekWeatherInfo[4].date);

                $('#js-forecast-day-1 .weather-state').text(weekWeatherInfo[0].info[0].weather[0].main);
                $('#js-forecast-day-2 .weather-state').text(weekWeatherInfo[1].info[0].weather[0].main);
                $('#js-forecast-day-3 .weather-state').text(weekWeatherInfo[2].info[0].weather[0].main);
                $('#js-forecast-day-4 .weather-state').text(weekWeatherInfo[3].info[0].weather[0].main);
                $('#js-forecast-day-5 .weather-state').text(weekWeatherInfo[4].info[0].weather[0].main);

                $('#js-forecast-day-1 .weather-state-desc').text(weekWeatherInfo[0].info[0].weather[0].description);
                $('#js-forecast-day-2 .weather-state-desc').text(weekWeatherInfo[1].info[0].weather[0].description);
                $('#js-forecast-day-3 .weather-state-desc').text(weekWeatherInfo[2].info[0].weather[0].description);
                $('#js-forecast-day-4 .weather-state-desc').text(weekWeatherInfo[3].info[0].weather[0].description);
                $('#js-forecast-day-5 .weather-state-desc').text(weekWeatherInfo[4].info[0].weather[0].description);
            }

            function painWeatherDetail(day)
            {
                $('#js-weather-detail-table').empty();

                $.each(weekWeatherInfo[day].info,
                    function(key, value)
                    {
                        var content =
                            '<tr>' +
                            '<td>' + value.time + '</td>' +
                            '<td>' + Math.round((value.main.temp - 273.15)*10)/10 + '</td>' +
                            '<td>' + Math.round((value.main.temp_min - 273.15)*10)/10 + '</td>' +
                            '<td>' + Math.round((value.main.temp_max - 273.15)*10)/10 + '</td>' +
                            '<td>' + value.main.humidity + '</td>' +
                            '<td>' + value.main.pressure + '</td>' +
                            '<td>' + value.weather[0].main + '</td>' +
                            '<td>' + value.clouds.all + '</td>' +
                            '<td>' + value.wind.speed + '</td>' +
                            '<td>' + value.rain['3h'] + '</td>' +
                            '<tr>';

                        $('#js-weather-detail-table').append(content);
                    });
            }


            console.log(weekWeatherInfo);
        });
});
