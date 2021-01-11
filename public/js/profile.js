$(function () {
    setInterval(function () {
        var tod = new Date()

        $("#currentdate").html(
            '<i class="fa fa-calendar"></i>' + Date().split('GMT+0200 (Eastern European Standard Time)')
        );
    }, 1000);
});



$("#cna").on("click", function () {

    var inputvalueID = $("#newadmin").val();
    if (inputvalueID >= 2) {
        $.ajax(
            {
                method: "POST",
                url: "profile",
                data: {
                    type: "ifone",
                    id: inputvalueID,
                },
                success: function (data, status) {
                    console.log("suc");

                    var numberOfUsers = ((JSON.parse(data)));
                    console.log(numberOfUsers);
                    if (numberOfUsers.length > 0) {
                        $.ajax(
                            {
                                method: "POST",
                                url: "profile",
                                data: {
                                    type: "createadmin",
                                    id: inputvalueID,

                                },
                                success: function (data, status) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Done...',
                                        text: 'This User Now Is An Admin',
                                    });



                                },
                                error: function (xhr, status, error) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'No user Found With This Id or some thing went wrong try again',
                                    });

                                },

                            }
                        );
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No user Found With This Id',
                        });
                    }


                },
                error: function (xhr, status, error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'some thing went wrong try again',
                    });

                },

            }
        );
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Id Should be greater than or equal 2',
        });
    }


});



$("#cash").on("click", function () {
    if ($("#newpasswordfield").val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You should fill passord field',
        });
    }
    else if ($("#newpasswordfield").val().length < 5) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Password should be greater than 5 char',
        });
    }
    else {
        $.ajax(
            {
                method: "POST",
                url: "profile",
                data: {
                    type: "password",
                    pass: $("#newpasswordfield").val(),

                },
                success: function (data, status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Done...',
                        text: 'Password Changed Successfully',
                    });



                },
                error: function (xhr, status, error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Some thing went wrong try again',
                    });

                },

            }
        );
    }
})



$("#signout").on("click", function () {
    $("#destroyForm").submit();
})