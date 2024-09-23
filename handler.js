'use strict';

module.exports.createProduct = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify('A new product created'),
  };
};
