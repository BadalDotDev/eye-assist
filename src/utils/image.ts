/**
 * Creates an HTMLImageElement from a given URL.
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.setAttribute("crossOrigin", "anonymous");

    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);

    image.src = url;
  });

/**
 * Converts a degree value to radians.
 */
export function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Calculates the new dimensions after rotation.
 */
export function rotateSize(
  width: number,
  height: number,
  rotation: number,
): { width: number; height: number } {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * Converts a canvas to a cropped image file.
 */
export async function getCroppedImgNew(
  canvas: HTMLCanvasElement,
  fileName: string,
): Promise<File> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error("Canvas is empty"));

      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(dataURLtoFile(reader.result, fileName));
        } else {
          reject(new Error("Failed to convert blob to data URL"));
        }
      };
    }, "image/jpeg");
  });
}

/**
 * Converts a Data URL to a File object.
 */
const dataURLtoFile = (dataUrl: string, fileName: string): File => {
  const arr = dataUrl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) throw new Error("Invalid data URL");

  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};

/**
 * Validates whether an image URL is loadable.
 */
export const isValidImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

/**
 * Checks if a URL likely refers to an image.
 */
export function isImage(url?: string): boolean {
  return !!url?.includes("/image");
}

export const convertAcceptArrayToObject = (acceptArray?: string[]) => {
  if (!acceptArray) return undefined;
  return acceptArray.reduce((acc, type) => {
    acc[type] = [];
    return acc;
  }, {} as Record<string, string[]>);
};
