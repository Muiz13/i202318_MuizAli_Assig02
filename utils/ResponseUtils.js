const successResponse = (message, data = null) => {
    return {
      success: true,
      message,
      data,
    };
  };
  
  const errorResponse = (message, error = null) => {
    return {
      success: false,
      message,
      error,
    };
  };
  
  module.exports = { successResponse, errorResponse };
  
  const { successResponse, errorResponse } = require('../utils/ResponseUtils');

const someControllerFunction = (req, res) => {
  try {
    res.json(successResponse('Operation successful', someData));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Internal Server Error', error));
  }
};
