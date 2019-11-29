var express = require("express");

var router = express.Router();

var burger = require("../models/burger");

router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.create([
        "burger_name", "devoured"
    ], [
            req.body.burger_name, req.body.devoured
        ], function (result) {
            res.json({ id: result.insertId });
        });
});

router.put("/api/burgers/:id", function (req, res) {
    var burgerID = "id = " + req.params.id;

    console.log("condition", burgerID);
    console.log("req.body.dev " + req.body.devoured)

    burger.update({
        devoured: true
    }, burgerID, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function (req, res) {
    var burgerID = "id = " + req.params.id;

    burger.delete(burgerID, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;
