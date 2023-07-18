const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
// BMI route
app.get('/bmi', (req, res) => {
    // Calculate the BMI based on the request parameters or body data
    // Send the calculated BMI as a response
    const weight = parseFloat(req.query.weight);
    const height = parseFloat(req.query.height);

    // Perform the BMI calculation
    const bmi = weight / Math.pow(height / 100, 2); // Convert height to meters by dividing by 100, because the input unit is "cm".

    // Send the calculated BMI as a response
    res.json({ bmi: bmi });
    console.log("api is called");
});

// Body Fat route
app.get('/bodyfat', (req, res) => {
    // Retrieve the gender, age, and BMI from the request query parameters
    const gender = req.query.gender;
    const age = parseInt(req.query.age);
    const bmi = parseFloat(req.query.bmi);

    // Calculate the body fat percentage based on gender and age
    let bodyFatPercentage;
    if (gender === 'male') {
        bodyFatPercentage = (1.20 * bmi) + (0.23 * age) - 16.2;
    } else if (gender === 'female') {
        bodyFatPercentage = (1.20 * bmi) + (0.23 * age) - 5.4;
    } else {
        return res.status(400).json({ error: 'Invalid gender' });
    }

    // Send the calculated body fat percentage as a response
    res.json({ bodyFatPercentage: bodyFatPercentage });
    console.log("api is called");
});

// Ideal Weight route
app.get('/idealweight', (req, res) => {
    // Calculate the ideal weight based on the request parameters or body data
    // Send the calculated ideal weight as a response
    // Retrieve the weight, body fat percentage, and calculate the ideal weight
    const weight = parseFloat(req.query.weight);
    const bodyFatPercentage = parseFloat(req.query.bodyFatPercentage);
    console.log(req.query)

    // Calculate the ideal weight using the formula
    // 25% is the optimal body fat percentage
    const idealWeight = (weight - weight * (bodyFatPercentage / 100)) / (1 - 0.25);

    console.log(weight, bodyFatPercentage, idealWeight);
    // Send the calculated ideal weight as a response
    res.json({ idealWeight: idealWeight });
    console.log("api is called");
});

// Calories Burned route
app.get('/caloriesburned', (req, res) => {
    // Calculate the calories burned based on the request parameters or body data
    // Send the calculated calories burned as a response
    // Retrieve the gender, age, and ideal weight from the request query parameters
    const gender = req.query.gender;
    const age = parseInt(req.query.age);
    const idealWeight = parseFloat(req.query.idealweight);
    const height = parseFloat(req.query.height);
    console.log(req.query)
    // Calculate the Basal Metabolic Rate (BMR) based on gender
    let bmr;
    if (gender === 'male') {
        bmr = 66 + 13.75 * idealWeight + 5 * (height / 100) - 6.75 * age;
    } else if (gender === 'female') {
        bmr = 655 + 9.56 * idealWeight + 1.85 * (height / 100) - 4.68 * age;
    } else {
        return res.status(400).json({ error: 'Invalid gender' });
    }
    console.log(gender, age, idealWeight, height);
    // Calculate the calories burned per day based on BMR alone
    const caloriesBurned = bmr;

    // Send the calculated calories burned as a response
    res.json({ caloriesBurned: caloriesBurned });
    console.log("api is called");
});

//start the listener
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});