import { bufferToFormData, bufferToString } from "hono/utils/buffer";

import imageKit from "@/config/image-kit";

/**
 * Uploads an image file to ImageKit.
 * @param file - The image file to upload.
 * @param folder - The folder where the image will be stored.
 * @returns A promise that resolves to the upload result or rejects with an error message.
 */
export async function uploadFile(file: File, folder: string): Promise<any> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    // eslint-disable-next-line node/prefer-global/buffer
    const buffer = Buffer.from(arrayBuffer);
    const result = imageKit.upload({
      file: buffer,
      fileName: file.name,
      folder,
    });

    return result;
  }
  catch (error) {
    throw new Error(`Upload failed: ${error}`);
  }
}

/**
 * Deletes files from ImageKit.
 * @param fileId - The file ID or array of file IDs to delete.
 * @returns A promise that resolves when the file(s) are deleted or rejects with an error message.
 */
export async function deleteFiles(fileId: string | string[]): Promise<any> {
  try {
    if (Array.isArray(fileId)) {
      const deleteResults = await Promise.all(
        fileId.map(async (id) => {
          return imageKit.deleteFile(id);
        }),
      );
      return deleteResults;
    }
    else {
      const result = await imageKit.deleteFile(fileId);
      return result;
    }
  }
  catch (error) {
    throw new Error(`File deletion failed: ${error}`);
  }
}

export async function uploadArrayOfImages(images: File[], folder: string) {
  return Promise.all(
    images.map(async (image) => {
      const uploadedImage = await uploadFile(image, folder);
      return {
        fileId: uploadedImage.fileId,
        url: uploadedImage.url,
        name: uploadedImage.name,
        thumbnailUrl: uploadedImage.thumbnailUrl,
      };
    }),
  );
}
