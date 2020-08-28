import {createTodo, deleteTodo, updateTodo, getTodos} from '../dbAccess/todosAccess'

import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const  bucketName = process.env.IMAGES_S3_BUCKET

export async function createTodoItem(newTodo: CreateTodoRequest, userId: string, todoId: string) {
 
  const newItem = {
    userId,
    todoId,
    ...newTodo,
    attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${todoId}`,
    createdAt:new Date().toISOString(),
    done:false

  }
  console.log('Storing new item: ', newItem)
 await createTodo(newItem)
  return newItem
}

export async function deleteTodoItem(userId: string, todoId: string){
  console.log('deleting item: ', todoId)
  await deleteTodo(userId, todoId)
}


export async function updateTodoItem(userId: string, todoId: string, updatedTodo: UpdateTodoRequest){
  console.log('updating item: ', todoId)
  await updateTodo(userId, todoId, updatedTodo)
}

export async function getTodosItems(userId: string) {
 
  console.log('Getting items for user: ', userId)
 const items = await getTodos(userId)
  return items
}
