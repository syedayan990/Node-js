import { createContext } from "react";

const storeItemsContext = createContext({
  todoItems: [],
  addNewItem: () => {},
  DeleteItem: () => {},
  ToggleComplete: () => {},
  filter: "all",
  setFilter: () => {},
  reorderItems: () => {},
});
export default storeItemsContext;