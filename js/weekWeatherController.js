'use strict';

function weekWeatherController()
{
    var weatherService = new weatherDataService();

    weatherService.getWeekWeatherData().success(
        function(weekWeatherData)
        {
            var weekWeatherInfo = weatherService.getWeekWeatherInfo(weekWeatherData);

            init();
            clickEventHandler();

            // $('#js-forecast-day-1').click(function(){ painWeatherDetail(0) });
            // $('#js-forecast-day-2').click(function(){ painWeatherDetail(1) });
            // $('#js-forecast-day-3').click(function(){ painWeatherDetail(2) });
            // $('#js-forecast-day-4').click(function(){ painWeatherDetail(3) });
            // $('#js-forecast-day-5').click(function(){ painWeatherDetail(4) });

            function init()
            {
                successHandle();
                painWeatherPreview();
                painWeatherDetail(0);
                painWeatherIcon();
                painWeatherActive(1);
            }

            function clickEventHandler()
            {
                $('#js-forecast-day-1').click(
                    function()
                    {
                        painWeatherDetail(0);
                        painWeatherActive(1);
                    });
                $('#js-forecast-day-2').click(
                    function()
                    {
                        painWeatherDetail(1);
                        painWeatherActive(2);
                    });
                $('#js-forecast-day-3').click(
                    function(){
                        painWeatherDetail(2);
                        painWeatherActive(3);
                    });
                $('#js-forecast-day-4').click(
                    function()
                    {
                        painWeatherDetail(3);
                        painWeatherActive(4);
                    });
                $('#js-forecast-day-5').click(
                    function()
                    {
                        painWeatherDetail(4);
                        painWeatherActive(5);
                    });
            }

            function painWeatherActive(index)
            {
                $.each([1,2,3,4,5],
                    function(k,i)
                    {
                        if(i === index)
                        {
                            $('#js-forecast-day-' + i).addClass('-active');
                        }
                        else
                        {
                            $('#js-forecast-day-' + i).removeClass('-active');
                        }
                    });
            }

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
                            '<td>' + value.main.temp + '</td>' +
                            '<td>' + value.main.temp_min + '</td>' +
                            '<td>' + value.main.temp_max + '</td>' +
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
    }).fail( function(){ failHandle(); } );

    function successHandle()
    {
        $('#js-week-success').show();
        $('#js-week-fail').hide();
    }

    function failHandle()
    {
        $('#js-week-success').hide();
        $('#js-week-fail').show();
    }
};
