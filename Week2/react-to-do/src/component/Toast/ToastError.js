import React from "react";
import { Toast } from "@shopify/polaris";

export default function ToastError({ active, message, setToastError }) {
  const toastMarkup = active ? (
    <Toast content={message} error onDismiss={() => setToastError(false)} />
  ) : null;
  return toastMarkup;
}
