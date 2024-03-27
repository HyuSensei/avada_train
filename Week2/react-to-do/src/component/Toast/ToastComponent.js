import React from "react";
import { Toast } from "@shopify/polaris";
import { NotificationIcon } from "@shopify/polaris-icons";

export default function ToastComponent({ active, message, setActive, erro }) {
  const toastMarkup = active ? (
    erro ? (
      <Toast content={message} error onDismiss={() => setActive(false)} />
    ) : (
      <Toast
        icon={NotificationIcon}
        content={message}
        onDismiss={() => setActive(false)}
      />
    )
  ) : null;
  return toastMarkup;
}
