const router = require("express").Router();

//get all the users
router.get("/",(req,res) => {
    const { limit ,page, search} = req.querry;
    //database operation
    res.json({ msg:"hello from user Route"});
 });

 //add new user
 router.post("/",(req,res) => {
   console.log(req,body);
     //database operation
    res.json({ msg:"hello from user Route"});
 });
 //update single usee for more than 2 fields
 router.put("/:Id",(req,res) => {
    const {Id} =req.params
    const data =  req.body;
    console.log({id, data}) ;
      //database operation 
     res.json({ msg:"hello from user Route"});
 });

 //update single user for single field
 router.patch("/:Id",(req,res) => {
    const {Id} =req.params
    const data =  req.body;
    console.log({id, data}) ;
   //database operation
    res.json({ msg:"hello from user Route"});
 });

 //delete single user
 router.delete("/:Id",(req,res) => {
    console.log(req,param,id)
    res.json({ msg:"hello from user Route"});
 });

 module.exports = router;

