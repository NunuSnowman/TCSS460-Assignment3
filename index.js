console.log("hello")
$(document).ready(function () {
    $("#calculateButton").click(function () {
        const weight = parseFloat($("#weight").val());
        const height = parseFloat($("#height").val());
        const age = parseFloat($("#age").val());
        const gender = $("#gender").val();

        fetch(`http://localhost:3000/bmi?weight=${weight}&height=${height}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const bmi = parseFloat(data.bmi);
                console.log("end of fetch");
                $("#bmiResult").text(`BMI: ${bmi.toFixed(2)}`);
                fetch(`http://localhost:3000/bodyfat?gender=${gender}&age=${age}&bmi=${bmi}`)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        const bodyFatPercentage = parseFloat(data.bodyFatPercentage);
                        console.log("end of fetch");
                        $("#bodyFatResult").text(`Body Fat Percentage: ${bodyFatPercentage.toFixed(2)}`);
                        fetch(`http://localhost:3000/idealweight?weight=${weight}&bodyFatPercentage=${bodyFatPercentage}`)
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (data) {
                                const idealWeight = parseFloat(data.idealWeight);
                                console.log("end of fetch");
                                $("#idealWeightResult").text(`Ideal Weight: ${idealWeight.toFixed(2)}`);
                                fetch(`http://localhost:3000/caloriesburned?age=${age}&gender=${gender}&idealweight=${idealWeight}&height=${height}`)
                                    .then(function (response) {
                                        return response.json();
                                    })
                                    .then(function (data) {
                                        const caloriesBurned = parseFloat(data.caloriesBurned);
                                        console.log("end of fetch");
                                        $("#caloriesBurnedResult").text(`Calories Burned: ${caloriesBurned.toFixed(2)}`);
                                        $("#resultModal").modal("show");
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    });
});