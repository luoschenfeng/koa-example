import { meta, selectOption } from './Model.interface'
import { koaError } from '@/utils'
import type = require('@/types')
/**
 * base model constructor
 */
export default abstract class Model {
  protected meta: meta
  private object: selectOption = null
  constructor() {}

  /**
   * select and return the model list
   */
  public select() {
    this.object = null
  }

  public where(...arg: string[]) {
    if (arg.length < 2) throw koaError('Model', 'where length must 2 or 3')
    if (arg.length > 2) {
      this.object.where.push({
        colName: arg[0],
        operate: arg[1],
        condition: arg[2] 
      })
    } else {
      this.object.where.push({
        colName: arg[0],
        condition: arg[1] 
      })
    }
  }

  public groupBy(expr: string) {
    this.object.groupBy.push(expr)
  }

  public limit(rowCount: number, offset?: number) {
    this.object.limit.rowCount = rowCount
    this.object.limit.offset = offset
  }

  public orderBy(colName: string, mode?: 'ASC' | 'DESC') {
    this.object.order.push({
      colName: colName,
      mode: mode
    })
  }

   /**
   * select and return the model list
   */
  public find() {
    
    this.object = null
  }

  /**
   * insert a model data
   */
  public insert(data: type.likeObject) {
  }

  /**
   * update the model data
   */
  public update(key, value) {
    this[key] = value
  }

  private getTableName(name: string) {
    return name.replace(/[A-Z]/g, function (match: string) {
      return '_' + match.toLowerCase()
    })
  }
}
