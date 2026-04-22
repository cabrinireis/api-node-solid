import { CheckIn } from "generated/prisma/client";
import CheckInsRepository from "../check-ins-repository";
import { CheckInUncheckedCreateInput } from "generated/prisma/models";
import { randomUUID } from "crypto";

export class InMemoryCheckInsRepository  implements CheckInsRepository {
      public items: CheckIn[] = []

      async create(data: CheckInUncheckedCreateInput): Promise<CheckIn> {
            const checkIn = {
                id: randomUUID(),
                user_id: data.user_id,
                gym_id: data.gym_id,
                validated_at: data.validated_at ? new Date(data.validated_at) : null,
                created_at: new Date(),
            }
            this.items.push(checkIn)
            return checkIn
      }
}
