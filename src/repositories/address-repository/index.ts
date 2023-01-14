import { prisma } from "@/config";
import { Address, Prisma } from "@prisma/client";
import { CreateEnrollmentParams, UpdateEnrollmentParams } from "../enrollment-repository";

async function transactions(
  createdAddress: CreateAddressParams,
  updatedAddress: UpdateAddressParams,
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  const enrollmentUpdateorCreate = prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
  const addressUpdateorCreate = prisma.address.upsert({
    where: {
      enrollmentId: (await enrollmentUpdateorCreate).id,
    },
    create: {
      ...createdAddress,
      Enrollment: { connect: { id: (await enrollmentUpdateorCreate).id } },
    },
    update: updatedAddress,
  });
  return await prisma.$transaction([enrollmentUpdateorCreate, addressUpdateorCreate], {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  });
}
export type CreateAddressParams = Omit<Address, "id" | "createdAt" | "updatedAt" | "enrollmentId">;
export type UpdateAddressParams = CreateAddressParams;

const addressRepository = {
  transactions,
};

export default addressRepository;
