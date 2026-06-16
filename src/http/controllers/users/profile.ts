import { makeGetUserProfileUseCase } from "@/use-cases/factory/make-fetch-user-check-ins-history-use-case";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()
    const getUserProfile = makeGetUserProfileUseCase()

    const { user } = await getUserProfile.execute({
        userId: request.user.sub,
    })

    return reply.status(200).send({ ...user, password_hash: undefined })
}
