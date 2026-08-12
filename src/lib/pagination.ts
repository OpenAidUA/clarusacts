export const PAGE_SIZE = 10;

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function parsePage(value: string | undefined): number {
  const page = Number(value);

  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export function normalizePage(value: number): number {
  return Number.isSafeInteger(value) && value > 0 ? value : 1;
}