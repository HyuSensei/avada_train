import React from 'react';
import {Toast} from '@shopify/polaris';
import {NotificationIcon} from '@shopify/polaris-icons';
import {Icon} from '@shopify/polaris';

export default function ToastComponent({active, message, erro, setActive}) {
  const toastMarkup = active ? (
    erro ? (
      <Toast icon={{NotificationIcon}} content={message} onDismiss={() => setActive(false)} />
    ) : (
      <Toast content={message} erro onDismiss={() => setActive(false)} />
    )
  ) : null;
  return toastMarkup;
}
