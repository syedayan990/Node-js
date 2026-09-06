// import { useContext } from "react";
// import storeItemsContext from "../store/storeItemsContext";
// import styles from "./WelcomeMessage.module.css";
// const WelcomeMessage=()=>{

//      const {todoItems} = useContext(storeItemsContext);
    

//     return  todoItems.length === 0 && <p className={`${styles.Welcome} fst-italic text-decoration-underline`}>ENTER ANY NAME AND DATE TO PRINT VALUE </p>
// }
// export default WelcomeMessage;
import { useContext } from "react";
import storeItemsContext from "../store/storeItemsContext";
import TypewriterText from "./TypewriterText";

const WelcomeMessage = () => {
  const { todoItems } = useContext(storeItemsContext);
  if (todoItems.length !== 0) return null;
  return (
    <p className="text-center italic text-slate-400 dark:text-slate-500 py-8 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg mb-2">
      <TypewriterText text="Enter a task name and date to get started ✨" />
    </p>
  );
};
export default WelcomeMessage;