# 🚗 Pro Parking Spot Manager

A professional, full-stack vehicle parking slot allocation and tracking system built with the **MERN** stack. It provides real-time updates and secure user access management.

---

## 📝 Problem Description
Modern urban spaces and campuses face severe traffic congestion and resource wastage due to inefficient parking management:
* **Blind Searching:** Drivers spend significant time driving around looking for vacant parking slots, leading to fuel wastage and frustration.
* **Unauthorized Parking:** Lack of monitoring makes it easy for unauthorized vehicles to occupy reserved or premium zones.
* **Zero Accountability:** Without tracking vehicle numbers against specific slots, resolving security issues or identifying vehicle owners becomes impossible.

---

## 💡 Proposed Solution
The **Pro Parking Spot Manager** solves these issues by digitizing the entire parking layout:
* **Live Neon Dashboard:** A clean, dark-themed grid showing instantly whether a slot is available (Green) or occupied (Red).
* **Vehicle Tagging:** When booking a slot, the system forces the entry of a unique vehicle number, ensuring full accountability.
* **Instant Release Mechanism:** Security personnel or drivers can instantly free up a slot with one click when the vehicle leaves, updating the map in real-time.

---

## ✨ Features
* **Secure Authentication:** User login and registration powered by **JWT** (JSON Web Tokens) to protect administrative controls.
* **Visual Parking Grid:** Interactive, color-coded dashboard built specifically with a modern dark theme.
* **Instant Slot Booking:** Easy form to lock a parking slot with the respective vehicle plate number.
* **One-Click Release:** Quick checkout functionality to make slots available instantly.
* **Responsive Grid Layout:** Optimized design that aligns perfectly on both wide desktop screens and mobile displays.

---

## 🛠️ Technologies Used
* **Frontend:** React.js, Vite, Axios, CSS3 (Modern Dark Theme)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Security:** JSON Web Tokens (JWT), Bcrypt.js

---

## 🔌 API Endpoints

### 🔐 Authentication Endpoints
#### 1. User Registration
* **Endpoint:** `POST /api/parking/register`
* **Request Body:**
```json
{
  "name": "Malik",
  "email": "malik@example.com",
  "password": "malik123"
}
```
#### 2. User Login
* **Endpoint:** `POST /api/parking/login`
* **Request Body:**
```json
{
  "email": "malik@example.com",
  "password": "securepassword123"
}
```
* **Response:** Returns a valid JWT token and user details.

### 🚗 Parking Management Endpoints
#### 3. Fetch All Parking Spots
* **Endpoint:** `GET /api/parking/getAll`
* **Response:** Array of all parking slots with their zone, availability, and vehicle details.

#### 4. Create a Parking Spot
* **Endpoint:** `POST /api/parking/create`
* **Request Body:**
```json
{
  "spotNumber": "P-101",
  "zone": "Zone-A"
}
```
#### 5. Update/Book a Parking Spot
* **Endpoint:** `POST /api/parking/update/:id`
* **Request Body:**
```json
{
  "isAvailable": false,
  "vehicleNumber": "WP CAS-1010"
}
```
#### 6. Delete a Parking Spot
* **Endpoint:** `DELETE /api/parking/delete/:id`

### 🚀 Setup Instructions
#### 1. Prerequisites
Make sure you have these installed:
* **Node.js (v16 or higher)**
* **MongoDB installed and running locally**

#### 2. Environment Setup
Create a .env file in the backend directory:
```code snippet
PORT=8000
MONGO_URL=mongodb://localhost:27017/ParkingSystem
```

### 🏃 How to Run the Project
#### Step 1: Start the Backend Server
```bash
# Move to backend folder
cd backend

# Install node modules
npm install

# Run server
node index.js
```
#### Step 2: Start the Frontend Application
```bash
# Move to frontend folder
cd frontend

# Install client packages
npm install

# Run Vite development server
npm run dev
```

Open your browser and navigate to the address provided (usually http://localhost:5173).

### Developed by Malik 🚀