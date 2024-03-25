import { Form, FormLayout, Modal, TextField } from "@shopify/polaris";
import { useState } from "react";

export default function CreateModal({ open, onClose, create }) {
  const [title, setTitle] = useState("");
  const addSubmit = () => {
    const data = {
      title: title,
      isCompleted: false,
    };
    create(data);
    setTitle("");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Todo"
      primaryAction={{
        content: "Add",
        onAction: addSubmit,
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
        <Form onSubmit={addSubmit}>
          <FormLayout>
            <TextField
              value={title}
              onChange={(value) => setTitle(value)}
              label="Title"
              type="text"
            />
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
}
