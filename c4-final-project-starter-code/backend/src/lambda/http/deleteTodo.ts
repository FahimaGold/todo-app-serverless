import 'source-map-support/register'

import {deleteTodoItem} from '../../businessLogic/todos'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import { getUserId } from '../utils'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  // TODO: Remove a TODO item by 
  const userId = getUserId(event)
  await deleteTodoItem(userId, todoId)
  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ""
   
  }
}
