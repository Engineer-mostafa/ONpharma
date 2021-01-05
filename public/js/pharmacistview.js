
function reloadStock() {
    $("#spinner").addClass("show");

        $.ajax(
            {
                method: "POST",
                url: "pharmacistview",
                data: {
                    type: "pharmacistview",
                },
                success: function (data, status) {
                 $("#spinner").removeClass("show");

                    console.log("suc");
                    $('#stocktable').empty();

                    var stockItems = ((JSON.parse(data)));
                    stockItems.forEach(element => {
                        $('#stocktable').append(
                            "<tr>" +
                            "<td>" +
                            element.item_name +
                            "</td>" +
                            "<td>" +
                            element.item_quantity +
                            "</td>" +
                            "<td>" +
                            element.item_price +
                            "</td>" +
                            "<td>" +
                            `<svg class=${element.item_name}></svg>` +
                            "</td>" +
                            "</tr>");

                        JsBarcode(`.${element.item_name}`, element.item_id_barcode, {
                            font: "fantasy",
                            displayValue: false
                        });

                        var svg = $(`.${element.item_name}`)[0];
                        console.log("svg =" + svg);
                        var xml = new XMLSerializer().serializeToString(svg);



                    }
                    );




                    //for all medicines in pharmacy
                    $.ajax(
                        {
                            method: "POST",
                            url: "pharmacistview",
                            data: {
                                type: "all_med",

                            },
                            success: function (data, status) {
                                console.log("suc");
                                $('#all_med').empty();

                                var all_med = ((JSON.parse(data)));
                                all_med.forEach(element => {
                                    $('#all_med').append(
                                        "<option value ='" + element.item_name + "'>" +
                                        element.item_name +
                                        "</option>"
                                    );
                                }
                                );

                            },
                            error: function (xhr, status, error) {
                                console.log("fialed");

                                console.log(xhr);
                                console.log(status);
                                console.log(error);

                            },

                        }
                    );





                    // medicine in my stock to search
                    $.ajax(
                        {
                            method: "POST",
                            url: "pharmacistview",
                            data: {
                                type: "med_stock",

                            },
                            success: function (data, status) {
                                console.log("suc");
                                $('#med_stock').empty();
                                $('#edit_med').empty();

                                var med_stock = ((JSON.parse(data)));
                                med_stock.forEach(element => {
                                    $('#med_stock').append(
                                        "<option value ='" + element.item_name + "'>" +
                                        element.item_name +
                                        "</option>"
                                    );
                                    $('#edit_med').append(
                                        "<option value ='" + element.item_name + "'>" +
                                        element.item_name +
                                        "</option>"
                                    );
                                }
                                );

                            },
                            error: function (xhr, status, error) {
                                console.log("fialed");

                                console.log(xhr);
                                console.log(status);
                                console.log(error);

                            },

                        }
                    );




                },
                error: function (xhr, status, error) {
                    console.log("fialed");
                    alert("Sorry Wrong Thing had done check the inputs again");
                    console.log(xhr);
                    console.log(status);
                    console.log(error);

                },

            }
        );


    
}




if ($("#stock-tab").hasClass("active")) {
    console.log("hidden");

    $(".med_stock").hide();
    $(".search").hide();
}

if ($("#stock-tab").on("click", function () {
    console.log("hidden");

    $(".med_stock").hide();
    $(".search").hide();
}));


if ($("#item-tab").on("click", function () {
    console.log("show");
    $(".med_stock").show();
    $(".search").show();

}));


$(".search").on("click", function () {
    $("#spinner").addClass("show");

    console.log($("#med_stock").val());
    if ($("#med_stock").val()) {
        console.log("i will get the  med");

        $.ajax(
            {
                method: "POST",
                url: "pharmacistview",
                data: {
                    type: "search",
                    item_name: $("#med_stock").val()
                },
                success: function (data, status) {
                    $("#spinner").removeClass("show");

                    console.log("suc");
                    $('#specificItem').empty();

                    var specificstockItems = ((JSON.parse(data)));
                    if (specificstockItems != "") {
                        specificstockItems.forEach(element => {
                            $('#specificItem').append(
                                "<tr>" +
                                "<td>" +
                                element.item_name +
                                "</td>" +
                                "<td>" +
                                element.item_quantity +
                                "</td>" +
                                "<td>" +
                                element.item_price +
                                "</td>" +
                                "<td>" +
                                `<svg class=${element.item_name}></svg>` +
                                "</td>" +
                                "</tr>");

                            JsBarcode(`.${element.item_name}`, element.item_id_barcode, {
                                font: "cooper black",
                                displayValue: false
                            });

                            var svg = $(`.${element.item_name}`)[0];
                            console.log("svg =" + svg);
                            var xml = new XMLSerializer().serializeToString(svg);



                        }
                        );
                    }
                    else {
                        alert("you Dont Have this Medicine")
                    }




                },
                error: function (xhr, status, error) {
                    console.log("fialed");
                    alert("Sorry Wrong Thing had done check the inputs again and check the spelling of the Medicine");
                    console.log(xhr);
                    console.log(status);
                    console.log(error);

                },

            }
        );
    }
    else {
        alert("You Should Enter The Name Of Medicine");
    }



});


//add new
$("#additemtomystock").on("click", function () {
    var addquantity = $("#qadditemtomystock").val();
    if (addquantity && addquantity >= 0) {
        $.ajax(
            {
                method: "POST",
                url: "pharmacistview",
                data: {
                    type: "additemtomystock",
                    Quantity: addquantity,
                    name: $("#all_med").val(),

                },
                success: function (data, status) {
                    console.log("suc");
                    Swal.fire(
                        'Good job!',
                        'Item Added Successfully',
                        'success'
                    );
                    reloadStock();
                },
                error: function (xhr, status, error) {
                    console.log("fialed");
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Somthing Went Wrong try agian later',

                    });
                },

            }
        );

    }
    else {
        console.log("empty value");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Should Enter Positive Quantity',
            timer: 2000,
            showConfirmButton: false,

        })

    }
});







//edit
$("#edititemtomystock").on("click", function () {
    var edititemtomystock = $("#qedititemtomystock").val();
    if (edititemtomystock && edititemtomystock >= 0) {
        $.ajax(
            {
                method: "POST",
                url: "pharmacistview",
                data: {
                    type: "edititemtomystock",
                    Quantity: edititemtomystock,
                    name: $("#edit_med").val(),

                },
                success: function (data, status) {
                    console.log("suc");
                    Swal.fire(
                        'Good job!',
                        'Item Updated Successfully',
                        'success'
                    );
                    reloadStock();
                },
                error: function (xhr, status, error) {
                    console.log("fialed");
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'You Shoult Enter Positive Quantity',

                    });

                  

                },

            }
        );

    }
    else {
        console.log("empty value");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Should Enter Positive Quantity',
            timer: 2000,
              showConfirmButton: false,



        })

    }
});


 

