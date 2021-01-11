




$('form input').keydown(function (e) {
    if (e.keyCode == 13) {
        console.log("enter key");
        e.preventDefault();
        return false;
    }
});


$('.alert').alert();


    var enjoyhint_instance = new EnjoyHint({});

var enjoyhint_script_steps = [{
    'next .patienttour': 'if you are not a doctor or a pharmacist register from here'
}, {
    'click .guidetour': 'You also can read guides from here'
}];


enjoyhint_instance.set(enjoyhint_script_steps);

enjoyhint_instance.run();

