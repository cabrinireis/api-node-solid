import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/runtime'
import { PrismaClient } from '../../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { resetPrismaClient } from '../../src/lib/prisma'

let prisma: PrismaClient | null = null

function generateDatabaseUrl(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined in environment variables')
    }

    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schema)

    return url.toString()
}

export default <Environment>{
    name: 'prisma',
    viteEnvironment: 'ssr',
    async setup() {
        const schema = randomUUID()
        const databaseUrl = generateDatabaseUrl(schema)

        await resetPrismaClient()

        process.env.DATABASE_URL = databaseUrl

        prisma = new PrismaClient({
            adapter: new PrismaPg(
                { connectionString: databaseUrl },
                { schema },
            ),
        })

        execSync('npx prisma migrate deploy', {
            env: {
                ...process.env,
                DATABASE_URL: databaseUrl,
            },
        })

        return {
            async teardown() {
                if (prisma) {
                    await prisma.$executeRawUnsafe(
                        `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
                    )
                    await prisma.$disconnect()
                }

                await resetPrismaClient()
            },
        }
    },
}
