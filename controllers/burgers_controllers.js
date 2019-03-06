var express = require('express');

var router = express.Router();
//import burger.js
var burger = require("../models/burger.js");

//Create the `router` for the app, and export the `router` at the end of your file.
router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObj = {
            burgers: data
        };
        console.log(hbsObj);
        res.render("index", hbsObj);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.create(["burger_name", "devoured"], [req.body.name, req.body.devoured], function (result) {
        // Send back the ID of the new quote
        res.json({
            id: result.insertId
        });
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = 'id = ' + req.params.id;
    console.log(condition);
    burger.update({ devoured: req.body.devoured }, condition, function (result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
    // burger.delete(condition, function (result) {
    //     if (result.changedRows === 0) {
    //         // If no rows were changed, then the ID must not exist, so 404
    //         return res.status(404).end();
    //     } else {
    //         res.status(200).end();
    //     }
    // })
});

module.exports = router;