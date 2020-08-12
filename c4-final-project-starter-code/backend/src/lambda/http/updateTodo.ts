import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

import * as AWS  from 'aws-sdk'
import { getUserId } from '../utils'
//import { eventNames } from 'cluster';

const todosTable = process.env.TODOS_TABLE
const docClient = new AWS.DynamoDB.DocumentClient()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)

  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  await docClient.update({
    TableName: todosTable,
    Key:{
      userId:userId,
      todoId:todoId
    },
    
    UpdateExpression: "set #name = :name, #due = :due, #done = :done",
    ExpressionAttributeNames: {'#name':'name', '#due':'dueDate', '#done':'done'},
    ExpressionAttributeValues: {
      ":name": updatedTodo.name,
      ":due": updatedTodo.dueDate,
      ":done": updatedTodo.done
    }
  }).promise()
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ""
  }
}
