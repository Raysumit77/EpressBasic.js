const router = require("express").Router();
const { validate } = require("./user.validate");

// //get all the users
 router.get("/",(req,res, next) => {
  try{ 
  const { limit ,page, search } = req.query;//used for search
  //database operation
   res.json({ msg:"hello from user Route"});

  } catch(err) {
    next(err);
  }
  });

  //add new user
  router.post("/",validate,(req,res,next) => {
    try{
      console.log(req.body);
      //database operation
       res.json({ msg:"hello from user Route"});
  
    }catch(err){
      next(err);
    }
     
  });
  //update single usee for more than 2 fields
  router.put("/:id",(req,res,next) => {
    try{
      const {id} =req.params
     const data =  req.body;
     console.log({id,data});
     //database operation 
   res.json({ msg:`hello from user Route id ${id}` });
    } catch(err){
      next(err);
    }
  });

  //update single user for single field
  router.patch("/:id",(req,res,next) => {
    try{
      const {id} =req.params
      const data =  req.body;
      console.log({id,data});
     //database operation 
    res.json({mssg:"hello from user patch route"});
    } catch(err) {
      next(err);
    }
   });

  //delete single user
  router.delete("/:id",(req,res,next) => {
    try{
      console.log(req.params.id)
     res.json({ msg:"hello from user Route"});
    }catch(err){
      next(err);
    }
  });

 module.exports = router;
