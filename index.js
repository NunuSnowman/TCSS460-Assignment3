/*
Version: TCSS 460 A Assignment 3
Author: Lixin Wang
Date: 07/19/2023
*/

/*To check the JS file is linked to the HTML file */
console.log("hello")
/*
Sets up an event handler using jQuery.
This function executes execites when the document has finished loading.
 */
// $(document).getElementById("myForm").addEventListener("submit", function(event) {
//     const weightInput = document.getElementById("weight");
//     const heightInput = document.getElementById("height");
//     const agetInput = document.getElementById("age");
//     const gendertInput = document.getElementById("gender");

//     if (!weightInput.value || !heightInput.value || !agetInput.value || !gendertInput) {
//       event.preventDefault(); // Prevent form submission
//       alert("Please fill out all required fields.");
//     }
//   });

$(document).ready(function () {
    // Event handler for the click event on the "calculateButton" element
    $("#calculateButton").click(function () {
        // Retrieve values from input fields
        const weight = parseFloat($("#weight").val());
        const height = parseFloat($("#height").val());
        const age = parseFloat($("#age").val());
        const gender = $("#gender").val();

        //Check all the fields are filled
        if(!weight || !height || !age || !gender){
            alert("Please fill out all the fields.");
            return;
        }

        // Fetch BMI data from the server API using the weight and height values
        fetch(`http://localhost:3000/bmi?weight=${weight}&height=${height}`)
            /* 
            A Promise chain using the .then() method to handle the response from fetch() request.
            And parse the responses as JSON data.
            */
            .then(function (response) {
                //The parsed data is returen from the callback function.
                return response.json();
            })
            .then(function (data) {
                // Process the retrieved BMI data
                const bmi = parseFloat(data.bmi);
                console.log("end of fetch");
                /*
                Sets the text content of the element with the ID "bmiResult" to display the string "BMI:" 
                followed by the calculated BMI value, formatted to two decimal places.
                */
                $("#bmiResult").text(`BMI: ${bmi.toFixed(2)} kg/m\u00B2`);

                // Fetch body fat percentage data from the server API using the gender, age, and BMI values
                fetch(`http://localhost:3000/bodyfat?gender=${gender}&age=${age}&bmi=${bmi}`)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        // Process the retrieved body fat percentage data
                        const bodyFatPercentage = parseFloat(data.bodyFatPercentage);
                        console.log("end of fetch");
                        $("#bodyFatResult").text(`Body Fat Percentage: ${bodyFatPercentage.toFixed(2)}%`);

                        // Fetch ideal weight data from the server API using the weight and body fat percentage values
                        fetch(`http://localhost:3000/idealweight?weight=${weight}&bodyFatPercentage=${bodyFatPercentage}`)
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (data) {
                                // Process the retrieved ideal weight data
                                const idealWeight = parseFloat(data.idealWeight);
                                console.log("end of fetch");
                                $("#idealWeightResult").text(`Ideal Weight: ${idealWeight.toFixed(2)} kg`);

                                // Fetch calories burned data from the server API using various input values
                                fetch(`http://localhost:3000/caloriesburned?age=${age}&gender=${gender}&idealweight=${idealWeight}&height=${height}`)
                                    .then(function (response) {
                                        return response.json();
                                    })
                                    .then(function (data) {
                                        // Process the retrieved calories burned data
                                        const caloriesBurned = parseFloat(data.caloriesBurned);
                                        console.log("end of fetch");
                                        $("#caloriesBurnedResult").text(`Calories Burned: ${caloriesBurned.toFixed(2)} calories`);
                                        // Show the modal dialog with the calculated results
                                        $("#resultModal").modal("show");
                                    })
                                    // Handle any errors that occur during the fetch request
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