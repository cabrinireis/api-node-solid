import { prisma } from '@/lib/prisma'
import { UserRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistError } from './errors/user-already-exist-error'

interface RegisterUseCaseParams {
    name: string
    email: string
    password: string
}
export class RegisterUseCase {
    constructor(private usersRepository: UserRepository) {}

    async execute({ name, email, password }: RegisterUseCaseParams) {
        const password_hash = await hash(password, 5)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistError()
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash,
        })
    }
}
