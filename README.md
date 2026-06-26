# React + Redux + Node.js + MySQL — Full Stack App
## Complete Beginner Guide

---

## 📁 Project Structure

```
react-redux-app/
├── backend/               ← Node.js + Express + MySQL
│   ├── config/
│   │   └── db.js          ← MySQL connection pool
│   ├── controllers/
│   │   ├── userController.js    ← User CRUD logic
│   │   └── productController.js ← Product CRUD logic
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── productRoutes.js
│   ├── setup.sql          ← Run this to create DB tables
│   ├── server.js          ← Main Express server
│   └── package.json
│
└── frontend/              ← React + Redux Toolkit
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   └── Navbar.jsx
        ├── pages/
        │   ├── Dashboard.jsx  ← Summary stats
        │   ├── Users.jsx      ← Full CRUD for users
        │   └── Products.jsx   ← Full CRUD for products
        ├── redux/
        │   ├── store.js           ← Redux store
        │   └── slices/
        │       ├── usersSlice.js    ← Users state + async thunks
        │       └── productsSlice.js ← Products state
        ├── services/
        │   └── api.js         ← Axios API calls
        ├── styles/
        │   └── App.css
        └── App.js             ← Routes + Provider
```

---

## 🚀 Step-by-Step Setup

### Step 1 — Install MySQL
Download MySQL from https://dev.mysql.com/downloads/
Default port: 3306, remember your root password.

### Step 2 — Create the database
Open MySQL Workbench or terminal and run:
```bash
mysql -u root -p < backend/setup.sql
```
This creates the database, tables, and sample data.

### Step 3 — Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set your MySQL password
npm run dev
```
Server starts at: http://localhost:5000

Test it:
- http://localhost:5000/api/users
- http://localhost:5000/api/products

### Step 4 — Setup Frontend
```bash
cd frontend
npm install
npm start
```
App opens at: http://localhost:3000

---

## 🔌 API Endpoints

| Method | URL                    | Description        |
|--------|------------------------|--------------------|
| GET    | /api/users             | Get all users      |
| GET    | /api/users/:id         | Get one user       |
| POST   | /api/users             | Create user        |
| PUT    | /api/users/:id         | Update user        |
| DELETE | /api/users/:id         | Delete user        |
| GET    | /api/products          | Get all products   |
| GET    | /api/products?search=x | Search products    |
| POST   | /api/products          | Create product     |
| PUT    | /api/products/:id      | Update product     |
| DELETE | /api/products/:id      | Delete product     |

---

## 🧠 Key Concepts Used

### React
- Functional components with hooks (useState, useEffect)
- React Router for navigation (BrowserRouter, Routes, Route, NavLink)
- Props and component composition
- Controlled forms

### Redux Toolkit
- `configureStore` — creates the store
- `createSlice` — defines state + reducers
- `createAsyncThunk` — handles async API calls
- `useSelector` — reads state in components
- `useDispatch` — dispatches actions

### Node.js + Express
- Express routing (GET, POST, PUT, DELETE)
- Middleware (cors, express.json)
- Error handling

### MySQL
- Connection pool with mysql2
- Parameterized queries (prevents SQL injection)
- async/await with db.query()

---

## 📚 Learning Path (Beginner)

1. **Start here** → Read `backend/server.js` and `backend/setup.sql`
2. **Understand DB** → Read `backend/config/db.js` and `backend/controllers/userController.js`
3. **Learn Redux** → Read `frontend/src/redux/store.js` and `frontend/src/redux/slices/usersSlice.js`
4. **See it in action** → Read `frontend/src/pages/Users.jsx`
5. **Modify it** → Try adding a new field to the users table and form
