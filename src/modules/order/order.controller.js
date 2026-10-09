const sendResponse = require("../../shared/utils/sendResponse");
const { createOrderService } = require("./order.service");

const createOrderController = async (req, res) => {
  const result = await createOrderService(req.user.userId, req.body);
  sendResponse(res,{
    statusCode:201,
    message:'Order created successfully',
    data : result
  });
};

module.exports ={
    createOrderController
}