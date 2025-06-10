export type MediaType = "image" | "video";

export type MIMEType = "png" | "jpg" | "jpeg";

export interface FileUploadPayloadType {
  file: File;
  mediaType: MediaType;
  duration?: number;
}

export interface FileUploadResponseType {
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  id: string;
  mediaUrl: string;
  mediaType: MediaType;
  mimeType: MIMEType;
  fileName: string;
  fullPath: string;
  duration: string;
  createdBy: string;
}

export type CurrentImageType = string;
export interface UploadedFileType {
  file: File;
  preview: string;
}
