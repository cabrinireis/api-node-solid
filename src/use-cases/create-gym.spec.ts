import { expect, describe, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

describe('Create Gym Use Case', () => {
    it('should to register', async () => {
        const gymsRepository = new InMemoryGymsRepository()
        const createGymUseCase = new CreateGymUseCase(gymsRepository)

        const { gym } = await createGymUseCase.execute({
            title: 'Gym 1',
            description: 'Description 1',
            phone: '123456789',
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        expect(gym.id).toEqual(expect.any(String))
    })

})
