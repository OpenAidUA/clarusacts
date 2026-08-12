import { prisma } from '@/lib/db';
import type { Prisma } from '@prisma/client';
import { CreateClientRequest, UpdateClientRequest } from './domain';
import {
  normalizePage,
  PAGE_SIZE,
  type PaginatedResult,
} from '@/lib/pagination';

export interface GetClientsOptions {
  search?: string;
  sortBy?: 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
}

function getClientsWhere(
  organizationId: string,
  search?: string,
): Prisma.ClientWhereInput {
  const normalizedSearch = search?.trim();

  return {
    organizationId,
    ...(normalizedSearch
      ? {
          OR: [
            {
              name: {
                contains: normalizedSearch,
                mode: 'insensitive' as const,
              },
            },
            {
              email: {
                contains: normalizedSearch,
                mode: 'insensitive' as const,
              },
            },
            {
              edrpou: {
                contains: normalizedSearch,
                mode: 'insensitive' as const,
              },
            },
          ],
        }
      : {}),
  };
}

export async function getOrganizationClients(
  organizationId: string,
  options: GetClientsOptions = {},
) {
  const { search, sortBy = 'createdAt', sortOrder = 'desc' } = options;

  return prisma.client.findMany({
    where: getClientsWhere(organizationId, search),
    orderBy: [{ [sortBy]: sortOrder }, { id: 'desc' }],
    include: { _count: { select: { acts: true } } },
  });
}

export async function getPaginatedOrganizationClients(
  organizationId: string,
  options: GetClientsOptions = {},
) {
  const {
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page: requestedPage = 1,
  } = options;
  const where = getClientsWhere(organizationId, search);
  const total = await prisma.client.count({ where });
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const page =
    totalPages === 0 ? 1 : Math.min(normalizePage(requestedPage), totalPages);

  const clients = await prisma.client.findMany({
    where,
    orderBy: [{ [sortBy]: sortOrder }, { id: 'desc' }],
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: { _count: { select: { acts: true } } },
  });

  return {
    items: clients,
    page,
    pageSize: PAGE_SIZE,
    total,
    totalPages,
  } satisfies PaginatedResult<(typeof clients)[number]>;
}

export async function getClientById(clientId: string, organizationId: string) {
  return await prisma.client.findFirst({
    where: {
      id: clientId,
      organizationId,
    },
  });
}

export async function createClient(
  organizationId: string,
  data: CreateClientRequest,
) {
  return await prisma.client.create({
    data: {
      organizationId,
      ...data,
    },
  });
}

export async function updateClient(
  clientId: string,
  organizationId: string,
  data: UpdateClientRequest,
) {
  return await prisma.client.update({
    where: {
      id: clientId,
      organizationId,
    },
    data,
  });
}

export async function deleteClient(clientId: string, organizationId: string) {
  return await prisma.client.delete({
    where: {
      id: clientId,
      organizationId,
    },
  });
}
