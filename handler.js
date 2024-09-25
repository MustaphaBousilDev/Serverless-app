'use strict';
const DynamoDB = require('aws-sdk/clients/dynamodb')
const documentClient = new DynamoDB.DocumentClient({ region: 'us-east-1' })



module.exports.createProduct = async (event, context, cb) => {
  let data = JSON.parse(event.body)
  try {
    const params = {
      TableName: "products",
      Item: {
        productsId: data.id,
        title: data.title,
        body: data.body
      },
      ConditionExpression: 'attribute_not_exists(productsId)'
    }
    await documentClient.put(params).promise()
    cb(null,{
      statusCode: 200,
      body: JSON.stringify(data),
    })
  } catch(err) {
    console.log(err)
    cb(null,{
      statusCode: 500,
      body: JSON.stringify(err.message),
    })
  }
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
