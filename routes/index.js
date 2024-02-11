const express = require('express');
const router = express.route();
 router.get("/", (req , res) => {
    res.json({ mssg: "hello world"});

 });
 router.post("/", (req , res) => {
    res.json({ mssg: "hello world"});
 });
 module.exports = router;
