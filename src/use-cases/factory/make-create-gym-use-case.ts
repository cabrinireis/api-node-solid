import { CreateGymUseCase } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prima-gyms-repository'

export function makeCreateGymUseCase() {
    const gymnsRepository = new PrismaGymsRepository()
    const useCase = new CreateGymUseCase(gymnsRepository)

    return useCase
}
