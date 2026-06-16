import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factory/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsSchema = z.object({
        gymId: z.string(),
    })

    const createCheckInBodySchema = z.object({
      latitude: z.number(),
      longitude: z.number(),
    })


    const { gymId } = createCheckInParamsSchema.parse(request.params)
    const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
    
    const createCheckInUseCase = makeCheckInUseCase()

        await createCheckInUseCase.execute({ gymId, userId: request.user.sub, userLatitude: latitude, userLongitude: longitude })

    return reply.status(201).send({ message: 'User created successfully' })
}
