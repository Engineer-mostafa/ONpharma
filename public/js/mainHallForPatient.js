


//ajax search fetch scans / pres / analysis / chronic 
// *******************************************************
$(".search").on("click", function () {

    if ($(".searchfield").val()) {

        $.ajax(
            {
                method: "POST",
                url: "mainHallForPatient",
                //data which will be sent to back-end
                data: {
                    type: "search",
                    phone: $(".searchfield").val()
                },
                //if all success and it will return back-end
                success: function (data, status) {
                    console.log("suc");

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
                                "</tr>")
                        }
                        );
                        $.ajax(
                            {
                                method: "POST",
                                url: "mainHallForPatient",
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
                                                "</tr>")
                                        }
                                        );

                                        $.ajax(
                                            {
                                                method: "POST",
                                                url: "mainHallForPatient",
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
                                                            $('#prescreptionTable').append(
                                                                "<tr>" +
                                                                "<td>" +
                                                                element.Prescription_diagnosis +
                                                                "</td>" +
                                                                "<td>" +
                                                                element.Prescription_date.substring(0, 10) +
                                                                "</td>" +
                                                                "</tr>")
                                                        }
                                                        );
                                                        $.ajax(
                                                            {
                                                                method: "POST",
                                                                url: "mainHallForPatient",
                                                                data: {
                                                                    type: "chronicDisease",
                                                                    phone: $(".searchfield").val()

                                                                },
                                                                success: function (data, status) {
                                                                    console.log("suc");

                                                                    if ($('#chronicDisease').hasClass("empty")) {
                                                                        var ChronicDisease = ((JSON.parse(data)));
                                                                        console.log(ChronicDisease);

                                                                        ChronicDisease.forEach(element => {
                                                                            $('#chronicDisease').append(
                                                                                "<tr>" +
                                                                                "<td>" +
                                                                                element.Disease_Name +
                                                                                "</td>" +
                                                                                "<td>" +
                                                                                element.Disease_Date.substring(0, 10) +
                                                                                "</td>" +
                                                                                "</tr>")
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
    else alert("You Should Fill search field");
});













//get all my patients
$("#patients").on("click", function () {

    $.ajax(
        {
            method: "POST",
            url: "mainHallForPatient",
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

    if ($("#selecttype").val() == "-1" && !$("#searchfeildtowritename").val()) { alert("Please You Should Fill Type And Search Field"); }

    else if ($("#selecttype").val() == "-1") {
        alert("Please You Should Fill Type");
    }
    else if (!$("#searchfeildtowritename").val()) {
        alert("Please You Should Fill Search Field");
    }
    else {
        //search for Medicines
        if ($("#selecttype").val() == "0") {
            console.log("searching for Med");
            $.ajax(
                {
                    method: "POST",
                    url: "mainHallForPatient",
                    data: {
                        type: "search_for_Medicines",
                        searchField: $("#searchfeildtowritename").val(),
                      
                    },
                    success: function (data, status) {
                        console.log("suc");


                        $("#thead").empty();
                        $("#thead").append(
                            "<tr>" +
                            "<th>" +
                            "In Pharmacy"+
                                         "</th>" +
                            "<th>" +
                            "Address"+
                                         "</th>" +
                            "</tr>"
                        );
                        $("#searchingfor").empty();


                        var pharmacies_has_medicin = ((JSON.parse(data)));
                        console.log(pharmacies_has_medicin);
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
                    url: "mainHallForPatient",
                    data: {
                        type: "search_for_pharmacy",
                        searchField: $("#searchfeildtowritename").val(),
                       
                    },
                    success: function (data, status) {
                        console.log("suc");

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
})