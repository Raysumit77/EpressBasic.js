const express = require("express");
const indexRouter= require('./routes')
const app =express();
app.use(express.json());
app.use("/" , indexRouter);
//yo allow json as request body
// app.get("/",(req,res) => {
//     res.json({msg: "hello world"});
// });
app.listen(8000,() => {
    console.log("application is running" );
});

