import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

       it('should be able to get profile', async () => {
            
          const { token } = await createAndAuthenticateUser(app)
    
            const profileResponse = await request(app.server)
                .get('/me')
                .set('Authorization', `Bearer ${token}`)
                .send()
            
            expect(profileResponse.statusCode).toEqual(200)
            expect(profileResponse.body).toEqual(expect.objectContaining({
                email: 'johndoe@example.com',
            }))
        })
})
