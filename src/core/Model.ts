import { meta, selectOption } from './Model.interface'
import { appError, appWarn } from '@/utils'
import type = require('@/types')
import mysql from './mysql'

/**
 * base model constructor
 */
export default abstract class Model {
  protected meta: meta = {
    orderByMode: 'DESC'
  }
  private object: selectOption = null
  constructor() {
    this.meta.tableName || (this.meta.tableName = this.getTableName(new.target.name))
  }

  /**
   * select and return the model list
   */
  public async select(): Promise<any[]> {

    let statement = 'SELECT '

    if (this.object.fields) {
      statement = `SELECT `
      for (let index = 0; index < this.object.fields.length; index++) {
        let field = this.object.fields[index]
        if (index === 0) {
          statement += `${field}`
        } else {
          statement += `, ${field}`
        }
      }
    } else {
      statement += `*`
    }
    statement += ` FROM ${this.meta.tableName} `

    if (this.object.where.length === 0) {
      this.object = null
      statement += ';'
      return mysql.exec(statement)
    }

    for (let index = 0; index < this.object.where.length; index++) {
      let whereCondition = this.object.where[index]

      if (index === 0 ) {
        statement += `WHERE ${whereCondition.colName} ${whereCondition.operate || '='} ${whereCondition.condition} `
      } else {
        statement += `AND ${whereCondition.colName} ${whereCondition.operate || '='} ${whereCondition.condition} `
      }
    }

    for (let index = 0; index < this.object.groupBy.length; index++) {
      let groupByCondition = this.object.groupBy[index]

      if (index === 0 ) {
        statement += `GROUP BY ${groupByCondition} `
      } else {
        statement += `, ${groupByCondition} `
      }
    }

    for (let index = 0; index < this.object.orderBy.length; index++) {
      let orderCondition = this.object.orderBy[index]

      if (index === 0 ) {
        statement += `ORDER BY ${orderCondition.colName} ${orderCondition.mode || this.meta.orderByMode} `
      } else {
        statement += `, ${orderCondition.colName} ${orderCondition.mode || this.meta.orderByMode} `
      }
    }

    if (this.object.limit) {
      statement += `LIMIT ${this.object.limit.rowCount} OFFSET ${this.object.limit.offset || 0}`
    }

    this.object = null
    statement += ';'
    return mysql.exec(statement)

  }

  public fields(fields: string[]) {
    this.object || (this.object = {
      where: [],
      groupBy: [],
      orderBy: [],
    })
    this.object.fields || (this.object.fields = fields)
    return this
  }

  public where(...arg: any[]) {
    this.object || (this.object = {
      where: [],
      groupBy: [],
      orderBy: [],
    })
    if (arg.length < 2) throw appError('Model', 'where length must 2 or 3')
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
    return this
  }

  public groupBy(expr: string) {
    this.object.groupBy.push(expr)
    return this
  }

  public limit(rowCount: number, offset?: number) {
    this.object.limit || (this.object.limit = {
      rowCount,
      offset
    })
    return this
  }

  public orderBy(colName: string, mode?: 'ASC' | 'DESC') {
    this.object.orderBy.push({
      colName: colName,
      mode: mode
    })
    return this
  }

   /**
   * select and return the model list
   */
  public async find() {
    if (this.object.limit && this.object.limit.rowCount !== 1) appWarn('limit statement will ignore at find method')

    this.object.limit = {rowCount: 1}
    return this.select()
  }

  /**
   * insert a model data
   */
  public async insert(data: type.likeObject) {
    let fields = ''
    let values = ''
    for (let index = 0; index < Object.keys(data).length; index++) {
      let key = Object.keys(data)[index]
      let value = typeof data[key] === 'string' ? `'${data[key]}'` : data[key]
      if (index === 0 ) {
        fields += `${key}`
        values += `${value}`
      } else {
        fields += `, ${key}`
        values += `, ${value}`
      }
    }
    let statement = `INSERT INTO ${this.meta.tableName} (${fields}) VALUE (${values});`
    this.object = null
    return mysql.exec(statement)
  }

  /**
   * update the model data
   */
  public async update(data: type.likeObject) {
    let statement = `UPDATE ${this.meta.tableName} SET `

    for (let index = 0; index < Object.keys(data).length; index++) {
      let key = Object.keys(data)[index]
      let value = typeof data[key] === 'string' ? `'${data[key]}'` : data[key]

      if (index === 0 ) {
        statement += `${key} = ${value}`
      } else {
        statement += `, ${key} = ${value}`
      }
    }

    if (this.object.where.length === 0) {
      statement += `;`
      this.object = null
      return mysql.exec(statement)
    }

    for (let index = 0; index < this.object.where.length; index++) {
      let whereCondition = this.object.where[index]

      if (index === 0 ) {
        statement += ` WHERE ${whereCondition.colName} ${whereCondition.operate || '='} ${whereCondition.condition} `
      } else {
        statement += `AND ${whereCondition.colName} ${whereCondition.operate || '='} ${whereCondition.condition} `
      }
    }

    statement += `;`

    this.object = null
    return mysql.exec(statement)
  }

  private getTableName(name: string) {
    const underName =  name.replace(/[A-Z]/g, function (match: string) {
      return '_' + match.toLowerCase()
    })
    return underName[0] === '_' ? underName.slice(1) : underName
  }
}
