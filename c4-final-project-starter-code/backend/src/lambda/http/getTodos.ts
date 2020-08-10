import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE
const createdAtIndex = process.env.CREATED_AT_INDEX
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  const userId = getUserId(event)
  console.log('Processing event: ' , event)
  const result  =  await docClient.query({
    TableName:todosTable,
    IndexName:createdAtIndex,
    KeyConditionExpression:'userId = :userId',
    ExpressionAttributeValues:{
      ':userId':userId
    }
  }).promise()

  
const items = result.Items

return {
  statusCode:200,
  headers:{
    'Access-Control-Allow-Origin': '*'
  },
  body: JSON.stringify({
    items:items
  })
}
}
