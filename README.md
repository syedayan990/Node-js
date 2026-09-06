# 🚀 Node.js Learning Journey

A complete, hands-on **Node.js & Express.js** learning repository — starting from the absolute basics of Node.js (HTTP servers, event loop, modules) all the way up to building a full **Airbnb-clone web app** (in multiple database flavors) and a full-stack **MERN Todo Application**.

This repo documents my step-by-step progress while learning backend web development with Node.js.

---

## 📌 About This Repository

This repository is a chronological collection of everything I practiced while learning Node.js — small scripts, concept demos, and progressively bigger projects. Each folder represents either:

- A **core Node.js concept** (event loop, servers, error handling, npm), or
- A **milestone version of an Airbnb-clone project**, rebuilt again and again while learning a new concept (dynamic routing → SQL → MongoDB → Mongoose → sessions → auth → file uploads), or
- A **standalone full-stack project** (Todo App with React + Express + MongoDB)

---

## 🗂️ Folder Structure & What Each One Covers

### 🔹 Core Node.js Concepts
| Folder | What it covers |
|---|---|
| `first-Node.js` | The very first Node.js script — `console.log`, `fs` module basics |
| `First-Node-Server/` | Creating a raw HTTP server with Node's built-in `http` module — handling requests, responses, routing, parsing request bodies, and streaming data in chunks |
| `Event-Loop-Async-Code/` | Understanding the Node.js Event Loop, blocking vs non-blocking (asynchronous) code |
| `Error-and-Debugging/` | Error handling and debugging techniques in Node.js |
| `Calculator-Node/` | A simple calculator app used to practice modular code (`App.js`, `Sum.js`, `handler.js`) |
| `npm-and-Tools/` | Practicing npm, package.json, and Node dev tools like `nodemon` |

### 🔹 Express.js Deep Dive
| Folder | What it covers |
|---|---|
| `Express-installation/` | Setting up a basic Express.js server |
| `Express-Deepdive/Express-Router/` | Using Express Router to organize routes |
| `Express-Deepdive/Parsing-Request/` | Parsing request data (query params, body, etc.) |
| `Express-Deepdive/Project-Airbnb/` | First version of the Airbnb-clone project built with Express |
| `Express-Deepdive/Project-Airbnb-Tailwind/` | Same project, styled using Tailwind CSS |

### 🔹 Dynamic UI & Templating
| Folder | What it covers |
|---|---|
| `dynamic-UI/Project-Airbnb-EJS/` | Rendering dynamic HTML pages using the EJS templating engine |

### 🔹 MVC Architecture
| Folder | What it covers |
|---|---|
| `MVC/` | Restructuring the Airbnb project using the **Model-View-Controller (MVC)** pattern for clean, scalable code |

### 🔹 Airbnb Clone — Milestone Versions
The same Airbnb-style listing project was rebuilt multiple times, each time adding a new backend concept:

| Folder | New Concept Added |
|---|---|
| `13-Airbnb-Dynamic-Path-Model/` | Dynamic routes & path-based models |
| `15-Airbnb-Using-SQL/` | Connecting the app to a **MySQL** database |
| `16-Airbnb-Using-MongoDBBB/` | Switching the database to **MongoDB** (native driver) |
| `17-Airbnb-Mongoose/` | Using **Mongoose** as an ODM for MongoDB |
| `18-Airbnb-Cookies-And-Sessions/` | Implementing **cookies & sessions** |
| `19-Airbnb-Authentication-And-Authorisation/` | Adding **login/signup, password hashing (bcrypt), auth & authorization** |
| `20-Airbnb-File-Upload-And-Download/` | Handling **file uploads/downloads** with Multer |

### 🔹 Practice Sets
| Folder | What it covers |
|---|---|
| `Practice-set/Express-Practice/` | General Express.js practice exercises |
| `Practice-set/MiddleWaree/` | Practicing custom & third-party **middleware** |
| `Practice-set/Dynamic-UI-Airbnb/` | Practice round of dynamic UI rendering |
| `Practice-set/13-Project-Milestone-Airbnb/` | Practice milestone checkpoint of the Airbnb project |
| `Practice-set/Project-Milestone-Airbnb/` | Another milestone checkpoint |

### 🔹 Full-Stack Project
| Folder | What it covers |
|---|---|
| `21-Todo-Application/` | A complete **full-stack Todo application** with a separate `Backend/` (Node.js, Express, MongoDB, Mongoose, REST APIs) and `Frontend/` (React + Vite + Tailwind CSS) |

---

## 🛠️ Tech Stack Used Across the Repo

- **Runtime:** Node.js
- **Framework:** Express.js
- **Templating:** EJS
- **Databases:** MySQL, MongoDB (native driver & Mongoose)
- **Auth & Security:** bcryptjs, express-session, cookie-parser, connect-mongo
- **File Handling:** Multer
- **Validation:** express-validator
- **Styling:** Tailwind CSS
- **Frontend (Todo App):** React, Vite, React Icons
- **Dev Tools:** nodemon, dotenv

---

## ▶️ How to Run Any Project

Each folder (that contains a `package.json`) is an independent Node.js project. To run one:

```bash
# 1. Move into the project folder
cd folder-name

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

For the **Todo Application**, run the backend and frontend separately:

```bash
# Backend
cd 21-Todo-Application/Backend/Todo-Backend
npm install
npm start

# Frontend
cd 21-Todo-Application/Frontend/Todo-Frontend
npm install
npm run dev
```

> ⚠️ Some projects require a `.env` file (for database URIs, session secrets, etc.). Create one in the project root before running, based on the environment variables used in the code.

---

## 🎯 Purpose of This Repository

This repository is not a single production app — it's a **learning log**. It shows the progression from:

```
Raw Node.js HTTP server → Express.js → Templating (EJS) → MVC Architecture 
→ Databases (SQL & MongoDB) → Sessions & Auth → File Uploads → Full-Stack MERN App
```

Feel free to explore any folder to see how a particular concept was implemented!

---

## 📄 License

This project is for educational purposes.
