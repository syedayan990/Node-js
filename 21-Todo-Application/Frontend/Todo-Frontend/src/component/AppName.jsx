// import styles from "./AppName.module.css";
// function AppName() {
//   return <h1 className={styles.todoheading}>TODO APP</h1>;
// }
// export default AppName;
import TypewriterText from "./TypewriterText";

function AppName() {
  return (
    <h1 className="text-3xl sm:text-4xl font-bold text-center text-slate-800 dark:text-white mb-6 tracking-tight">
      📝{" "}
      <TypewriterText
        text="Todo App"
        className="text-indigo-600 dark:text-indigo-400"
      />
    </h1>
  );
}
export default AppName;