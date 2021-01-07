$(function () {
    setInterval(function () {
        var tod = new Date()

        $("#currentdate").html(
            '<i class="fa fa-calendar"></i>' + Date().split('GMT+0200 (Eastern European Standard Time)')
        );
    }, 1000);
});





















// open the specific prescription in the left
$(document).on('click', ".x", function () {

    $("#emb").html(
        "<embed  src='" + $(this).data("pdf") + "'></embed>"
    );
});







//toggle status of presctiption
$(document).on('click', ".y", function () {
    var t = this;
    $(t);
    ($(t).removeClass("fa-times"));
    ($(t).addClass("fa-spinner fa-pulse"));

    $.ajax(
        {
            method: "POST",
            url: "cashier",
            data: {
                type: "toggle",
                id: $(this).data("id")

            },
            success: function (data, status) {
                console.log("suc");
                console.log($(t));

                ($(t).removeClass("fa-spinner"));
                ($(t).removeClass("fa-pulse"));
                ($(t).addClass("fa-check-circle"));

                ($(t).parent().parent().removeClass("table-danger"));
                ($(t).parent().parent().addClass("table-success"));
                var ChronicDisease = ((JSON.parse(data)));
                console.log(ChronicDisease);

                Swal.fire({
                    icon: 'success',
                    title: 'Done...',
                    text: 'Disbursed Successfully',
                    timer: 2000,
                    showConfirmButton: false,

                });



            },
            error: function (xhr, status, error) {
                console.log("fialed");
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "No an error occured try again",
                });

            },

        }
    );





});









//search for medical history of the patient
$("#searchforbutton").on("click", function () {
    $("#spinner").addClass("show");
    $("#emb").html(
        "<embed  src='/images/patient.png'></embed>"
    );
    if ($("#searchforpatient").val()) {

        $.ajax(
            {
                method: "POST",
                url: "cashier",
                //data which will be sent to back-end
                data: {
                    type: "Prescriptions",
                    phone: $("#searchforpatient").val()
                },
                //if all success and it will return back-end
                success: function (data, status) {
                    console.log("suc");
                    $("#spinner").removeClass("show");

                    //if he search again i will remove the last one and add anothor one

                    $('#prescreptionTable').empty();
                    $('#chronicDisease').empty();


                    var prescreptionTable = ((JSON.parse(data)));
                    //to render data just once
                    console.log(prescreptionTable);
                    prescreptionTable.forEach(element => {
                        var stat = (element.pres_status == 0 ? ("fas fa-times y") : "fas fa-check-circle y");
                        var ro = (element.pres_status == 0 ? ("table-danger") : "table-success");
                        $('#prescreptionTable').append(
                            "<tr class = '" + ro + "'>" +
                            "<td>" +
                            element.Prescription_ID +
                            "</td>" +
                            "<td>" +
                            element.Prescription_date.substring(0, 10) +
                            "</td>" +
                            "<td>" +
                            `<p style="cursor: pointer;" class="x" data-pdf="/pdfs/${element.Prescription_diagnosis}" target="_blank" >${element.Prescription_diagnosis.substring(0, element.Prescription_diagnosis.length - 4)}</p>` +
                            "</td>" +
                            '<td style="    text-align: center;">' +
                            `<i style="cursor: pointer; " data-id=${element.Prescription_ID} class='` + stat + `'></i>` +
                            "</td>" +
                            "</tr>"
                        );
                    }
                    );

                    $.ajax(
                        {
                            method: "POST",
                            url: "cashier",
                            data: {
                                type: "chronicDisease",
                                phone: $("#searchforpatient").val()

                            },
                            success: function (data, status) {
                                console.log("suc");

                                var ChronicDisease = ((JSON.parse(data)));
                                console.log(ChronicDisease);

                                if (ChronicDisease.length == 0 && prescreptionTable.length == 0) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: "No Patient With This QRCode Or This Patient Doesn't have any medical History Yet",

                                    });
                                }
                                // $("#Prescreptions-tab").addClass("active show");
                                $('#myTab a[href="#Prescreptions"]').trigger('click');

                                ChronicDisease.forEach(element => {
                                    $('#chronicDisease').append(
                                        "<tr>" +
                                        "<td>" +
                                        element.Disease_Name +
                                        "</td>" +
                                        "<td>" +
                                        element.Disease_Date.substring(0, 10) +
                                        "</td>" +
                                        "</tr>");
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

                    console.log(xhr);
                    console.log(status);
                    console.log(error);

                },

            }
        );
    }
    else
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Should Fill search field',
            timer: 2000,
            showConfirmButton: false,

        });
});








//add order to list
$("#additembutton").on("click", function () {
    var addquantity = $("#qadditemtomystock").val();
    var searchf = $("#additemtotheorder").val();
    if (addquantity && addquantity > 0 && searchf) {
        $.ajax(
            {
                method: "POST",
                url: "cashier",
                data: {
                    type: "getItem",
                    name: searchf,

                },
                success: function (data, status) {
                    console.log("suc");
                    var item = ((JSON.parse(data)));
                    console.log(item);
                    // update quantity if
                    if (item.length != 0 && item[0].item_quantity >= addquantity ) {
                        $.ajax(
                            {
                                method: "POST",
                                url: "cashier",
                                data: {
                                    type: "updateQuantity",
                                    name: searchf,
                                    quantity: item[0].item_quantity - addquantity
                                },
                                //add items to cash form
                                success: function (data, status) {
                                    $("#order").append(
                                        '<div class="plan">' +
                                        `<input aria-hidden="true" type="text" class="hidden nameofitemtogetfrom" name="type" value=${searchf}></input>`+
                                        `<input aria-hidden="true" type="text"  class="hidden totalcashier" name="type" value=${item[0].item_price * addquantity}></input>`+

                                                '<div class="plan-header">' +
                                        `<h4 data-name=${searchf}>${searchf}</h4>` +
                                                        '<div class="countdown small">' +
                                                            '<div class="countdown-container">' +
                                                                '<div class="countdown-box">' +
                                        `<div class="number" >${item[0].item_price}</div><span>Price</span>` +
                                                                "</div>" +
                                                                '<div class="countdown-box">' +
                                                                    `<div class="number" >${addquantity}</div><span>Quantity</span>` +
                                                                '</div>' +
                                                                '<div class="countdown-box">' +
                                        `<div class="number1" data-total=${item[0].item_price * addquantity}>${item[0].item_price * addquantity}</div><span>Total Price</span>` +
                                                                "</div>" +
                                                            "</div>" +
                                                        "</div>" +
                                                "</div>" +
                                        "</div>" +
                                        "<hr>"
                                    );
                                },
                                error: function (xhr, status, error) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: `something went wrong try again`,
                                        timer: 2000,
                                        showConfirmButton: false,

                                    });
                                },

                            }
                        );
                    }
                    else if (item.length == 0 ){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `you Don't have ${searchf}`,
                            timer: 2000,
                            showConfirmButton: false,

                        });
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `you have ${item[0].item_quantity} only from ${searchf}`,
                            timer: 2000,
                            showConfirmButton: false,

                        });
                    }
                },
                error: function (xhr, status, error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "i think you don't have this medicine or something went wrong check name and try agian",
                        timer: 2000,
                        showConfirmButton: false,

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
            text: 'You Should Enter Positive Quantity and fill search field',
            timer: 2000,
            showConfirmButton: false,

        });
    }
});





$("#cash").on("click", function () {
    var totalCash = 0;
   
    $(".totalcashier").each(function () {
        totalCash += parseInt($(this).val());
    });
    

    if (totalCash > 0) {
        $.ajax(
            {
                method: "POST",
                url: "cashier",
                data: {
                    type: "cash",
                    total: totalCash

                },
                success: function (data, status) {
                    console.log("suc");

                    var total = ((JSON.parse(data)));
                    console.log(total);
                    $("#order").empty();
                },
                error: function (xhr, status, error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Some Thing Went Wrong Try Agian',
                        timer: 2000,
                        showConfirmButton: false,

                    });

                },

            }
        );

    }

    
})