import Model from '../core/Model'

export class User extends Model {
  id: number
  sex: string
  sex_desc: string
  username: string
  password: string
  mail: string
  create_time: string
  update_time: string
}
