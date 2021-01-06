

// ----------------------------------------generate QR Code with html svg-----------------------------------------------
// $(function () {

//     JsBarcode("#barcode", "156161", {
//         font: "fantasy",
//         displayValue: false
//     });


//     var svg = $("#barcode")[0];
//     console.log("svg =" + svg);
//     var xml = new XMLSerializer().serializeToString(svg);

//     console.log("xml =" + xml);
//     var base64 = 'data:image/svg+xml;base64,' + btoa(xml);
//     console.log("base64 =" + base64);
//     var img = $(".barcode")[0];
//     img.src = base64;
//     $.ajax(
//         {
//             method: "POST",
//              url: "main-Hall",
//             data: {
//                 type: "barcode",
//                 barcode: base64
//             },
//             success: function (data, status) {
//                 console.log("suc");



//             },
//             error: function (xhr, status, error) {
//                 console.log("fialed");

//                 console.log(xhr);
//                 console.log(status);
//                 console.log(error);

//             },

//         }
//     );
// });




//---------------------------------------------------------------------------------------------------------------------

//ajax search fetch scans / pres / analysis / chronic 
// *******************************************************
$(".search").on("click", function () {
    $("#spinner").addClass("show");

    if ($(".searchfield").val()) {

        $.ajax(
            {
                method: "POST",
                url: "main-Hall",
                //data which will be sent to back-end
                data: {
                    type: "search",
                    phone: $(".searchfield").val()
                },
                //if all success and it will return back-end
                success: function (data, status) {
                    console.log("suc");
                    $("#spinner").removeClass("show");

                    //if he search again i will remove the last one and add anothor one
                    $('#scanTable').empty();

                    $('#analysisTable').empty();


                    $('#prescreptionTable').empty();


                    $('#chronicDisease').empty();


                    if ($('#scanTable').hasClass("empty")) {
                        var scans = ((JSON.parse(data)));
                        //to render data just once
                        console.log(scans);
                        scans.forEach(element => {
                            $('#scanTable').append(


                                "<tr>" +
                                "<td>" +
                                element.Scan_Name +
                                "</td>" +
                                "<td>" +
                                element.Scan_Date.substring(0, 10) +
                                "</td>" +
                                "<td>" +
                                `<a  href="/pdfs/${element.Result}" target="_blank" >${element.Result.substring(0, element.Result.length - 4)}</a>` +
                                "</td>" +
                                "</tr>");
                        }
                        );
                        $.ajax(
                            {
                                method: "POST",
                                 url: "main-Hall",
                                data: {
                                    type: "Analysis",
                                    phone: $(".searchfield").val()

                                },
                                success: function (data, status) {
                                    console.log("suc");

                                    if ($('#analysisTable').hasClass("empty")) {
                                        var Analysis = ((JSON.parse(data)));
                                        console.log(Analysis);

                                        Analysis.forEach(element => {
                                            $('#analysisTable').append(



                                                "<tr>" +
                                                "<td>" +
                                                element.Analysis_Name +
                                                "</td>" +
                                                "<td>" +
                                                element.Analysis_Date.substring(0, 10) +
                                                "</td>" +
                                                "<td>" +
                                                `<a  href="/pdfs/${element.Result}" target="_blank" >${element.Result.substring(0, element.Result.length - 4)}</a>` +
                                                "</td>" +
                                                "</tr>");
                                        }
                                        );

                                        $.ajax(
                                            {
                                                method: "POST",
                                                 url: "main-Hall",
                                                data: {
                                                    type: "Prescriptions",
                                                    phone: $(".searchfield").val()

                                                },
                                                success: function (data, status) {
                                                    console.log("suc");

                                                    if ($('#prescreptionTable').hasClass("empty")) {
                                                        var Prescriptions = ((JSON.parse(data)));
                                                        console.log(Prescriptions);

                                                        Prescriptions.forEach(element => {
                                                            var status = element.pres_status == 0 ? "Waiting" : "Done";

                                                            $('#prescreptionTable').append(
                                                                "<tr>" +
                                                                "<td>" +
                                                                element.Prescription_ID +
                                                                "</td>" +
                                                                "<td>" +
                                                                element.Prescription_date.substring(0, 10) +
                                                                "</td>" +
                                                                "<td>" +
                                                                `<a  href="/pdfs/${element.Prescription_diagnosis}" target="_blank" >${element.Prescription_diagnosis.substring(0, element.Prescription_diagnosis.length - 4)}</a>` +
                                                                "</td>" +
                                                                "<td>" +
                                                                status +
                                                                "</td>" +
                                                                "</tr>");
                                                        }
                                                        );
                                                        $.ajax(
                                                            {
                                                                method: "POST",
                                                                 url: "main-Hall",
                                                                data: {
                                                                    type: "chronicDisease",
                                                                    phone: $(".searchfield").val()

                                                                },
                                                                success: function (data, status) {
                                                                    console.log("suc");

                                                                    if ($('#chronicDisease').hasClass("empty")) {
                                                                        var ChronicDisease = ((JSON.parse(data)));
                                                                        console.log(ChronicDisease);

                                                                        if (ChronicDisease.length == 0 && Prescriptions.length == 0 && Analysis.length == 0 && scans.length ==0) {
                                                                            Swal.fire({
                                                                                icon: 'error',
                                                                                title: 'Oops...',
                                                                                text: "No Patient With This QRCode Or This Patient Doesn't have any medical History Yet",

                                                                            });
                                                                        }
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
                                                                    }


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













//get all my patients
$("#patients").on("click", function () {

    $.ajax(
        {
            method: "POST",
             url: "main-Hall",
            data: {
                type: "getMyPatients",
            },
            success: function (data, status) {
                console.log("suc");



                if ($('#getmePatients').hasClass("empty")) {
                    var getMyPatients = ((JSON.parse(data)));
                    console.log("in Patient00");
                    console.log(getMyPatients);
                    getMyPatients.forEach(element => {

                        console.log(element);

                        $('#getmePatients').append(
                            "<tr>" +
                            "<td>" +
                            element.Patient_acc_ID +
                            "</td>" +
                            "<td>" +
                            element.Patient_smoking_status.data +
                            "</td>" +
                            "</tr>");
                    }
                    );
                    $('#getmePatients').removeClass("empty")
                }


            },
            error: function (xhr, status, error) {
                console.log("fialed");

                console.log(xhr);
                console.log(status);
                console.log(error);

            },

        }
    );
});




//search for medicines and pharmacies

$("#searchfor").on("click", function () {

    if ($("#selecttype").val() == "-1" && !$("#searchfeildtowritename").val()) {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Should Fill Type And Search Field',
            timer: 2000,
            showConfirmButton: false,

        });
    }

    else if ($("#selecttype").val() == "-1") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Should Fill Type',
            timer: 2000,
            showConfirmButton: false,

        });
    }
    else if (!$("#searchfeildtowritename").val()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Should Fill Search Field',
            timer: 2000,
            showConfirmButton: false,

        });
    }
    else {
        $("#spinner2").addClass("show");

        //search for Medicines
        if ($("#selecttype").val() == "0") {
            console.log("searching for Med");
            $.ajax(
                {
                    method: "POST",
                     url: "main-Hall",
                    data: {
                        type: "search_for_Medicines",
                        searchField: $("#searchfeildtowritename").val(),

                    },
                    success: function (data, status) {
                        console.log("suc");
                        $("#spinner2").removeClass("show");


                        $("#thead").empty();
                        $("#thead").append(
                            "<tr>" +
                            "<th>" +
                            "In Pharmacy" +
                            "</th>" +
                            "<th>" +
                            "Address" +
                            "</th>" +
                            "</tr>"
                        );
                        $("#searchingfor").empty();


                        var pharmacies_has_medicin = ((JSON.parse(data)));
                        console.log(pharmacies_has_medicin);
                        if (pharmacies_has_medicin.length == 0) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'No Medicine With This Name',
                                timer: 2000,
                                showConfirmButton: false,

                            });
                        }
                        pharmacies_has_medicin.forEach(element => {

                            console.log(element);

                            $('#searchingfor').append(
                                "<tr>" +
                                "<td>" +
                                element.pharmacy_name +
                                "</td>" +
                                "<td>" +
                                element.pharmacy_address +
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
        }

        // search for pharmacy
        else {
            console.log("searching for ph");

            $.ajax(
                {
                    method: "POST",
                     url: "main-Hall",
                    data: {
                        type: "search_for_pharmacy",
                        searchField: $("#searchfeildtowritename").val(),

                    },
                    success: function (data, status) {
                        console.log("suc");
                        $("#spinner2").removeClass("show");

                        $("#thead").empty();
                        $("#thead").append(
                            "<tr>" +
                            "<th>" +
                            "Name" +
                            "</th>" +
                            "<th>" +
                            "Address" +
                            "</th>" +
                            "</tr>"
                        );
                        $("#searchingfor").empty();
                        //pharmacies that has the searching name
                        var myPharmacies = ((JSON.parse(data)));
                        if (myPharmacies.length == 0) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'No Pharmacies With This Name',
                                timer: 2000,
                                showConfirmButton: false,

                            });
                        }
                        console.log(myPharmacies);
                        myPharmacies.forEach(element => {

                            console.log(element);

                            $('#searchingfor').append(
                                "<tr>" +
                                "<td>" +
                                element.pharmacy_name +
                                "</td>" +
                                "<td>" +
                                element.pharmacy_address +
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
        }


    }
});







//add item to patient
$("#additemtopatient").on("click", function () {
    
    if ($("#NameOfItemToAdd").val() && $("#dateofsubmition").val() && $(".searchfield").val() && $("#filetoupload").val()) {
        var tot = $("#typeoftheaddeditem").val();
        Swal.fire({
            title: `Are You Sure You Want To Add ${$("#NameOfItemToAdd").val()} ${tot=="0"?"Scan":tot=="1"?"Analysis":"Prescription"}?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                console.log($("#typeoftheaddeditem").val());
                console.log("#Confirmed");

                Swal.fire('Added Successfully!', '', 'success');
                $("#addform").submit();

                     
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    else {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Should Fill All Input Fields!',
        });
    }
});



