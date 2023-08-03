import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateTodoDto, EditTodoDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService) {}

    async createTodo(user: User, dto: CreateTodoDto) {
        const todo = await this.prisma.todo.create({
            data: {
                userId: user.id,
                ...dto
            }
        })
    }

    getTodo(user: User) {
        return this.prisma.todo.findMany({
            where: {
                userId: user.id
            }
        })
    }

    getTodoById(user: User, todoId: number) {
        return this.prisma.todo.findFirst({
            where: {
                userId: user.id,
                id: todoId
            }
        })
    }

    async editTodoById(user: User, dto: EditTodoDto, todoId: number) {
        const todo = await this.prisma.todo.findUnique({
            where: {
                id: todoId
            }
        })
        if (!todo || todo.userId !== user.id) {
            throw new ForbiddenException('You do not have credentials to edit this')
        }

        return this.prisma.todo.update({
            where: {
                id: todoId
            },
            data : {
                ...dto
            }
        })
    }

    async deleteTodoById(user: User, todoId: number) {
        const todo = await this.prisma.todo.findUnique({
            where: {
                id: todoId
            }
        })
        if (!todo || todo.userId !== user.id) {
            throw new ForbiddenException('You do not have credentials to edit this')
        }

        await this.prisma.todo.delete({
            where: {
                id: todoId
            }
        })
    }
}
