'use strict';
const DynamoDB = require('aws-sdk/clients/dynamodb')
const documentClient = new DynamoDB.DocumentClient({ region: 'us-east-1' })
const PRODUCTS_TABLE_NAME = process.env.PRODUCTS_TABLE_NAME

const send = (statusCode, data) =>{
  return {
    statusCode,
    body: JSON.stringify(data),
  }
}

module.exports.createProduct = async (event, context, cb) => {
  let data = JSON.parse(event.body)
  try {
    const params = {
      TableName: PRODUCTS_TABLE_NAME,
      Item: {
        productsId: data.id,
        title: data.title,
        body: data.body,
        to: 'rttrt'
      },
      ConditionExpression: 'attribute_not_exists(productsId)'
    }
    await documentClient.put(params).promise()
    cb(null,send(201,data))
  } catch(err) {
    console.log(err)
    cb(null,send(500,err.message))
  }
};
//update product
//update product
module.exports.updateProduct = async (event, context, cb) => {
  let productsId = event.pathParameters.id
  let data = JSON.parse(event.body) // Fixing JSON.parse typo
  try {
    const params = {
      TableName: PRODUCTS_TABLE_NAME,
      Key: { productsId }, // Fixing 'Key' casing
      UpdateExpression: 'set #title = :title, #body = :body',
      ExpressionAttributeNames: {
        '#title': 'title',
        '#body': 'body'
      },
      ExpressionAttributeValues: {
        ':title': data.title,
        ':body': data.body
      },
      ConditionExpression: 'attribute_exists(productsId)' // Ensure the product exists before updating
    }
    await documentClient.update(params).promise()
    cb(null, send(200, data)) // Respond with success
  } catch (error) {
    console.log(error)
    cb(null, send(500, error.message)) // Handle error
  }
}

module.exports.deleteProduct = async (event, context, cb) => {
  let productsId = event.pathParameters.id;
  try {
    const params = {
      TableName: PRODUCTS_TABLE_NAME,
      Key: { productsId },
      ConditionExpression: 'attribute_exists(productsId)'
    }
    await documentClient.delete(params).promise();
    cb(null, send(200, productsId))
    
  } catch(err){
     cb(null, send(500, err.message))
     console.log(err)
  }
}

module.exports.getAllProduct = async (event, context, cb) => {
  try {
    const params = {
      TableName: PRODUCTS_TABLE_NAME
    }
    const products = await documentClient.scan(params).promise()
    cb(null, send(200, products))
  } catch (err) {
    cb(null, send(500 , err.message))
  }
}
