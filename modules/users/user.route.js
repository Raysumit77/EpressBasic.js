const router = require("express").Router();

// //get all the users
 router.get("/",(req,res) => {
 const { limit ,page, search } = req.query;//used for search
 //database operation
  res.json({ msg:"hello from user Route"});
  });

  //add new user
  router.post("/",(req,res) => {
    console.log(req.body);
    //database operation
     res.json({ msg:"hello from user Route"});
  });
  //update single usee for more than 2 fields
  router.put("/:id",(req,res) => {
     const {id} =req.params
     const data =  req.body;
     console.log({id,data});
     //database operation 
   res.json({ msg:`hello from user Route id ${id}` });
  });

  //update single user for single field
  router.patch("/:id",(req,res) => {
    const {id} =req.params
    const data =  req.body;
    console.log({id,data});
   //database operation 
  res.json({mssg:"hello from user patch route"});
  });

  //delete single user
  router.delete("/:id",(req,res) => {
 console.log(req.params.id)
     res.json({ msg:"hello from user Route"});
 });

 module.exports = router;

