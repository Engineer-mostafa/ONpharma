




$('form input').keydown(function (e) {
    if (e.keyCode == 13) {
        console.log("enter key");
        e.preventDefault();
        return false;
    }
});


$('.alert').alert();
