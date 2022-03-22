import { meta } from './Model.interface'
import type = require('@/types')
/**
 * base model constructor
 */
export default abstract class Model {
  protected meta: meta
  constructor() {}

  /**
   * select and return the model list
   */
  public select() {}

  public where() {}

  public group() {}

  public limit() {}

   /**
   * select and return the model list
   */
  public find() {}

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

  /**
   * if has same key  to execute replace
   * 
   */
  public replace() {}
}
