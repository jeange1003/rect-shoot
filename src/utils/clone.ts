/**
 * WIP, clone depth =1
 * @param object 
 * @returns 
 */
export function clone<T extends any>(object: T): T {
  let newObject: any = {}
  Object.entries(object as any).forEach(([key, value]) => {
    if (value instanceof Array) {
      newObject[key] = [...value]
    } else if (value instanceof Map) {
      newObject[key] = new Map(value)
    }
    // else if (typeof value === 'object') {
    //   // inifinity loop risk
    //   newObject[key] = clone(value)
    // } 
    else {
      newObject[key] = value
    }
  })
  Object.setPrototypeOf(newObject, Object.getPrototypeOf(object))
  return newObject
}