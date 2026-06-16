import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
        const response = await request(app.server).post('/users').send({
            name: 'Fulano testesssss',
            description: 'teste@exemple.com',
            phone: '123456222',
        })
        expect(response.statusCode).toEqual(201)
    })
})
