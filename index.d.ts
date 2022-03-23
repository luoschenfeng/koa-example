import * as App from "koa"
import setting from '@/setting'
declare module 'koa' {
    class Application extends App {
        setting: typeof setting
    }
}