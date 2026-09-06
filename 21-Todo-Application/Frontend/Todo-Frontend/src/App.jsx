
import AppName from "./component/AppName";
import AddTodo from "./component/AddTodo";
import TodoItems from "./component/TodoItems";
import FilterTabs from "./component/FilterTabs";
import ThemeToggle from "./component/ThemeToggle";
import StatsDashboard from "./component/StatsDashboard";
import { useEffect, useReducer, useState } from "react";
import WelcomeMessage from "./component/WelcomeMessage";
import storeItemsContext from "./store/storeItemsContext";
import {
  addItemToServer,
  deleteItemFromServer,
  getItemFromServer,
  markItemCompleted,
} from "./services/ItemServices";

const todoItemsReduce = (currTodoItems, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return action.payload;
    case "NEW_ITEM":
      return [...currTodoItems, action.payload];
    case "DELETE_ITEM":
      return currTodoItems.filter((item) => item.id !== action.payload);
    case "TOGGLE_COMPLETE":
      return currTodoItems.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    case "REORDER_ITEMS":
      return action.payload;
    default:
      return currTodoItems;
  }
};

function App() {
  const [todoItems, dispatchTodoitems] = useReducer(todoItemsReduce, []);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getItemFromServer().then((initialItems) => {
      dispatchTodoitems({ type: "SET_ITEMS", payload: initialItems });
    });
  }, []);

  const addNewItem = async (itemName, itemDueDate) => {
    const serverItem = await addItemToServer(itemName, itemDueDate);
    dispatchTodoitems({ type: "NEW_ITEM", payload: serverItem });
  };

  const DeleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id);
    dispatchTodoitems({ type: "DELETE_ITEM", payload: deletedId });
  };

  const ToggleComplete = async (id) => {
    const updatedItem = await markItemCompleted(id);
    dispatchTodoitems({ type: "TOGGLE_COMPLETE", payload: updatedItem });
  };

  const reorderItems = (newOrder) => {
    dispatchTodoitems({ type: "REORDER_ITEMS", payload: newOrder });
  };

  return (
    <storeItemsContext.Provider
      value={{ todoItems, addNewItem, DeleteItem, ToggleComplete, filter, setFilter, reorderItems }}
    >
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-black dark:via-black dark:to-slate-900 relative transition-colors">
        <ThemeToggle />
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-b-2xl px-2 pb-4 pt-2 -mx-2">
            <AppName />
          </div>

          <div className="grid sm:grid-cols-[220px_1fr] gap-6 mt-4">
            <aside className="order-2 sm:order-1">
              <StatsDashboard />
              <div className="hidden sm:block mt-4">
                <FilterTabs />
              </div>
            </aside>

            <main className="order-1 sm:order-2 bg-white dark:bg-black border border-transparent dark:border-slate-800 rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none p-6 sm:p-8">
              <AddTodo />
              <div className="sm:hidden">
                <FilterTabs />
              </div>
              <WelcomeMessage />
              <TodoItems />
            </main>
          </div>
        </div>
      </div>
    </storeItemsContext.Provider>
  );
}

export default App;