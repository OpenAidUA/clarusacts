import { prisma } from '../../../prisma/prisma-client';
import { calculateTotals } from './helpers';
import { CreateActRequest } from './domain';

export async function createAct(userId: string, payload: CreateActRequest) {
  const validatedAct = calculateTotals(payload.act);

  let clientId: string | null = payload.client.id;
  const clientSnapshot = payload.client.snapshot;

  if (payload.client.save === true && !clientId) {
    const client = await prisma.client.create({
      data: {
        ...clientSnapshot,
        userId,
      },
    });
    clientId = client.id;
  }

  const act = await prisma.act.create({
    data: {
      userId,
      clientId,
      clientSnapshot,
      data: validatedAct,
      templateVersion: 'v1',
      status: 'draft',
    },
  });

  return act;
}
