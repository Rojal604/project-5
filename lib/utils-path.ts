/**
 * Get the base path for the application
 * This is used to prefix asset paths when deployed to GitHub Pages
 */
export function getBasePath() {
    return process.env.NODE_ENV === 'production' ? '/project-5' : ''
}

/**
 * Get the full path for an image
 * @param imagePath - The image path (e.g., "/image.jpg")
 * @returns The full path with base path prefix
 */
export function getImagePath(imagePath: string) {
    if (!imagePath) return imagePath
    if (imagePath.startsWith('http')) return imagePath
    return `${getBasePath()}${imagePath}`
}
