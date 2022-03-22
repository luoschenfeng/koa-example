export interface dynamicImport<T> {
  (): Promise<{default: T}>
}

export type likeObject = {
  [key: string]: any
}
