export default {
  mysql: {
    host: 'localhost',
    password: '',
    user: 'root',
    database: 'koa',
    charset: 'utf8mb4',
    connectionLimit: 1e5, // 总的连接数， mysql极限是 1e5 ，这里表示连接并发数没有到达 1e5 就会创建新的连接， 只有连接数大于 1e5 才会排队
  },
}