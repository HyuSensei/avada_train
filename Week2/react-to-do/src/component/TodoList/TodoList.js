import {
  Text,
  Button,
  ResourceList,
  ResourceItem,
  Badge,
  InlineStack,
} from "@shopify/polaris";
import { useEffect, useState } from "react";

const TodoList = ({
  listTodo,
  complete,
  updateSelected,
  onActiveConfirm,
  onActiveConfirmSelected,
  isLoading,
  isLoadingComplete,
  isLoadingDelete,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  // const [actionItems, setActionItems] = useState({});
  const [loadingItem, setLoadingItem] = useState(null);
  // const [loadingItems, setLoadingItems] = useState([]);
  const completeClick = (id) => {
    // setActionItems((prev) => ({ ...prev, [id]: "loading" }));
    setLoadingItem(id);
    const data = {
      id,
      isCompleted: true,
    };
    complete(data);
    // setLoadingItems((prev) => {
    //   return prev.filter((item) => item !== id);
    // });
    // setActionItems((prev) => {
    //   delete prev[id];
    //   return prev;
    // });
  };

  useEffect(() => {
    if (!loadingItem) {
      setSelectedItems([]);
    }
    setSelectedItems([]);
  }, [loadingItem]);

  const selectedComplete = () => {
    // setLoadingItems((prev) => [...prev, ...selectedItems]);
    // setActionItems((prev) => ({
    //   ...prev,
    //   ...selectedItems.reduce((acc, id) => ({ ...acc, [id]: "loading" }), {}),
    // }));
    const data = {
      selected: selectedItems.filter(
        (item) => !listTodo.find((todo) => todo.id === item).isCompleted
      ),
      isCompleted: true,
    };
    updateSelected(data);
    setSelectedItems([]);
    // setLoadingItems((prev) => {
    //   return prev.filter((item) => item !== selectedItems.includes(item));
    // });
    // setActionItems((prev) => {
    //   delete prev[id];
    //   return prev;
    // });
  };

  const selectedIncomplete = () => {
    // setLoadingItems(selectedItems);
    const data = {
      selected: selectedItems.filter(
        (item) => listTodo.find((todo) => todo.id === item).isCompleted
      ),
      isCompleted: false,
    };
    updateSelected(data);
    // console.log(loadingItems);
    setSelectedItems([]);
  };

  const deleteSelectedTodo = () => {
    onActiveConfirmSelected(selectedItems);
    setSelectedItems([]);
  };

  const deleteClick = (id) => {
    // setLoadingItems((prev) => [...prev, id]);
    setLoadingItem(id);
    onActiveConfirm(id);
  };

  const promotedBulkActions = [
    {
      content: "Complete",
      onAction: selectedComplete,
      disabled: selectedItems.every((id) => {
        const todo = listTodo.find((item) => item.id === id);
        return todo.isCompleted;
      }),
    },
    {
      content: "Incomplete",
      onAction: selectedIncomplete,
      disabled: selectedItems.every((id) => {
        const todo = listTodo.find((item) => item.id === id);
        return !todo.isCompleted;
      }),
    },
    {
      content: "Delete",
      onAction: deleteSelectedTodo,
    },
  ];

  return (
    <>
      <ResourceList
        resourceName={{
          singular: "todo",
          plural: "todos",
        }}
        promotedBulkActions={promotedBulkActions}
        items={listTodo}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        loading={isLoading}
        renderItem={(item) => {
          const { id, title, isCompleted } = item;
          // const isItemLoading = selectedItems.includes(id);
          const isItemLoading = loadingItem === id;
          return (
            <ResourceItem
              key={id}
              id={id}
              accessibilityLabel={`View details for ${title}`}
              name={title}
            >
              <InlineStack blockAlign="center" align="space-between">
                <Text variant="headingSm" as="h6">
                  {title}
                </Text>
                <InlineStack gap="400">
                  <Badge tone={isCompleted ? "success" : "attention"}>
                    {isCompleted ? "Complete" : "InComplete"}
                  </Badge>
                  <Button
                    disabled={isCompleted || isLoadingDelete}
                    onClick={() => completeClick(id)}
                    tone="success"
                    loading={isLoadingComplete ? isItemLoading : false}
                    // disabled={isItemLoading && actionItems[id] == "loading"}
                    // loading={isItemLoading && actionItems[id] === "loading"}
                  >
                    Complete
                  </Button>
                  <Button
                    onClick={() => deleteClick(id)}
                    tone="critical"
                    loading={isLoadingDelete ? isItemLoading : false}
                    disabled={isLoadingComplete ? isItemLoading : false}
                  >
                    Delete
                  </Button>
                </InlineStack>
              </InlineStack>
            </ResourceItem>
          );
        }}
      />
    </>
  );
};

export default TodoList;
