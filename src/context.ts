import { canvas } from "./canvas.js"

// @ts-expect-error TS(2531): Object is possibly 'null'.
export const context = canvas.getContext('2d')