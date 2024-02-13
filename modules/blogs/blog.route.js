const router = require("express").Router();

router.get("/",(req,res) => {
    const { limit ,page, search } = req.query;//used for search
    res.json({msg:"hello from blog route"});
});
router.post("/",(req,res) => {
    res.json({msg:"hello from blog  post route"});
});
router.put("/:id",(req,res) => {
    console.log(req.query);
    const{ id } = req.params;
    res.json({msg:`hello from blog put  put route name ${ id }`});
});
router.patch("/",(req,res) => {
    res.json({msg:"hello from blog patch route"});
});
router.delete("/",(req,res) => {
    res.json({msg:"hello from blog delete route"});
});



module.exports = router;