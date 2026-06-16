import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from '@/http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { prisma } from '@/lib/prisma'
import { ZodError } from 'zod'
export const app = fastify()
import { env } from '@/env'



app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})

app.addHook('onClose', async () => {
    await prisma.$disconnect()
})

app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler(async (error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error', issues: error.format() })
    }
    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // Here you could integrate with a logging service like Sentry
    }

    return reply.status(500).send({
        message: 'Internal server error',
    })
})
