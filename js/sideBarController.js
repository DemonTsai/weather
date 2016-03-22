'use strict';

function isActiveSideBar(index, state)
{
    $('#js-sidebar-menu > li').each(
        function()
        {
            $(this).removeClass('active');
        });
    $('#js-sidebar-menu li').eq(index).addClass('active');
    $('#js-main > .main-content').hide();

    showMainContentRoute(state);
}

function showMainContentRoute(state)
{
    $('#'+state).show();

    switch (state)
    {
        case 'js-week-weather':
            weekWeatherController();
            break;

        case 'js-analysis-weather':
            analysisWeatherChart();
            break;

        default:
            weekWeatherController();
    }
}
