# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# iTask – Full-Stack To-Do List Application (Frontend Ready)

A simple yet powerful task management app built with React, now evolving into a full-stack solution.

##  Short Description
A sleek React-based To-Do List frontend—soon to be extended with backend APIs using Node.js, Express, and MongoDB for a complete full-stack experience.

---

##  Project Overview

### Frontend (Current)
- Built using **React** and styled with **Tailwind CSS**
- Responsive UI with components:
  - `Navbar`, `About`, `Services`, `Contact` (with form)
  - Task management components (`Todo`, `Item`, etc.)
- Local storage used for storing tasks locally
- Uses **lucide-react** for clean icons

###  Upcoming Full-Stack Features
- **Backend**: Node.js + Express server with RESTful APIs
- **Database**: MongoDB (using Mongoose) to store tasks, contacts, and service data
- **Frontend–Backend Integration**:
  - Contact form will submit messages to backend
  - 'Services' section will fetch services dynamically from database
  - Task operations (CRUD) will transition from local storage to real server persistence

---

##  Tech Stack

| Part          | Technologies                  |
|---------------|-------------------------------|
| Frontend      | React, Tailwind CSS, lucide-react |
| Backend (planned) | Node.js, Express           |
| Database      | MongoDB via Mongoose          |
| REST API      | Axios or Fetch for client-server communication |

---

##  Next Steps

1. Set up the **backend server** with Express and MongoDB.
2. Create **API routes** for:
   - `/api/tasks`  CRUD for tasks
   - `/api/contact`  Save contact messages
   - `/api/services`  Manage and fetch services
3. Integrate frontend components (`Contact`, `Services`, `Todo`) with the backend.
4. Test the full flow: adding tasks, submitting contact messages, displaying services from DB.

---

*(README will evolve as backend is added and project grows)*

