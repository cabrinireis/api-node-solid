import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseParams {
    name: string
    email: string
    password: string
}
export class RegisterUseCase {
    constructor(private usersRepository: any) {}

    async execute({ name, email, password }: RegisterUseCaseParams) {
        const password_hash = await hash(password, 5)

        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (userWithSameEmail) {
            throw new Error('Email already exists')
        }

        await this.usersRepository.createUser({
            name,
            email,
            password_hash,
        })
    }
}
