// import { useContext } from "react";
// import storeItemsContext from "../store/storeItemsContext";
// import TodoItem from "./TodoItem";
// import styles from "./TodoItems.module.css";
// const TodoItems = () => {
//   const { todoItems } = useContext(storeItemsContext);
//   return (
//     <div className={styles.todoContainer}>
//       {todoItems.map((item) => (
//         <TodoItem
//           key={item.id}
//           id={item.id}
//           TodoDate={item.dueDate}
//           TodoName={item.name}
//         ></TodoItem>
//       ))}
//     </div>
//   );
// };
// export default TodoItems;
import { useContext, useState } from "react";
import storeItemsContext from "../store/storeItemsContext";
import TodoItem from "./TodoItem";

const TodoItems = () => {
  const { todoItems, filter, reorderItems } = useContext(storeItemsContext);
  const [draggedId, setDraggedId] = useState(null);

  const filteredItems = todoItems.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });

  const canReorder = filter === "all";

  const handleDragStart = (id) => setDraggedId(id);

  const handleDragOver = (e, overId) => {
    e.preventDefault();
    if (!canReorder || draggedId === null || draggedId === overId) return;
    const draggedIndex = todoItems.findIndex((i) => i.id === draggedId);
    const overIndex = todoItems.findIndex((i) => i.id === overId);
    if (draggedIndex === -1 || overIndex === -1) return;
    const updated = [...todoItems];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(overIndex, 0, moved);
    reorderItems(updated);
  };

  const handleDragEnd = () => setDraggedId(null);

  return (
    <div className="flex flex-col gap-3">
      {filteredItems.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          TodoDate={item.dueDate}
          TodoName={item.name}
          Completed={item.completed}
          draggable={canReorder}
          onDragStartItem={() => handleDragStart(item.id)}
          onDragOverItem={(e) => handleDragOver(e, item.id)}
          onDragEndItem={handleDragEnd}
          isDragging={draggedId === item.id}
        />
      ))}
    </div>
  );
};
export default TodoItems;