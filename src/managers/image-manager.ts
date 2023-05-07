export class ImageManager {
  cache = new Map<string, HTMLImageElement>()
  async getImage(src: string) {
    let image = this.cache.get(src)
    if (image) {
      return image
    }
    image = await this.loadImage(src)
    this.cache.set(src, image)
    return image
  }
  loadImage(src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()
      image.src = src
      image.onload = function () {
        resolve(image)
      }
      image.onerror = reject
    })
  }
}