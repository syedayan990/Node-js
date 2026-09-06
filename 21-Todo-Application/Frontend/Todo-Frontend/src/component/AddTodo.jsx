// import { useRef } from "react";
// import { useContext } from "react";
// import { MdOutlineLibraryAdd } from "react-icons/md";
// import storeItemsContext from "../store/storeItemsContext";

// function AddTodo() {
//   const { addNewItem } = useContext(storeItemsContext);
//   const TodoNameElement = useRef(0);
//   const dueDateElement = useRef(0);

// const handleOnButtonClicked = (event) => {  
//     event.preventDefault();
//     const TodoName = TodoNameElement.current.value;
//     const TodoDueDate = dueDateElement.current.value;
//     TodoNameElement.current.value = "";
//     dueDateElement.current.value = "";
//     addNewItem(TodoName, TodoDueDate);
//   };

//   return (
//     <div className="container text-center">
//       <form className="row kg-raw" onSubmit={handleOnButtonClicked}>
//         <div className="col-3">
//           <input
//             ref={TodoNameElement}
//             type="text"
//             placeholder="Enter ToDo here"
//           />
//         </div>
//         <div className="col-2">
//           <input ref={dueDateElement} type="Date" />
//         </div>
//         <div className="col-2">
//           <button type="text" className="btn btn-success kg-button">
//             <MdOutlineLibraryAdd />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
// export default AddTodo;
//==========================================
// import { useRef, useContext } from "react";
// import { MdOutlineLibraryAdd } from "react-icons/md";
// import storeItemsContext from "../store/storeItemsContext";

// function AddTodo() {
//   const { addNewItem } = useContext(storeItemsContext);
//   const TodoNameElement = useRef(null);
//   const dueDateElement = useRef(null);

//   const handleOnButtonClicked = (event) => {
//     event.preventDefault();
//     const TodoName = TodoNameElement.current.value.trim();
//     const TodoDueDate = dueDateElement.current.value;
//     if (!TodoName || !TodoDueDate) return;
//     TodoNameElement.current.value = "";
//     dueDateElement.current.value = "";
//     addNewItem(TodoName, TodoDueDate);
//   };

//   return (
//     <form onSubmit={handleOnButtonClicked} className="flex flex-col sm:flex-row gap-3 mb-6">
//       <input
//         ref={TodoNameElement}
//         type="text"
//         placeholder="Enter ToDo here"
//         className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white px-4 py-2.5 text-slate-700 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//       />
//       <input
//         ref={dueDateElement}
//         type="date"
//         className="rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//       />
//       <button
//         type="submit"
//         className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-white font-medium hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
//       >
//         <MdOutlineLibraryAdd size={20} />
//         <span>Add</span>
//       </button>
//     </form>
//   );
// }
// export default AddTodo;



//==================================
import { useRef, useContext } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import storeItemsContext from "../store/storeItemsContext";
import useSound from "../hooks/useSound";

function AddTodo() {
  const { addNewItem } = useContext(storeItemsContext);
  const { playAdd } = useSound();
  const TodoNameElement = useRef(null);
  const dueDateElement = useRef(null);

  const handleOnButtonClicked = (event) => {
    event.preventDefault();
    const TodoName = TodoNameElement.current.value.trim();
    const TodoDueDate = dueDateElement.current.value;
    if (!TodoName || !TodoDueDate) return;
    TodoNameElement.current.value = "";
    dueDateElement.current.value = "";
    addNewItem(TodoName, TodoDueDate);
    playAdd();
  };

  return (
    <form onSubmit={handleOnButtonClicked} className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="glow-border flex-1">
        <input
          ref={TodoNameElement}
          type="text"
          placeholder="Enter ToDo here"
          className="w-full rounded-lg dark:bg-slate-900 dark:text-white bg-white px-4 py-2.5 text-slate-700 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
        />
      </div>
      <div className="glow-border">
        <input
          ref={dueDateElement}
          type="date"
          className="rounded-lg dark:bg-slate-900 dark:text-white bg-white px-4 py-2.5 text-slate-700 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-white font-medium hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
      >
        <MdOutlineLibraryAdd size={20} />
        <span>Add</span>
      </button>
    </form>
  );
}
export default AddTodo;