import React, { useEffect, useState } from "react";
import TodoList from "../component/TodoList";
import axios from "axios";
import CreateModal from "../component/Modal/CreateModal";
import { Page, Frame } from "@shopify/polaris";
import useFetch from "../hooks/fetchTodo";
import ConfirmModal from "../component/Modal/ConfirmModal";
import ConfirmSelected from "../component/Modal/ConfirmSelected";
import ToastError from "../component/Toast/ToastError";
import ToastSuccess from "../component/Toast/ToastSuccess";

export default function TodoPage() {
  const API_URL = `http://localhost:5000/api/todos`;
  const [active, setActive] = useState(false);
  const [activeConfirm, setActiveConfirm] = useState(false);
  const [activeConfirmSelected, setActiveConfirmSelected] = useState(false);
  const [idTodo, setIdTodo] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const {
    data: listTodo,
    setData: setListTodo,
    isLoading,
    setIsLoading,
  } = useFetch(API_URL);

  const onActive = () => {
    setActive(true);
  };

  const onClose = () => {
    setActive(false);
  };

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

  // useEffect(() => {
  //   console.log("isLoadingUpdate:", isLoadingComplete);
  // }, [isLoadingComplete]);

  const create = async (data) => {
    try {
      setIsLoading(true);
      if (!data.title) {
        setMessage("Please enter a title");
        setToastError(true);
        setIsLoading(false);
        return;
      }
      const res = await axios.post(API_URL, data);
      if (res.data.success) {
        onClose();
        setListTodo((prev) => [res.data.todo, ...prev]);
        setIsLoading(false);
        setMessage(res.data.message);
        setToastSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const complete = async (data) => {
    try {
      setIsLoadingComplete(true);
      const res = await axios.put(API_URL + `/${data.id}`, data);
      if (res.data.success) {
        setListTodo((prev) => {
          return prev.map((item) =>
            item.id === data.id
              ? { ...item, isCompleted: data.isCompleted }
              : item
          );
        });
        setIsLoadingComplete(false);
        setMessage(res.data.message);
        setToastSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const destroy = async () => {
    try {
      setIsLoadingDelete(true);
      const res = await axios.delete(API_URL + `/${idTodo}`);
      if (res.data.success) {
        const todos = listTodo.filter((item) => item.id !== idTodo);
        setTimeout(() => {
          setListTodo(todos);
          setIsLoadingDelete(false);
          setMessage(res.data.message);
          setToastSuccess(true);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSelected = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.put(API_URL, data);
      if (res.data.success) {
        const updateTodos = listTodo.map((item) => {
          if (data.selected.includes(item.id)) {
            return {
              ...item,
              isCompleted: data.isCompleted,
            };
          }
          return item;
        });
        setTimeout(() => {
          setListTodo(updateTodos);
          setIsLoading(false);
          setMessage(res.data.message);
          setToastSuccess(true);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSelected = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(API_URL + "/delete", {
        selected: selectedItems,
      });
      if (res.data.success === true) {
        const newTodo = listTodo.filter(
          (todo) => !selectedItems.includes(todo.id)
        );
        setTimeout(() => {
          setListTodo(newTodo);
          setIsLoading(false);
          setMessage(res.data.message);
          setToastSuccess(true);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Frame>
        <Page
          title="Todoes"
          primaryAction={{
            content: "Create",
            onAction: onActive,
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
          <CreateModal open={active} create={create} onClose={onClose} />
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
          <ToastError
            active={toastError}
            message={message}
            setToastError={setToastError}
          />
          <ToastSuccess
            active={toastSuccess}
            message={message}
            setToastSuccess={setToastSuccess}
          />
        </Page>
      </Frame>
    </>
  );
}
