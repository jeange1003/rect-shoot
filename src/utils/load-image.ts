export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.src = src
    image.onload = function () {
      resolve(image)
    }
    image.onerror = reject
  })
}