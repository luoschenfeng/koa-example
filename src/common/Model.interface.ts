import type = require('@/types')
export type meta = {
  tableName: string
}

export interface selectOption {
  where?: where[]
  limit?: {
    rowCount: number,
    offset?: number
  }
  groupBy?: string[]
  order?: order[]
}

type order = {
  mode?: 'ASC' | 'DESC',
  colName: string
}
type where = {
  colName: string,
  operate?: string,
  condition: string 
}