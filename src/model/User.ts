import Model from '../common/Model'

export class User extends Model {
  meta = {
    tableName: 'user'
  }

  name: string
  age: number
  address: string
  constructor () {
    super()
  }
}
