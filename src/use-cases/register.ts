import { UserRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistError } from './errors/user-already-exist-error'
import { User } from 'generated/prisma/browser'

interface RegisterUseCaseParams {
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UserRepository) {}

    async execute({
        name,
        email,
        password,
    }: RegisterUseCaseParams): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 5)

        const userWithSameEmail: User | null =
            await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistError()
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        })

        return {
            user,
        }
    }
}
