import React from "react";
import { Toast } from "@shopify/polaris";
import { NotificationIcon } from "@shopify/polaris-icons";

export default function ToastSuccess({ active, message, setToastSuccess }) {
  const toastMarkup = active ? (
    <Toast
      icon={NotificationIcon}
      content={message}
      onDismiss={() => setToastSuccess(false)}
    />
  ) : null;
  return toastMarkup;
}
