import React, { useContext, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { TCategory } from "../components/AddTodoCategoryItem";
import useLocalStorage from "../hooks/useLocalStorageHook";

type TTodoContextProvider = {
  children: {};
};

type TContext = {
  categories: TCategory[];
  addCategory: (categories: TCategory) => void;
};

const TodoContext = createContext<TContext | any>({});

export const useTodoContext = () => {
  return useContext(TodoContext);
};

const TodoContextProvider: React.FC<TTodoContextProvider> = ({ children }) => {
  const [categories, setCategories] = useLocalStorage("categories", []);

  const addCategory = (category: TCategory) => {
    setCategories((prevCategories: TCategory[]) => {
      if (prevCategories.find((c) => c.name === category.name)) {
        return prevCategories;
      }
      return [...prevCategories, { ...category, id: uuidv4() }];
    });
  };
  return (
    <TodoContext.Provider
      value={{
        categories,
        addCategory,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
