import setting from '@/setting'
declare module 'koa' {
    interface DefaultState  {
      setting: typeof setting
    }
}
