import React from "react";
import { Snackbar, SnackbarProps } from "@mui/material";
import { styled } from "@mui/system";

const CustomSnackbar = styled(Snackbar)(() => ({
  "& .MuiSnackbarContent-root": {
    textAlign: "center !important",
    alignItems: "center",
    margin: "0 auto",
    boxSizing: "border-box",
    backgroundColor: "#FBCDCB",
    color: "black",
    width: "100px !important",
    fontWeight: "bold",
  },
}));

interface ToastProps extends SnackbarProps {}

const Toast: React.FC<ToastProps> = (props) => {
  return <CustomSnackbar {...props} />;
};

export default Toast;
