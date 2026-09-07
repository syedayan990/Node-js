# 🚀 Node.js Learning Journey — Airbnb Clone (Full Stack Project)

A complete, hands-on **Node.js & Express.js** learning repository built around one central project: an **Airbnb-clone web application**, built from scratch and evolved step-by-step into a full backend system with **authentication, sessions, MongoDB (Mongoose), and file upload/download** — alongside all the core Node.js concepts practiced along the way.

This repo documents my step-by-step progress while learning backend web development with Node.js, with the **Airbnb Clone as the flagship project**.

---

## 🏡 Flagship Project: Airbnb Clone — Full Stack Project

The **Airbnb Clone** is the main project of this repository. It started as a simple Express server and was rebuilt multiple times, gaining a new real-world backend feature at every stage — ending in `20-Airbnb-Full-Stack-Project/`, a fully working listing platform with hosts, guests, bookings, favourites, authentication, and image uploads.

### 🔧 Backend Features Implemented

| Feature | Details |
|---|---|
| **REST-style Routing (Express Router)** | Routes are split into three dedicated routers — `userRouter` (guest-facing: home listing, home details, booking, favourites), `authRouter` (`/Login`, `/SignUp`, `/Logout`), and `HostRouter` (`/host/add-home`, `/host/host-home-list`, `/host/Edit-home/:homeId`, `/host/delete-home/:homeId`) — following REST-like resource conventions (GET to read, POST to create/update/delete) |
| **MVC Architecture** | Clean separation of `Models/`, `controllers/`, `routes/`, and `views/` |
| **Database — MongoDB + Mongoose** | Three Mongoose models: `Home` (listing details — name, price, location, rating, photo, description), `User` (firstName, lastName, email, password, userType: guest/host, favourites), and `Favourite` (linking users to saved homes). Includes a Mongoose `pre('findOneAndDelete')` hook to auto-clean favourites when a home is deleted |
| **Authentication & Authorization** | Full Login/Signup flow via `authController` with **bcryptjs** password hashing. Host-only routes (`/host/*`) are protected by custom middleware that checks `req.isLoggedIn` and redirects guests to `/Login` |
| **Sessions & Cookies** | Implemented with **express-session** + **connect-mongo**, storing sessions directly in MongoDB (`sessions_v2` collection) instead of memory, so login state persists across server restarts |
| **File Upload & Download** | Image uploads for home listings handled via **Multer** — custom disk storage engine (random filename generation to avoid collisions), a file filter that only allows `.png/.jpg/.jpeg`, and static file serving from `/uploads` so uploaded images can be viewed/downloaded from the browser |
| **Form Validation** | `express-validator` used to validate signup/add-home form inputs before they hit the database |
| **Templating** | Server-side rendered views using **EJS**, including `views/Host`, `views/auth`, `views/store`, and `views/partials` for reusable layout components |
| **Styling** | Tailwind CSS compiled via its CLI (`npm run tailwind`) alongside the Node server |

### 📍 Key Routes

```
GET  /                          → Home / landing page
GET  /homes                     → List all homes
GET  /homes/:homeId              → Home details (dynamic route)
GET  /booking                    → View bookings
GET  /favourite                  → View favourite homes
POST /favourite                  → Add a home to favourites
POST /favourite/delete/:homeId   → Remove a home from favourites

GET  /Login  | POST /Login       → Login page & authentication
GET  /SignUp | POST /SignUp      → Signup page & user registration
POST /Logout                     → Destroy session & log out

GET  /host/add-home               → Form to add a new listing (protected)
POST /host/add-home                → Create listing + upload photo (protected)
GET  /host/host-home-list          → Host's own listings (protected)
GET  /host/Edit-home/:homeId       → Edit listing form (protected)
POST /host/Edit-Host-Home          → Update listing (protected)
POST /host/delete-home/:homeId     → Delete listing (protected)
```

### 🧱 Evolution of the Airbnb Clone (Milestone History)

The final full-stack version wasn't built in one go — it evolved through these stages, each one preserved in this repo as a snapshot:

```
Express-Deepdive/Project-Airbnb        → First Express version (static/basic routing)
Express-Deepdive/Project-Airbnb-Tailwind → + Tailwind CSS styling
dynamic-UI/Project-Airbnb-EJS           → + EJS templating (dynamic views)
MVC/                                    → + MVC architecture refactor
13-Airbnb-Dynamic-Path-Model            → + Dynamic routes & path-based models
15-Airbnb-Using-SQL                     → + MySQL database integration
16-Airbnb-Using-MongoDBBB               → + MongoDB (native driver)
17-Airbnb-Mongoose                      → + Mongoose ODM
18-Airbnb-Cookies-And-Sessions          → + Cookies & Sessions
19-Airbnb-Authentication-And-Authorisation → + Login/Signup, bcrypt, Auth & Authorization
20-Airbnb-Full-Stack-Project            → ✅ FINAL: + File Upload/Download (Multer), fully complete app
```

---

## 📌 About This Repository

Besides the Airbnb Clone journey, this repo also contains the foundational Node.js concepts practiced before and alongside it, plus one extra side project (a Todo app). Each folder represents either:

- A **core Node.js concept** (event loop, servers, error handling, npm), or
- A **milestone version of the Airbnb-clone project** (see above), or
- A **standalone side project** (Todo App with React + Express + MongoDB)

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

> ℹ️ The full milestone-by-milestone breakdown of the Airbnb Clone (`13-Airbnb-Dynamic-Path-Model` → `20-Airbnb-Full-Stack-Project`) is covered in detail in the **[🏡 Flagship Project](#-flagship-project-airbnb-clone--full-stack-project)** section above.

### 🔹 Practice Sets
| Folder | What it covers |
|---|---|
| `Practice-set/Express-Practice/` | General Express.js practice exercises |
| `Practice-set/MiddleWaree/` | Practicing custom & third-party **middleware** |
| `Practice-set/Dynamic-UI-Airbnb/` | Practice round of dynamic UI rendering |
| `Practice-set/13-Project-Milestone-Airbnb/` | Practice milestone checkpoint of the Airbnb project |
| `Practice-set/Project-Milestone-Airbnb/` | Another milestone checkpoint |

### 🔹 Other Side Project
| Folder | What it covers |
|---|---|
| `21-Todo-Application/` | A small side-project full-stack Todo app (`Backend/`: Node.js, Express, MongoDB, Mongoose REST APIs · `Frontend/`: React + Vite + Tailwind CSS), built separately to practice the MERN stack |

---

## 🛠️ Tech Stack Used Across the Repo

- **Runtime:** Node.js
- **Framework:** Express.js (Express Router, REST-style routes, middleware)
- **Templating:** EJS
- **Databases:** MongoDB (native driver & **Mongoose ODM** — main stack for the Airbnb Clone), MySQL (used in an earlier milestone)
- **Auth & Security:** bcryptjs (password hashing), express-session, cookie-parser, connect-mongo (MongoDB-backed sessions)
- **File Handling:** Multer (image upload with disk storage, file-type filtering) + static file serving for download
- **Validation:** express-validator
- **Styling:** Tailwind CSS
- **Dev Tools:** nodemon, dotenv
- **Todo App only:** React, Vite, React Icons

---

## ▶️ How to Run the Airbnb Clone (Main Project)

```bash
cd 20-Airbnb-Full-Stack-Project

# 1. Install dependencies
npm install

# 2. Create a .env file with:
#    MONGO_URI=your_mongodb_connection_string
#    SESSION_SECRET=your_session_secret
#    PORT=3000

# 3. Start the server
npm start

# App runs at http://localhost:3000
```

Every other folder that contains a `package.json` is an independent Node.js project and can be run the same way (`npm install` → `npm start`).

For the **Todo Application** side project, run the backend and frontend separately:

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

This repository is a **learning log built around one flagship project** — the Airbnb Clone. It shows the real backend progression from:

```
Raw Node.js HTTP server → Express.js → EJS Templating → MVC Architecture
→ MySQL → MongoDB → Mongoose → Sessions & Cookies → Auth & Authorization
→ File Upload/Download (Multer) → ✅ Airbnb Clone: Full Stack Project
```

Explore `20-Airbnb-Full-Stack-Project/` first to see the complete, final app — then walk backwards through the milestone folders to see how each backend concept (routing, MVC, database, sessions, auth, file handling) was added one at a time.

---

## 📄 License

This project is for educational purposes.

