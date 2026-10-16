const catchAsync = require("../../shared/utils/catchAsync");
const sendResponse = require("../../shared/utils/sendResponse");
const { createOrderService, getMyOrders } = require("./order.service");

const createOrderController = catchAsync( async (req, res) => {
  const result = await createOrderService(req.user.userId, req.body);
  sendResponse(res,{
    statusCode:201,
    message:'Order created successfully',
    data : result
  });
});
const getMyOrdersController = catchAsync(async(req,res)=>{
  const result = await getMyOrders(req.user.userId)
  return sendResponse(res,{
    statusCode : 200,
    success : true,
    message: 'Orders retrived successfully',
    data : result
  })
})
const getMyorderByIdController = catchAsync(async(req,res)=>{
  const result = await getMyorderById(req.user.userId,req.params.id)
  sendResponse(res,{
    statusCode: 200,
    success : true,
    message : 'Order retrived successfully',
    data : result
  })
})
module.exports ={
  createOrderController,
  getMyOrdersController,
  getMyorderByIdController
}