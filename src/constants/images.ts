export const MEDIA_TYPE = {
  IMAGE: "image",
  VIDEO: "video",
} as const;

export const ALLOWED_IMAGE_TYPE = ["image/jpg", "image/jpeg", "image/png"];

export const MAX_COVER_IMAGE_SIZE = 5 * 1024 * 1024;

export const ASPECT_RATIO = {
  CERTIFICATE: 1 / 1,
  DEFAUT: 19 / 9,
};
