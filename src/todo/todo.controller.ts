import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { TodoService } from './todo.service';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { CreateTodoDto, EditTodoDto } from './dto';

@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {

    constructor(private todoService: TodoService) {}

    @Post('create')
    createTodo(@GetUser() user: User, @Body() dto: CreateTodoDto) { return this.todoService.createTodo(user, dto)}

    @Get()
    getTodo(@GetUser() user: User) { return this.todoService.getTodo(user)}

    @Get(':id')
    getTodoById(@GetUser() user: User, @Param('id', ParseIntPipe) todoId: number) { return this.todoService.getTodoById(user, todoId)}

    @Patch(':id')
    editTodoById(@GetUser() user: User, @Body() dto: EditTodoDto, @Param('id', ParseIntPipe) todoId: number) { return this.todoService.editTodoById(user, dto, todoId)}

    @Delete(':id')
    deleteTodoById(@GetUser() user: User, @Param('id', ParseIntPipe) todoId: number) { return this.todoService.deleteTodoById(user, todoId)}
}
