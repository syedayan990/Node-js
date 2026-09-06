// export const addItemToServer = async (task, date) => {
//   const response = await fetch("http://localhost:3000/api/Todo", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ task, date }),
//   });
//   const data = await response.json();
//   return mapServerItemLocalItem(data);
// };

// export const getItemFromServer = async () => {
//   const response = await fetch("http://localhost:3000/api/Todo");
//   const items = await response.json();
//   return items.map(mapServerItemLocalItem);
// };

// export const markItemCompleted = async (id) => {
//   const response = await fetch(
//     `http://localhost:3000/api/Todo${id}/completed`,
//     {
//       method: "PUT",
//     },
//   );
//   const item = await response.json();
//   return mapServerItemLocalItem(item);
// };

// export const deleteItemFromServer = async (id) => {
//   await fetch(`http://localhost:3000/api/Todo${id}`, {
//     method: "DELETE",
//   });

//   return id;
// };

// const mapServerItemLocalItem = (serverItem) => {
//   return {
//     id: serverItem._id,
//     name: serverItem.task,
//     dueDate: serverItem.date,
//     createAt: serverItem.createAt,
//     updatedAt: serverItem.updatedAt,
//   };
// };


const BASE_URL = "http://localhost:3000/api/Todo";

export const addItemToServer = async (task, date) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, date }),
  });
  const data = await response.json();
  return mapServerItemLocalItem(data);
};

export const getItemFromServer = async () => {
  const response = await fetch(BASE_URL);
  const items = await response.json();
  return items.map(mapServerItemLocalItem);
};

export const markItemCompleted = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}/complete`, {
    method: "PUT",
  });
  const item = await response.json();
  return mapServerItemLocalItem(item);
};

export const deleteItemFromServer = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return id;
};

const mapServerItemLocalItem = (serverItem) => {
  return {
    id: serverItem._id,
    name: serverItem.task,
    dueDate: serverItem.date,
    completed: serverItem.completed,
    createAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
  };
};