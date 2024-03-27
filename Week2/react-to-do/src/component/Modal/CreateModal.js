import { Form, FormLayout, Modal, TextField } from "@shopify/polaris";
import { useState } from "react";

export default function CreateModal({ open, onClose, onSubmit }) {
  const [input, setInput] = useState({
    title: "",
    isCompleted: false,
  });

  const saveClick = () => {
    onSubmit(input);
    setInput((prev) => ({
      ...prev,
      title: "",
    }));
  };

  const handleChangeInput = (key, value) => {
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={() => onClose(false)}
      title="Create Todo"
      primaryAction={{
        content: "Add",
        onAction: saveClick,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: () => onClose(false),
        },
      ]}
      size="small"
    >
      <Modal.Section>
        <Form onSubmit={saveClick}>
          <FormLayout>
            <TextField
              value={input.title}
              onChange={(value) => handleChangeInput("title", value)}
              label="Title"
              type="text"
            />
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
}
