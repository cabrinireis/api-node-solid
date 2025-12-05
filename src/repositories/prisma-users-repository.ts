import { prisma } from '@/lib/prisma'
import { Prisma } from 'generated/prisma/client'

export class UsersRepository {
    async createUser(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })
        return user
    }
}
