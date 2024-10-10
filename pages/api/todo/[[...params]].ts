import { createHandler, Get, Param, Post, Req, Body, Delete, ValidationPipe } from "next-api-decorators";
import { IsDate, IsNotEmpty, IsNumber, isString, IsString, MinDate, MinLength, ValidateNested } from 'class-validator';

class Todo {

  @IsNotEmpty()
  id!: string;

  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsDate()
  creationDate!: Date;

  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date())
  dateTodo!: Date;
}

const todosList: Todo[] = [];

class TodoHandler {
  @Post()
  createTodo(@Body(ValidationPipe) body : Todo ) {
    //const newTodo = new Todo(body.name, new Date(), body.dateTodo);
    todosList.push(body);
    return 'New Todo: ' + body.name;
  }
  
  @Delete("/:name")
  todoWithParams(@Param("name") name: string) {
    for (let i = 0; i < todosList.length; i++) {
      if (todosList[i].name === name) {
        todosList.splice(i, 1);
        return `Todo: ${name} deleted. `;
      } 
    }
    return `Todo: ${name} not found. `;
  }

  @Get()
  listAllTodos() {
    return todosList;
  }
}

export default createHandler(TodoHandler);
