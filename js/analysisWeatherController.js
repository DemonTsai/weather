'use strict';

function analysisWeatherChart()
{
    var weatherService = new weatherDataService();

    weatherService.getMonthWeatherData().success(
        function(weatherData)
        {
            var monthWeather = weatherService.getMonthWeatherInfo(weatherData);
            var xday = [], ytemp = [], ytemp_min = [], ytemp_max = [], yrain = [], ywind = [];

            for(var i=0 ; i<monthWeather.length ; i++)
            {
                xday.push(monthWeather[i].date.substr(5, monthWeather[i].date.length-5));
                ytemp.push(monthWeather[i].temp.day);
                ytemp_min.push(monthWeather[i].temp.min);
                ytemp_max.push(monthWeather[i].temp.max);
                yrain.push(monthWeather[i].rain);
                ywind.push(monthWeather[i].wind);
            }

            successCurrentHandle();

            $('#js-anay-temp').highcharts(
            {
                chart:      { type: 'spline' },
                title:      { text: 'Monthly Average Temperature' },
                subtitle:   { text: 'Source: WorldClimate.com' },
                xAxis:      { categories: xday },
                yAxis:
                {
                    title:  { text: 'Temperature' },
                    labels: { formatter: function(){return this.value + '°';} }
                },
                tooltip:
                {
                    crosshairs: true,
                    shared: true
                },
                plotOptions:
                {
                    spline:
                    {
                        marker:
                        {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series:
                [
                    {
                        name: 'Avg',
                        marker: { symbol: 'square' },
                        data: ytemp
                    },
                    {
                        name: 'Max',
                        marker: { symbol: 'diamond' },
                        data: ytemp_max
                    },
                    {
                        name: 'Min',
                        marker: { symbol: 'diamond' },
                        data: ytemp_min
                    }
                ]
            });

            $('#js-anay-rain').highcharts(
            {
                chart:      { type: 'spline' },
                title:      { text: 'Monthly Average Rain' },
                subtitle:   { text: 'Source: WorldClimate.com' },
                xAxis:      { categories: xday },
                yAxis:
                {
                    title:  { text: 'Rain' },
                    labels: { formatter: function(){return this.value + 'mm';} }
                },
                tooltip:
                {
                    crosshairs: true,
                    shared: true
                },
                plotOptions:
                {
                    spline:
                    {
                        marker:
                        {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series:
                [
                    {
                        name: 'rain',
                        marker: { symbol: 'square' },
                        data: yrain
                    }
                ]
            });

            $('#js-anay-wind').highcharts(
            {
                chart:      { type: 'spline' },
                title:      { text: 'Monthly Average Wind' },
                subtitle:   { text: 'Source: WorldClimate.com' },
                xAxis:      { categories: xday },
                yAxis:
                {
                    title:  { text: 'Wind' },
                    labels: { formatter: function(){return this.value + 'm/s';} }
                },
                tooltip:
                {
                    crosshairs: true,
                    shared: true
                },
                plotOptions:
                {
                    spline:
                    {
                        marker:
                        {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series:
                [
                    {
                        name: 'wind',
                        marker: { symbol: 'square' },
                        data: ywind
                    }
                ]
            });
        }).fail( function(){failCurrentHandle();} );

    function successCurrentHandle()
    {
        $('#js-analysis-success').show();
        $('#js-analysis-fail').hide();
    }

    function failCurrentHandle()
    {
        $('#js-analysis-success').hide();
        $('#js-analysis-fail').show();
    }
}
