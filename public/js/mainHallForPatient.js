


//ajax scan table
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
                },
                //if all success and it will return back-end
                success: function (data, status) {
                    console.log("suc");
                   

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
                        $('#scanTable').removeClass("empty");
                        $.ajax(
                            {
                                method: "POST",
                                url: "medicalhistory",
                                data: {
                                    type: "Analysis",
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
                                        $('#analysisTable').removeClass("empty");

                                        $.ajax(
                                            {
                                                method: "POST",
                                                url: "medicalhistory",
                                                data: {
                                                    type: "Prescriptions",
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
                                                        $('#prescreptionTable').removeClass("empty");
                                                        $.ajax(
                                                            {
                                                                method: "POST",
                                                                url: "medicalhistory",
                                                                data: {
                                                                    type: "chronicDisease",
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
                                                                        $('#chronicDisease').removeClass("empty")
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
