import { Modal, Text } from "@shopify/polaris";

export default function ConfirmModal({ open, onClose, destroy }) {
  const deleteConfirm = () => {
    destroy();
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Notification"
      primaryAction={{
        content: "Confirm",
        onAction: deleteConfirm,
        tone: "critical",
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onClose,
        },
      ]}
      size="small"
    >
      <Modal.Section>
        <Text variant="headingMd" as="h6" alignment="center">
          Confirm Delete Todo !
        </Text>
      </Modal.Section>
    </Modal>
  );
}
