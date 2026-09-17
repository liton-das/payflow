const router = require('express').Router()
router.get('/health',(req,res)=>{
    res.status(200).json({
        success:true,
        message:'PayFlow api is healthy'
    })
})

module.exports = router