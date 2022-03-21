import React, { useContext, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { TCategory } from "../components/AddTodoCategoryItem";
import { TTask } from "../components/ViewTasksModal";
import useLocalStorage from "../hooks/useLocalStorageHook";

type TTodoContextProvider = {
  children: {};
};

type TContext = {
  categories: TCategory[];
  addCategory: (categories: TCategory) => void;
  deleteCategory: (categories: TCategory) => void;
  tasks: TTask[];
  addTask: (tasks: TTask) => void;
  deleteTask: (tasks: TTask) => void;
};

const TodoContext = createContext<TContext | any>({});

export const useTodoContext = () => {
  return useContext(TodoContext);
};

const TodoContextProvider: React.FC<TTodoContextProvider> = ({ children }) => {
  const [categories, setCategories] = useLocalStorage("categories", []);
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const getTasksByCategoryId = (categoryId: string) => {
    return tasks.filter((task: TTask) => task.categoryId === categoryId);
  };

  const addCategory = (category: TCategory) => {
    setCategories((prevCategories: TCategory[]) => {
      if (prevCategories.find((c) => c.name === category.name)) {
        return prevCategories;
      }
      return [...prevCategories, { ...category, id: uuidv4() }];
    });
  };
  const deleteCategory = (id: string) => {
    setTasks((prevTasks: TTask[]) => {
      return prevTasks.filter((task) => {
        if (task.categoryId !== id) {
          return true;
        } else {
          return false;
        }
      });
    });
    setCategories((prevCategories: TCategory[]) => {
      return prevCategories.filter((category) => {
        return category.id !== id;
      });
    });
  };
  const addTask = (task: TTask) => {
    setTasks((prevTasks: TTask[]) => {
      return [...prevTasks, { ...task, id: uuidv4() }];
    });
  };
  const deleteTask = (id: string) => {
    setTasks((prevTasks: TTask[]) => {
      return prevTasks.filter((task) => {
        return task.id !== id;
      });
    });
  };

  return (
    <TodoContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
        tasks,
        addTask,
        deleteTask,
        getTasksByCategoryId,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
