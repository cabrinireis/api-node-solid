import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

       it('should be able to get profile', async () => {
            const response = await request(app.server).post('/users').send({
                name: 'Fulano testesssss',
                email: 'teste@exemple.com',
                password: '123456222',
            })
    
            const authResponse = await request(app.server).post('/sessions').send({
                email: 'teste@exemple.com',
                password: '123456222',
            })
            
            const { token } = authResponse.body
    
            const profileResponse = await request(app.server)
                .get('/profile')
                .set('Authorization', `Bearer ${token}`)
                .send()
            
            expect(profileResponse.statusCode).toEqual(200)
            expect(profileResponse.body.user).toEqual(expect.objectContaining({
                email: 'teste@exemple.com',
            }))
        })
})
