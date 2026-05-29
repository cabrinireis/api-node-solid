import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prima-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
    const gymnsRepository = new PrismaGymsRepository()
    const useCase = new FetchNearbyGymsUseCase(gymnsRepository)

    return useCase
}
