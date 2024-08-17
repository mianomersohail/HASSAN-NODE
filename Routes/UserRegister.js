const express = require('express');
const routes = express.Router();
const { Hassan } = require('../Model/Model');

routes.post('/', async function(req, res) {
    const { email, password } = req.body;
    try {
        const result = new Hassan({ email, password });
        const savedResult = await result.save();

        if (savedResult) {
            res.render('Home', { role: "Admin", message: "User Registered Successfully" });
        } else {
            res.render('Home', { role: 'Admin', message: "User Not Saved, Try Again Later" });
        }
    } catch (error) {
        console.error(error); // Logs the error for debugging
        res.render('Home', { role: 'Admin', message: "Internal Server Error" });
    }
});

module.exports = routes;
