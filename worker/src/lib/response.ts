export interface PaginatedResponse<T> {
  data: T[]
  meta: { total: number; page: number; pageSize: number; pageCount: number }
}

export function paginated<T>(
  data: T[],
  total: number,
  page: number,
  pageSize: number,
): PaginatedResponse<T> {
  return {
    data,
    meta: { total, page, pageSize, pageCount: Math.ceil(total / pageSize) },
  }
}

/** Strip protected fields before an update/insert. */
export function omitProtected(body: Record<string, unknown>): Record<string, unknown> {
  const { id: _id, user_id: _uid, created_at: _ca, ...rest } = body
  void _id; void _uid; void _ca
  return rest
}