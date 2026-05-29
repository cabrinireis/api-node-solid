import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { CheckInUseCase } from '../check-in'
import { CreateGymUseCase } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prima-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    return useCase
}
