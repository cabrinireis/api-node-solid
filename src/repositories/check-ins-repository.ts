import { CheckIn, Prisma } from "generated/prisma/client";

export default class CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        throw new Error("Method not implemented.");
    }
}
