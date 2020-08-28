
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

import * as AWS  from 'aws-sdk'



const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE
//const  bucketName = process.env.IMAGES_S3_BUCKET
const createdAtIndex = process.env.CREATED_AT_INDEX



export async function createTodo(newItem: any) {


  console.log('Storing new item: ', newItem)
   await docClient
    .put({
      TableName: todosTable,
      Item: newItem
    })
    .promise()
  
  
 

}

export async function deleteTodo(userId: string, todoId: string) {
    await docClient.delete({
    TableName: todosTable,
    Key:{
      userId:userId,
      todoId:todoId
    }
    
  }).promise()

}

export async function updateTodo(userId: string, todoId: string, updatedTodo: UpdateTodoRequest){
  
    await docClient.update({
    TableName: todosTable,
    Key:{
      userId:userId,
      todoId:todoId
    },
    
    UpdateExpression: "set #name = :name, #due = :due, #done = :done",
    ExpressionAttributeNames: {'#name':'name', '#due':'dueDate', '#done':'done'}
,
    ExpressionAttributeValues: {
      ":name": updatedTodo.name,
      ":due": updatedTodo.dueDate,
      ":done": updatedTodo.done
    }
  }).promise()

}

export async function getTodos(userId: string): Promise<any>{
const result  =  await docClient.query({
    TableName:todosTable,
    IndexName:createdAtIndex,
    KeyConditionExpression:'userId = :userId',
    ExpressionAttributeValues:{
      ':userId':userId
    },
  }).promise()

  
const items = result.Items
  return items
}



