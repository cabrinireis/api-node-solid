import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factory/make-fetch-nearby-gyms-use-case'
export const app = fastify()

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
    const nearbyGymsQuerySchema = z.object({
     latitude: z.coerce.number(),
     longitude: z.coerce.number(),
    })


    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

    const { gyms } = await fetchNearbyGymsUseCase.execute({ userLatitude: latitude, userLongitude: longitude })

    return reply.status(200).send({ gyms })
}
