export const canvas = document.getElementById('canvas')
// @ts-expect-error TS(2531): Object is possibly 'null'.
canvas.width = canvas.clientWidth;
// @ts-expect-error TS(2531): Object is possibly 'null'.
canvas.height = canvas.clientHeight;
