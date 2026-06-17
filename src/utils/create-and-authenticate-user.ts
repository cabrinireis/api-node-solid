import { FastifyInstance } from 'fastify/types/instance'
import { hash } from 'bcryptjs'
import request from 'supertest'

export async function createAndAuthenticateUser(
    app: FastifyInstance,
    isAdmin = false
) {
    await request(app.server)
        .post('/users')
        .send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' : 'USER',
        })

    const response = await request(app.server).post('/sessions').send({
        email: 'johndoe@example.com',
        password: '123456',
    })

    const { token } = response.body
    return { token }
}
