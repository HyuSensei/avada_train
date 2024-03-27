import React, { useEffect, useState } from "react";
import TodoList from "../component/TodoList";
import axios from "axios";
import CreateModal from "../component/Modal/CreateModal";
import { Page, Frame } from "@shopify/polaris";
import useFetch from "../hooks/fetchTodo";
import ConfirmModal from "../component/Modal/ConfirmModal";
import ConfirmSelected from "../component/Modal/ConfirmSelected";
import ToastComponent from "../component/Toast/ToastComponent";

export default function TodoPage() {
  const API_URL = `http://localhost:5000/api/todos`;
  const [active, setActive] = useState(false);
  const [activeConfirm, setActiveConfirm] = useState(false);
  const [activeConfirmSelected, setActiveConfirmSelected] = useState(false);
  const [idTodo, setIdTodo] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [message, setMessage] = useState("");
  const [activeToast, setActiveToast] = useState(false);
  const [erro, setError] = useState(false);

  const {
    data: listTodo,
    setData: setListTodo,
    isLoading,
    setIsLoading,
  } = useFetch(API_URL);

  const onActiveConfirm = (id) => {
    setIdTodo(id);
    setActiveConfirm(true);
  };

  const onCloseConfirm = () => {
    setActiveConfirm(false);
    setIdTodo(null);
  };

  const onActiveConfirmSelected = (listItems) => {
    setActiveConfirmSelected(true);
    setSelectedItems(listItems);
  };

  const onCloseConfirmSelected = () => {
    setActiveConfirmSelected(false);
    setSelectedItems([]);
  };

  const createTodo = async (data) => {
    try {
      if (!data.title) {
        setMessage("Please enter a title");
        setError(true);
        setActiveToast(true);
        return;
      }
      setIsLoading(true);
      const res = await axios.post(API_URL, data);
      if (res.data.success) {
        setListTodo((prev) => [res.data.todo, ...prev]);
        setActive(false);
        setIsLoading(false);
        setMessage(res.data.message);
        setError(false);
        setActiveToast(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const complete = async (data) => {
    try {
      setIsLoadingComplete(true);
      const api = await fetch(API_URL + `/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await api.json();
      if (res.success) {
        setListTodo((prev) => {
          return prev.map((item) =>
            item.id === data.id
              ? { ...item, isCompleted: data.isCompleted }
              : item
          );
        });
        setMessage(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingComplete(false);
      setError(false);
      setActiveToast(true);
    }
  };

  const destroy = async () => {
    try {
      setIsLoadingDelete(true);
      const api = await fetch(API_URL + `/${idTodo}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await api.json();
      if (res.success) {
        const todos = listTodo.filter((item) => item.id !== idTodo);
        setListTodo(todos);
        setMessage(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDelete(false);
      setError(false);
      setActiveToast(true);
    }
  };

  const updateSelected = async (data) => {
    try {
      setIsLoading(true);
      const api = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await api.json();
      if (res.success) {
        const updateTodos = listTodo.map((item) => {
          if (data.selected.includes(item.id)) {
            return {
              ...item,
              isCompleted: data.isCompleted,
            };
          }
          return item;
        });
        setListTodo(updateTodos);
        setMessage(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setError(false);
      setActiveToast(true);
    }
  };

  const deleteSelected = async () => {
    try {
      setIsLoading(true);
      const api = await fetch(API_URL + "/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selected: selectedItems,
        }),
      });
      const res = await api.json();
      if (res.success) {
        const newTodo = listTodo.filter(
          (todo) => !selectedItems.includes(todo.id)
        );
        setListTodo(newTodo);
        setMessage(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setError(false);
      setActiveToast(true);
    }
  };

  return (
    <Frame>
      <Page
        title="Todoes"
        primaryAction={{
          content: "Create",
          onAction: () => setActive(true),
        }}
      >
        <TodoList
          listTodo={listTodo}
          isLoading={isLoading}
          complete={complete}
          updateSelected={updateSelected}
          deleteSelected={deleteSelected}
          onActiveConfirm={onActiveConfirm}
          onActiveConfirmSelected={onActiveConfirmSelected}
          isLoadingComplete={isLoadingComplete}
          isLoadingDelete={isLoadingDelete}
        />
        <CreateModal open={active} onSubmit={createTodo} onClose={setActive} />
        <ConfirmModal
          id={idTodo}
          open={activeConfirm}
          onClose={onCloseConfirm}
          destroy={destroy}
        />
        <ConfirmSelected
          open={activeConfirmSelected}
          onClose={onCloseConfirmSelected}
          destroy={deleteSelected}
        />
        <ToastComponent
          active={activeToast}
          message={message}
          setActive={setActiveToast}
          erro={erro}
        />
      </Page>
    </Frame>
  );
}
