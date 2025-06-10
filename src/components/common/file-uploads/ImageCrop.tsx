// React
import { useEffect, useState } from "react";

//mui
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";

//components
import useImageCropper from "@/hooks/useImageCropper";
import DialogCloseButton from "../buttons/DialogCloseButton";

const ImageCrop = ({ toggle, modal, imageData, onFileSave, aspectRatio }) => {
  //state
  const [disableBtn, setDisableBtn] = useState(true);

  //Custom hook for image cropping
  const { onSelectFile, croppedImageData, getCropperContent, clearAllData } =
    useImageCropper({
      aspectRatio: aspectRatio || 16 / 9,
    });

  //close modal
  const closeModal = () => {
    toggle();
    clearAllData();
  };

  //handle image data
  useEffect(() => {
    if (imageData) {
      onSelectFile(imageData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData]);

  //handle save button
  const onSaveImageHandler = () => {
    // onFileSave
    if (croppedImageData) {
      onFileSave({ acceptedFiles: [croppedImageData], isCropped: true });
    }

    closeModal();
  };

  //modal open on image load
  useEffect(() => {
    if (modal) {
      setTimeout(() => {
        setDisableBtn(false);
      }, 1000);
    } else {
      setDisableBtn(true);
    }
  }, [modal]);

  return (
    <Box>
      <Dialog
        open={modal}
        fullWidth
        maxWidth="md"
        onClose={toggle}
        sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      >
        <DialogContent>
          <DialogCloseButton onClick={toggle} disableRipple>
            <i className="tabler-x" />
          </DialogCloseButton>
          <div className="pb-0  ">{getCropperContent()}</div>
        </DialogContent>
        <DialogActions sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            type="reset"
            onClick={() => closeModal()}
            className="space mw150"
          >
            Discard
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={onSaveImageHandler}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageCrop;
