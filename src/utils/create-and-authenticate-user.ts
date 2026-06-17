import { FastifyInstance } from 'fastify/types/instance'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(
    app: FastifyInstance,
    isAdmin = false
) {
    await request(app.server)
        .post('/users')
        .send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

    if (isAdmin) {
        await prisma.user.update({
            where: { email: 'johndoe@example.com' },
            data: { role: 'ADMIN' },
        })
    }

    const response = await request(app.server).post('/sessions').send({
        email: 'johndoe@example.com',
        password: '123456',
    })

    const { token } = response.body
    return { token }
}
