import { Modal, Text } from "@shopify/polaris";

export default function ConfirmSelected({ open, onClose, destroy }) {
  const destroySelected = () => {
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
        onAction: destroySelected,
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
          Confirm Delete Todo Selected !
        </Text>
      </Modal.Section>
    </Modal>
  );
}
