import { UserRepository } from '@/repositories/users-repository'
import { User } from 'generated/prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
    userId: string
}
interface GeretUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private usersRepository: UserRepository) {}

    async execute({
        userId,
    }: GetUserProfileUseCaseRequest): Promise<GeretUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)
        if (!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user,
        }
    }
}
