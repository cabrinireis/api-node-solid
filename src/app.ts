import fastify from 'fastify'
import { prisma } from './lib/prisma'
import { z } from 'zod'
export const app = fastify()

app.post('/users', async (request, reply) => {
    const createUserSchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6),
    })

    const { name, email, password } = createUserSchema.parse(request.body)
    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: password,
        },
    })

    return reply.status(201).send({ message: 'User created successfully' })
})
