$(document).ready(() => {
    var element = $('meta[name="active-menu"]').attr('content');
    $('#' + element).addClass('active');
});