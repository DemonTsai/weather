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
    $('#' + state).show();
}
