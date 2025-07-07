# MKA EdTech Platform

![Project Logo](https://via.placeholder.com/150)

This is a full-stack EdTech platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a comprehensive solution for creating, managing, and selling online courses, with dedicated dashboards for students and instructors.

## Live Demo

[Link to Live Demo](https://your-live-demo-url.com) (Replace with your actual demo URL)

## Features

### For Students
- 🎓 **Course Enrollment:** Browse and enroll in a variety of courses.
- 💳 **Secure Payments:** Pay for courses securely using Razorpay.
- 📊 **Personalized Dashboard:** Track your enrolled courses and progress.
- 📝 **Reviews and Ratings:** Provide feedback on courses you have completed.

### For Instructors
- 📚 **Course Management:** Create, update, and delete courses, including sections and subsections.
- 🎥 **Media Uploads:** Upload course materials, including videos and thumbnails, to Cloudinary.
- 📈 **Instructor Dashboard:** View your created courses and manage your content.

### General
- 🔐 **User Authentication:** Secure user registration and login with JWT authentication.
- 📧 **Email Integration:** Automated emails for key events (e.g., successful registration).
- 📱 **Responsive Design:** A clean and modern UI that works on all devices.

## Technologies Used

| Category      | Technology                                                                                             | Description                                                 |
|---------------|--------------------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| **Backend**   | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)     | JavaScript runtime for the server-side.                     |
|               | ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | Web application framework for Node.js.                      |
|               | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)       | NoSQL database for storing application data.                |
|               | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)     | ODM for MongoDB and Node.js.                                |
|               | ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)         | JSON Web Tokens for secure authentication.                  |
|               | ![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=61C9F8)    | Payment gateway for online payments.                        |
|               | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white) | Cloud-based service for image and video management.         |
| **Frontend**  | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)           | JavaScript library for building user interfaces.            |
|               | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)               | Next-generation frontend tooling for fast development.      |
|               | ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)             | State management library for JavaScript apps.               |
|               | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | Utility-first CSS framework for rapid UI development.       |
|               | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) | Declarative routing for React applications.                 |
|               | ![Axios](https://img.shields.io/badge/Axios-202124?style=for-the-badge&logo=axios&logoColor=white)             | Promise-based HTTP client for the browser and Node.js.      |

## Project Structure

```
/project-root
├── /backend
│   ├── /config         # Database, Cloudinary, etc.
│   ├── /controllers    # Request handling logic
│   ├── /middleware     # Custom middleware (e.g., auth)
│   ├── /models         # Mongoose schemas
│   ├── /routes         # API routes
│   └── index.js        # Server entry point
└── /frontend
    ├── /src
    │   ├── /app          # Redux store and slices
    │   ├── /assets       # Images, logos, etc.
    │   ├── /components   # Reusable UI components
    │   ├── /pages        # Application pages
    │   ├── /services     # API calls
    │   └── /utils        # Utility functions
    └── vite.config.js  # Vite configuration
```

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud)
- Cloudinary account
- Razorpay account

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and add the following environment variables:
    ```
    PORT=4000
    MONGODB_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    CLOUDINARY_FOLDER_NAME=<your_cloudinary_folder_name>
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<your_cloudinary_api_key>
    CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
    RAZORPAY_KEY_ID=<your_razorpay_key_id>
    RAZORPAY_KEY_SECRET=<your_razorpay_key_secret>
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and add the following environment variable:
    ```
    VITE_APP_BASE_URL=http://localhost:4000/api/v1
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

## API Endpoints

A summary of the main API routes:

- **Authentication:** `/api/v1/auth` (signup, login, etc.)
- **Courses:** `/api/v1/course` (create, get, update, delete)
- **Payments:** `/api/v1/payment` (buy course, verify payment)
- **Profile:** `/api/v1/profile` (update profile, etc.)
- **Ratings and Reviews:** `/api/v1/rating` (create, get)

For a detailed list of endpoints, please refer to the backend routes files.

## Screenshots

| Home Page                                       | Course Details                                    |
| ----------------------------------------------- | ------------------------------------------------- |
| ![Home Page](https://via.placeholder.com/400)   | ![Course Details](https://via.placeholder.com/400) |
| **Student Dashboard**                           | **Instructor Dashboard**                          |
| ![Student Dashboard](https://via.placeholder.com/400) | ![Instructor Dashboard](https://via.placeholder.com/400) |

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## Author

- **Md Khalid Alam**

## License

Copyright (c) 2025 Md Khalid Alam. All Rights Reserved.
