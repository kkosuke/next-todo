import { Dialog } from "@mui/material";
import React, { ReactNode } from "react";

export interface SimpleDialogProps {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
}
export const SimpleDialog = (props: SimpleDialogProps) => {
  let { onClose = () => {}, open, children } = props;
  const handleClose = () => {
    open = !open;
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      {children}
    </Dialog>
  );
};
