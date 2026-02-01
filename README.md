# Restaurant Admin Dashboard

This project is a full-stack **Restaurant Admin Dashboard** built as part of the Eatoes Intern Assignment.  
It allows restaurant admins to manage menu items and orders efficiently using a clean and simple interface.

##  Features

###  Menu Management
- View all menu items
- Search menu items by name or ingredients
- Debounced search (300ms delay)
- Toggle menu item availability (Available / Unavailable)

###  Orders Management
- View all orders
- Update order status from UI:
  - Pending
  - Preparing
  - Ready
  - Delivered
  - Cancelled



##  Tech Stack

### Frontend
- React
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose


## Project Structure

eatoes-admin-dashboard
├── backend
│ ├── config
│ ├── models
│ ├── routes
│ ├── server.js
│ └── .env
│
├── frontend
│ ├── src
│ │ ├── pages
│ │ ├── hooks
│ │ ├── App.js
│ │ └── App.css
│ └── public
│
└── README.md


## How to Run the Project Locally

### Backend
```bash
cd backend
npm install
npx nodemon server.js

## Backend runs on:
http://localhost:5000

### Frontend
cd frontend
npm install
npm start

## Frontend runs on:
http://localhost:3000

## API Endpoints

### Menu APIs
- GET `/api/menu` – Get all menu items
- GET `/api/menu/search?q=keyword` – Search menu items
- POST `/api/menu` – Add new menu item
- PATCH `/api/menu/:id/availability` – Toggle availability

### Orders APIs
- GET `/api/orders` – Get all orders
- POST `/api/orders` – Create new order
- PATCH `/api/orders/:id/status` – Update order status

##  Highlights
- Debounced search implemented using custom React hook
- Optimistic UI updates for menu availability
- Clean separation of frontend and backend
- Real-world admin dashboard workflow