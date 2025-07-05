# MKA EdTech Platform

This is a full-stack EdTech platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a comprehensive solution for creating, managing, and selling online courses.

## Features

- **User Authentication:** Secure user registration and login with JWT authentication.
- **Course Management:** Instructors can create, update, and delete courses, including sections and subsections.
- **Student Enrollment:** Students can browse and enroll in courses.
- **Payment Integration:** Secure payment processing with Razorpay.
- **Dashboard:** Separate dashboards for students and instructors to manage their activities.
- **Cloudinary Integration:** Media assets are stored and managed on Cloudinary.

## Technologies Used

### Backend

- **Node.js:** JavaScript runtime for the server-side.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing application data.
- **Mongoose:** ODM for MongoDB and Node.js.
- **JWT:** JSON Web Tokens for secure authentication.
- **Razorpay:** Payment gateway for online payments.
- **Cloudinary:** Cloud-based service for image and video management.

### Frontend

- **React:** JavaScript library for building user interfaces.
- **Vite:** Next-generation frontend tooling for fast development.
- **Redux:** State management library for JavaScript apps.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **React Router:** Declarative routing for React applications.
- **Axios:** Promise-based HTTP client for the browser and Node.js.

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

A detailed list of API endpoints can be found in the backend routes files.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## Author

- **Md Khalid Alam**

## License

Copyright (c) 2025 Md Khalid Alam. All Rights Reserved.
