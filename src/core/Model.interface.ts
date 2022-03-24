import type = require('@/types')
export type meta = {
  tableName?: string
  orderByMode?: 'ASC' | 'DESC'
}

export interface selectOption {
  fields?: string[],
  where?: where[]
  limit?: {
    rowCount: number,
    offset?: number
  }
  groupBy?: string[]
  orderBy?: orderBy[]
}

type orderBy = {
  mode?: 'ASC' | 'DESC',
  colName: string
}
type where = {
  colName: string,
  operate?: string,
  condition: string
}
