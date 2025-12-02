import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { z } from 'zod'
export const app = fastify()

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const createUserSchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6),
    })

    const { name, email, password } = createUserSchema.parse(request.body)
    const password_hash = await hash(password, 5)

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (userWithSameEmail) {
        return reply.status(409).send({ message: 'User already exists' })
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        },
    })

    return reply.status(201).send({ message: 'User created successfully' })
}
