import { Dialog } from "@mui/material";
import React, { ReactNode } from "react";

export interface SimpleDialogProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}
export const SimpleDialog = (props: SimpleDialogProps) => {
  const { onClose, open, children } = props;
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      {children}
    </Dialog>
  );
};
