https://github.com/erendemiray/Web-Programming-Final-Project
230408008 Mustafa Eren Demiray 
230408021 Esma Şevval Marangoz


# 🎬 FILMCRITIC - Full-Stack Movie Review Platform

A comprehensive full-stack movie platform where users can browse movies, read details, and post reviews. The system includes a secure admin portal for content management.

## 🚀 Features

* **Dual Authentication System:** Separate registration and login flows for regular Users and Administrators.
* **Secure Admin Portal:** A protected "Add Movie" page accessible only to verified administrators via a specialized gate.
* **Dynamic Movie Details:** Individual pages for every movie (utilizing Next.js Dynamic Routing) displaying posters, scores, categories, and descriptions.
* **Interactive Comment System:** Real-time user reviews allowing critics to share their thoughts, sorted by the latest activity.
* **Robust Security:** Backend route protection using **JSON Web Tokens (JWT)** and password encryption with **Bcrypt.js**.
* **Modern UI/UX:** A sleek, fully responsive dark-themed interface built with Tailwind CSS.

## 🛠 Tech Stack

### Frontend
* **Next.js 15** (App Router)
* **Tailwind CSS** (Styling)
* **Axios** (API Management)

### Backend
* **Node.js & Express**
* **MongoDB & Mongoose** (Database)
* **Bcrypt.js** (Secure Hashing)
* **JSON Web Token** (Authorization)

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/filmcritic.git](https://github.com/yourusername/filmcritic.git)
    ```

2.  **Setup Backend:**
    ```bash
    cd server
    npm install
    ```
    *Create a `.env` file in the server directory:*
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    PORT=5000
    ```
    ```bash
    node server.js
    ```

3.  **Setup Frontend:**
    ```bash
    cd client
    npm install
    npm run dev
    ```

## 🔐 Default Admin Credentials
The system automatically seeds an initial admin account upon first database connection:
* **Email:** `esma@admin.com`
* **Password:** `123456`

---

### Project Status: **Completed ✅**
This project successfully implements all core CRUD operations and security protocols required for a modern web application.