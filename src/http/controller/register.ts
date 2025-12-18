import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
export const app = fastify()

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const createUserSchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6),
    })

    const { name, email, password } = createUserSchema.parse(request.body)
    try {
        const userRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(userRepository)

        await registerUseCase.execute({ name, email, password })
    } catch (error) {
        return reply.status(400).send({ message: (error as Error).message })
    }
    return reply.status(201).send({ message: 'User created successfully' })
}
