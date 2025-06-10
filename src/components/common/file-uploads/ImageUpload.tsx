//react
import { useCallback, useState, useEffect } from "react";

//next
import Image from "next/image";

//mui
import {
  Box,
  Typography,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//third party
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

//custom import
import ImageCrop from "./ImageCrop";
import { ASPECT_RATIO, MAX_COVER_IMAGE_SIZE } from "@/constants/images";
import { errorMessages } from "@/constants/messages/error";
import { convertAcceptArrayToObject } from "@/utils/image";
import {
  CurrentImageType,
  UploadedFileType,
} from "@/services/file-upload/type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  selectCurrentImage,
  selectUploadedFile,
} from "@/redux/slices/file-upload/selectors";
import {
  setCurrentImage,
  setUploadedFile,
} from "@/redux/slices/file-upload/singleFileUploadSlice";

interface ImageUploadProps {
  accept?: string[];
  maxSize?: number;
  showPreview?: boolean;
  showCropper?: boolean;
  aspectRatio?: number;
  disabled?: boolean;
  error?: boolean;
  previewClassName?: string;
  containerClassName?: string;
  placeholder?: string;
  messages?: {
    imageTypeValidation?: string;
    maxPostImageSize?: string;
  };
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  accept,
  maxSize = MAX_COVER_IMAGE_SIZE,
  showPreview = true,
  showCropper = true,
  aspectRatio = ASPECT_RATIO.DEFAUT,
  disabled = false,
  error = false,
  previewClassName = "",
  containerClassName = "",
  placeholder = "Drag & drop a file here, or click to select a file",
  messages = {
    imageTypeValidation: errorMessages.image.imageTypeValidation,
    maxPostImageSize: errorMessages.image.maxPostImageSize,
  },
  ...rest
}) => {
  const dispatch = useAppDispatch();
  const currentImage = useAppSelector(selectCurrentImage);
  const uploadedFile = useAppSelector(selectUploadedFile);

  //states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File[] | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for cropping

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (uploadedFile && uploadedFile.preview) {
        URL.revokeObjectURL(uploadedFile.preview);
      }
    };
  }, [uploadedFile]);

  //check validations
  const validateFile = useCallback(
    (file: File) => {
      if (accept && !accept.includes(file.type)) {
        return messages?.imageTypeValidation;
      }

      if (file.size > maxSize) {
        return messages?.maxPostImageSize;
      }

      return null; // No error
    },
    [accept, maxSize, messages],
  );

  //handle file
  const handleFileProcessing = useCallback((file: File) => {
    const preview = URL.createObjectURL(file);

    return { file, preview };
  }, []);

  //handle file drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const error = validateFile(file);

      if (error) {
        toast.error(error); // Centralized error handling

        return;
      }

      if (showCropper) {
        setSelectedImage(acceptedFiles);
        setCropModalOpen(true);
      } else {
        dispatch(
          setUploadedFile({
            newFileUploaded: handleFileProcessing(file),
          }),
        );
      }
    },
    [validateFile, handleFileProcessing, setUploadedFile, showCropper],
  );

  //dropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: convertAcceptArrayToObject(accept),
    maxFiles: 1,
    multiple: false,
    disabled: disabled,
  });

  //handle remove file
  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(
      setCurrentImage({
        newImage: null,
      }),
    );
    dispatch(
      setUploadedFile({
        newFileUploaded: null,
      }),
    );
  };

  //handle file save
  const handleFileSave = useCallback(
    ({ acceptedFiles }: { acceptedFiles: File[] }) => {
      const file = acceptedFiles[0];

      dispatch(
        setUploadedFile({
          newFileUploaded: handleFileProcessing(file),
        }),
      );
      setCropModalOpen(false);
    },
    [handleFileProcessing, setUploadedFile],
  );

  //open crop modal
  const toggleCropModal = useCallback(() => {
    setCropModalOpen((prev) => !prev);
  }, []);

  return (
    <Box
      sx={{
        border: 1,
        borderColor: error ? "error.main" : "grey.400",
        borderRadius: 2,
        borderStyle: "dashed",
        textAlign: "center",
        bgcolor: disabled ? "action.disabledBackground" : "transparent",
      }}
    >
      <Box
        {...getRootProps()}
        sx={{
          cursor: disabled ? "default" : "pointer",
          display: "flex",
          justifyContent: "center",
          p: 1,
        }}
      >
        <input {...getInputProps()} />
        {showPreview && (uploadedFile || currentImage) ? (
          <Box
            sx={{
              position: "relative",
              m: 3,
              flex: 1,
              display: "flex",
            }}
          >
            <Image
              src={currentImage || uploadedFile?.preview || ""}
              width={300}
              height={200}
              alt="Uploaded file preview"
              style={{
                objectFit: "cover",
                aspectRatio: "16 / 9",
                width: "100%",
                height: "auto",
                borderRadius: 8,
              }}
              className={previewClassName}
              placeholder="empty"
              priority={false}
            />
            <IconButton
              aria-label="Remove"
              onClick={handleRemoveImage}
              sx={{
                position: "absolute",
                right: -10,
                top: -10,
                bgcolor: "background.paper",
                "&:hover": {
                  bgcolor: "grey.300",
                },
                p: 0.5,
                boxShadow: 1,
              }}
            >
              <Tooltip title="Remove">
                <CloseIcon fontSize="small" />
              </Tooltip>
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              minHeight: 192,
              height: "100%",
              p: 1,
              m: "auto",
              display: "flex",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              color: "text.secondary",
            }}
            className={containerClassName}
          >
            <Box
              component="span"
              sx={{
                fontSize: 36,
              }}
            >
              <i className="tabler-photo" />
            </Box>
            {isDragActive ? (
              <Typography color="text.secondary">
                Drop the file here...
              </Typography>
            ) : (
              <Typography color="text.secondary">{placeholder}</Typography>
            )}
          </Box>
        )}
      </Box>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Image Crop Modal */}
      {selectedImage && (
        <ImageCrop
          toggle={toggleCropModal}
          modal={cropModalOpen}
          imageData={selectedImage}
          onFileSave={handleFileSave}
          aspectRatio={aspectRatio}
        />
      )}
    </Box>
  );
};

export default ImageUpload;
