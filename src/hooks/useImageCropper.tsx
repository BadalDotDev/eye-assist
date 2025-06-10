import { useRef, useState, useCallback } from "react";

import { useMediaQuery } from "@mui/material";

import { AspectRatio, Cropper } from "react-advanced-cropper";
import { debounce } from "lodash";

import "react-advanced-cropper/dist/style.css";
import { getCroppedImgNew } from "@/utils/image";

interface Props {
  aspectRatio?: number;
}

const useImageCropper = ({ aspectRatio = 1 / 1 }: Props) => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [croppedImageData, setCroppedImageData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const cropperRef = useRef();
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const onSelectFile = (e) => {
    if (e && e.length > 0) {
      const file = e[0];

      setImageName(file.name.split(".")[0] || "Cropped_img");
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const toggleModal = ({ isOpen = !modalOpen }) => {
    setModalOpen(isOpen);

    if (isOpen) {
      setImage(null);
      setCroppedImageData(null);
    }
  };

  const onClearAll = () => {
    setImage(null);
    setCroppedImageData(null);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChange = useCallback(
    debounce(async (cropper) => {
      if (cropper.getCanvas()) {
        const croppedImage = await getCroppedImgNew(
          cropper.getCanvas(),
          imageName,
        );

        setCroppedImageData(croppedImage);
      }
    }, 200), // Debouncing by 200ms or adjust as needed
    [imageName],
  );

  const onReady = async (cropper) => {
    setTimeout(async () => {
      if (cropper.getCanvas()) {
        const croppedImage = await getCroppedImgNew(
          cropper.getCanvas(),
          imageName,
        );

        setCroppedImageData(croppedImage);
      }
    }, 500);
  };

  const getCropperContent = () => {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "80vw",
          height: "100%",
          aspectRatio: isMediumScreen ? "auto" : "2/1.2",
          objectFit: "contain",
        }}
      >
        <Cropper
          src={image}
          onChange={onChange}
          onReady={onReady}
          className={"cropper"}
          aspectRatio={aspectRatio as unknown as AspectRatio}
          ref={cropperRef}
        />
      </div>
    );
  };

  return {
    croppedImageData,
    onSelectFile,
    toggleModal,
    getCropperContent,
    clearAllData: onClearAll,
  };
};

export default useImageCropper;
