import { prisma } from "@/config";
import { Payment, TicketStatus, Prisma } from "@prisma/client";

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(ticketId: number, params: PaymentParams) {
  const createPayment = prisma.payment.create({
    data: {
      ticketId,
      ...params,
    },
  });
  const changeStatusTicketPayment = prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
  return await prisma.$transaction([createPayment, changeStatusTicketPayment], {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  });
}

export type PaymentParams = Omit<Payment, "id" | "createdAt" | "updatedAt">;

const paymentRepository = {
  findPaymentByTicketId,
  createPayment,
};

export default paymentRepository;
