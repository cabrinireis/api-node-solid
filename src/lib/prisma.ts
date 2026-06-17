import { PrismaClient } from '../../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

let prismaInstance: PrismaClient | null = null

function getSchemaFromDatabaseUrl(connectionString: string) {
    try {
        const url = new URL(connectionString)
        return url.searchParams.get('schema') ?? undefined
    } catch {
        return undefined
    }
}

export function getRawTableName(table: string) {
    const schema = process.env.DATABASE_URL
        ? getSchemaFromDatabaseUrl(process.env.DATABASE_URL)
        : undefined

    return schema ? `"${schema}"."${table}"` : table
}

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL

    if (!connectionString) {
        throw new Error('DATABASE_URL is not defined')
    }

    const schema = getSchemaFromDatabaseUrl(connectionString)
    const adapter = new PrismaPg(
        { connectionString },
        schema ? { schema } : undefined,
    )

    return new PrismaClient({ adapter })
}

export function getPrismaClient(): PrismaClient {
    if (!prismaInstance) {
        prismaInstance = createPrismaClient()
    }

    return prismaInstance
}

export async function resetPrismaClient() {
    if (prismaInstance) {
        await prismaInstance.$disconnect()
        prismaInstance = null
    }
}

export const prisma = new Proxy({} as PrismaClient, {
    get(_target, prop, receiver) {
        const client = getPrismaClient()
        const value = Reflect.get(client, prop, receiver)

        if (typeof value === 'function') {
            return value.bind(client)
        }

        return value
    },
})
