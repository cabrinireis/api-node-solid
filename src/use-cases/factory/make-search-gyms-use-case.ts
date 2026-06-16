import { SearchGymsUseCase } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prima-gyms-repository'

export function makeSearchGymsUseCase() {
    const gymsReposotory = new PrismaGymsRepository()
    const useCase = new SearchGymsUseCase(gymsReposotory)

    return useCase
}
``
