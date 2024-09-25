'use strict';

module.exports.createProduct = async (event) => {
  return {
    statusCode: 201,
    body: JSON.stringify('A new product created'),
  };
};
//update product
module.exports.updateProduct = async (event) => {
  let productId = 6
  return {
    statusCode: 200,
    body: JSON.stringify(`The not with  : ${productId}`),
  };
};

module.exports.deleteProduct = async (event) => {
  let nodeList = 6;
  return {
    statusCode: 200,
    body: JSON.stringify("The not with id" + nodeList + "has ben deleted")
  }
}
