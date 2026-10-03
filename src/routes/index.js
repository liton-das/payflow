const authRoutes = require('../modules/auth/auth.route')
const productRoute = require('../modules/product/product.route')
const userRoute = require('../modules/user/user.route')

const router = require('express').Router()
router.get('/health',(req,res)=>{
    res.status(200).json({
        success:true,
        message:'PayFlow api is healthy'
    })
})
// auth routes
router.use('/auth',authRoutes)
// user routes
router.use('/users',userRoute)
// product routes
router.use('/products',productRoute)
module.exports = router