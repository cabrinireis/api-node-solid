import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
        const email = `teste-${Date.now()}@example.com`

        const response = await request(app.server).post('/users').send({
            name: 'Fulano testesssss',
            email,
            password: '123456222',
        })
        expect(response.statusCode).toEqual(201)
    })
})
