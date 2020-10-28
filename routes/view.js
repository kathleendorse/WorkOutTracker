const router = require("express").Router();
const path = require("path");

//Show exercise HTML page
router.get("/exercise", (req, res)=>{
     res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

//Show stats HTML page
router.get("/stats", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});
 
module.exports = router;