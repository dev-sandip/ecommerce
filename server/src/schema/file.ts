import { z } from "zod";

/**
 * Schema for validating file objects.
 *
 * This schema ensures that a file object contains the following properties:
 * - `fileId`: A string representing the unique identifier of the file.
 * - `name`: A string representing the name of the file.
 * - `url`: A string representing the URL of the file, which must be a valid URL.
 * - `thumbnailUrl`: An optional string representing the URL of the file's thumbnail, which must be a valid URL if provided.
 */
export const FileSchema = z.object({
  fileId: z.string().optional(),
  name: z.string().optional(),
  url: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
});
