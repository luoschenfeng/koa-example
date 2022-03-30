import {
  createPool, 
} from 'mysql'
import setting from '@/setting'

import {
  promisify, 
} from 'util'


const pool  = createPool({
  host: setting.mysql.host,
  user: setting.mysql.user,
  password: setting.mysql.password,
  database: setting.mysql.database,
  charset: setting.mysql.charset || 'utf8mb4',
  connectionLimit: setting.mysql.connectionLimit || 100,
});

const mysql = {
  exec: promisify(pool.query.bind(pool)),
}

export default mysql