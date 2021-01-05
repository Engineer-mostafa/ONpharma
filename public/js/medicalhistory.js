

//ajax scan table
// *******************************************************
$("#scans").on("click", function () {
    $("#spinner1").addClass("show");

    $.ajax(
        {
            method: "POST",
            url: "medicalhistory",
            //data which will be sent to back-end
            data: {
                type: "Scan",
            },
            //if all success and it will return back-end
            success: function (data, status) {
                console.log("suc");
                $("#spinner1").removeClass("show");

                var scans = ((JSON.parse(data)));
                //to render data just once

                if ($('#scanTable').hasClass("empty")) {

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
                    $('#scanTable').removeClass("empty")

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


//ajax Analysis table
// *******************************************************
$("#Analysis").on("click", function () {
    $("#spinner2").addClass("show");

    $.ajax(
        {
            method: "POST",
            url: "medicalhistory",
            data: {
                type: "Analysis",
            },
            success: function (data, status) {
                console.log("suc");
                $("#spinner2").removeClass("show");

                if ($('#analysisTable').hasClass("empty")) {
                    var Analysis = ((JSON.parse(data)));

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
                    $('#analysisTable').removeClass("empty")
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




//ajax Prescriptions table
// *******************************************************
$("#Prescriptions").on("click", function () {
    $("#spinner3").addClass("show");

    $.ajax(
        {
            method: "POST",
            url: "medicalhistory",
            data: {
                type: "Prescriptions",
            },
            success: function (data, status) {
                console.log("suc");
                $("#spinner3").removeClass("show");

                var Prescriptions = ((JSON.parse(data)));
                if ($('#prescriptionTable').hasClass("empty")) {
                    Prescriptions.forEach(element => {
                        var status = element.pres_status == 0 ? "Waiting" : "Done";
                            $('#prescriptionTable').append(
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
                                status+
                                "</td>" +
                                "</tr>");
                    }
                    );
                    $('#prescriptionTable').removeClass("empty")
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



//ajax ChronicDisease table
// *******************************************************
$("#ChronicDisease").on("click", function () {
    $("#spinner4").addClass("show");

    $.ajax(
        {
            method: "POST",
            url: "medicalhistory",
            data: {
                type: "chronicDisease",
            },
            success: function (data, status) {
                console.log("suc");
                $("#spinner4").removeClass("show");

                var ChronicDisease = ((JSON.parse(data)));
                if ($('#chronicDisease').hasClass("empty")) {
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
});








