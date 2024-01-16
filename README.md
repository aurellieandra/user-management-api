# USER MANAGEMENT API

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Closing](#closing)

## Introduction

Welcome to the User Management API, a robust solution for handling user-related operations with ease. This API, built using Express.js, Typescript, Node.js, MySQL, and Sequelize ORM, is designed to simplify user management in your applications. 

## Key Features

- **User Registration and Authentication**: Allow users to register with the system securely and authenticate with ease.
- **Role-Based Access Control (RBAC)**: Implement role-based access control to manage user permissions effectively.
- **Profile Management**: Enable users to update their profiles, including information such as name, email, and more.
- **User Listing and Search**: Retrieve a list of users and perform searches based on various criteria.
- **Token-based Authentication**: Utilize token-based authentication for enhanced security.

## Getting Started

To quickly integrate the User Management API into your project, follow these steps:

### Prerequisites

Ensure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/): The API is built using Node.js. Make sure you have Node.js installed to run the server.
- [MySQL](https://www.mysql.com/): Set up a MySQL database for storing user data.
- [Express.js](https://expressjs.com/): The API framework used for building the web server.
- [Typescript](https://www.typescriptlang.org/): A superset of JavaScript that adds static typing and other features. While not strictly necessary, Typescript is recommended for better code maintainability.
- [Sequelize ORM](https://sequelize.org/): A promise-based Node.js ORM for MySQL, PostgreSQL, SQLite, and MSSQL. Sequelize is used for database interactions.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/aurellieandra/user-management-api
    ```

2. Navigate to the project directory:

    ```bash
    cd user-management-api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Configuration

1. Copy the `.env.example` file and rename it to `.env`:

    ```bash
    cp .env.example .env
    ```

2. Open the `.env` file and update a few of the configurations:

    ```env
    # Database Configuration
    DB_HOST=your-mysql-host
    DB_PORT=your-mysql-port
    DB_USERNAME=your-mysql-username
    DB_PASSWORD=your-mysql-password
    DB_NAME=your-database-name

    # Server Configuration
    BASEURL=localhost
    PORT=3000
    ```

### Database Setup

1. Create the necessary tables in your MySQL database. Run the following command in the project directory:

    ```bash
    npx sequelize-cli db:migrate
    ```

    This command will execute any pending migrations and create the required tables in your MySQL database.

    **Note:** Make sure that your database connection configuration in the `.env` file is correctly set up to point to your MySQL server.

2. (Optional) If you have seed data to populate the database, run the following command to execute the seeders:

    ```bash
    npx sequelize-cli db:seed:all
    ```

    This command will run all the defined seeders and populate the tables with sample data.

### Run the API

Start the API server:

```bash
npm start
```

## Closing

Feel free to make any comments regarding the project. You can access the the API documentation in Postman: https://documenter.getpostman.com/view/20457258/2s9YsQ79b1