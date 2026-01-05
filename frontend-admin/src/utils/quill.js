// utils/imageHandler.js

/**
 * Extract base64 images from Quill Delta JSON
 */
export const extractBase64ImagesFromDelta = (delta) => {
    if (!delta || !delta.ops) return [];

    const images = [];

    delta.ops.forEach((op, index) => {
        if (op.insert && typeof op.insert === 'object' && op.insert.image) {
            const imageData = op.insert.image;

            // Check if it's a base64 data URL
            if (typeof imageData === 'string' && imageData.startsWith('data:')) {
                images.push({
                    index,
                    dataUrl: imageData,
                    type: getImageTypeFromDataUrl(imageData),
                    filename: generateFilename(imageData)
                });
            }
        }
    });
    return images;
};

/**
 * Get image type from data URL
 */
const getImageTypeFromDataUrl = (dataUrl) => {
    const match = dataUrl.match(/^data:image\/([a-zA-Z+]+);base64,/);
    return match ? match[1] : 'jpeg';
};

/**
 * Generate filename for image
 */
const generateFilename = (dataUrl) => {
    const type = getImageTypeFromDataUrl(dataUrl);
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 8);
    return `image_${timestamp}_${random}.${type}`;
};

/**
 * Convert base64 data URL to File object
 */
export const dataUrlToFile = (dataUrl, filename) => {
    try {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    } catch (error) {
        console.error('Error converting data URL to file:', error);
        return null;
    }
};

/**
 * Extract and convert all images from Delta to files
 */
export const extractImagesAsFiles = (delta) => {
    const imageData = extractBase64ImagesFromDelta(delta);
    const files = [];

    imageData.forEach((img) => {
        const file = dataUrlToFile(img.dataUrl, img.filename);
        if (file) {
            files.push({
                file,
                originalIndex: img.index,
                filename: img.filename
            });
        }
    });

    return files;
};

export const getDisplayValue = (quillObject) => {
    if (!quillObject || !quillObject.ops || !Array.isArray(quillObject.ops)) {
        return "N/A";
    }

    // Find the first text content
    for (const op of quillObject.ops) {
        if (op.insert && typeof op.insert === 'string' && op.insert.trim() !== '') {
            const text = op.insert.trim();
            // Skip if it's just a newline or formatting character
            if (text !== '\n' && text !== '') {
                return text;
            }
        }
    }

    // If no text found, look for an image
    for (const op of quillObject.ops) {
        if (op.insert && typeof op.insert === 'object' && op.insert.image) {
            return "Image Attached";
        }
    }

    return "N/A";
};
