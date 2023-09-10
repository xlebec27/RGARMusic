export function cropImage(image){
    if (image.height > image.width) {
        image.height = image.width
    }
    if (image.width > image.height) {
        image.width = image.height
    }
    return image
}