import config from "../config";
import { Todo } from "../types";

export const Get = (key: string = config.dbName): Todo[] => {
  const value = localStorage.getItem(key);
  let data: Todo[] = [];

  if (value) {
    data = JSON.parse(value);
  }

  return data;
};

export const Add = (data: Todo, key: string = config.dbName): void => {
  const prevData = Get(key);
  let newData: Todo[] = [];
  if (Array.isArray(prevData)) {
    newData = [...prevData, data];
  } else {
    newData = [data];
  }

  const value = JSON.stringify(newData);

  localStorage.setItem(key, value);
};

export const Update = (todo: Todo, key: string = config.dbName): void => {
  const prevData = Get(key);

  const updateData = prevData.map((prevTodo) => {
    if (prevTodo.id === todo.id) {
      return { ...prevTodo, ...todo };
    }
    return prevTodo;
  });
  const value = JSON.stringify(updateData);

  localStorage.setItem(key, value);
};
export const Remove = (id: string, key: string = config.dbName): void => {
  const prevData = Get(key);

  const updateData = prevData.filter((todo) => todo.id !== id);
  const value = JSON.stringify(updateData);

  localStorage.setItem(key, value);
};
