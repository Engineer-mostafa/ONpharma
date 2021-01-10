$(function () {
    setInterval(function () {
        var tod = new Date()

        $("#currentdate").html(
            '<i class="fa fa-calendar"></i>' + Date().split('GMT+0200 (Eastern European Standard Time)')
        );
    }, 1000);
});


