# Fintech Platform

A basic fintech platform that allows users to manage their accounts and perform simple transactions like deposits and withdrawals. Built with Node.js, Hasura, and a simple frontend (HTML/CSS/JavaScript).

## Table of Contents

- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [API Documentation](#api-documentation)
- [Design Decisions and Assumptions](#design-decisions-and-assumptions)

## Setup Instructions

### Backend

1. **Clone the repository** to your local machine.
2. **Set up Docker**: Ensure you have Docker and Docker Compose installed.
3. **Create a `docker-compose.yml` file** with the necessary configurations for PostgreSQL and Hasura GraphQL Engine.
4. **Start the Docker containers** using Docker Compose.
5. **Install Node.js dependencies** by running `npm install` in the backend directory.
6. **Set environment variables**: Configure the Hasura GraphQL endpoint and admin secret in your environment variables.
7. **Run the backend server** with Node.js.

### Frontend

1. **Navigate to the frontend directory**.
2. **Ensure the backend server is running**.
3. **Open `index.html` in a web browser** to start the frontend application.

## API Documentation

### Endpoints

1. **Get User Account Details**
   - **Endpoint**: `/account/:id`
   - **Method**: `GET`
   - **Description**: Fetches details of a user account by user ID.
   - **Parameters**: 
     - `id` (path parameter): ID of the user.
   - **Response**:
     - `id`: User ID
     - `name`: User name
     - `balance`: User account balance

2. **Perform a Transaction**
   - **Endpoint**: `/transaction`
   - **Method**: `POST`
   - **Description**: Performs a transaction (deposit or withdraw) for a user.
   - **Request Body**:
     - `userId`: ID of the user.
     - `amount`: Amount to be deposited (positive) or withdrawn (negative).
   - **Response**:
     - `id`: User ID
     - `balance`: Updated account balance

## Design Decisions and Assumptions

1. **Stack Selection**:
   - **Node.js**: Chosen for the backend due to its non-blocking I/O and event-driven architecture, which is suitable for handling multiple requests.
   - **Hasura GraphQL Engine**: Provides a powerful and flexible way to interact with the database using GraphQL, making it easier to manage and query data.
   - **Frontend (HTML/CSS/JavaScript)**: Simplifies the UI implementation and ensures compatibility across different browsers.

2. **Database**:
   - Using **PostgreSQL** for robust and reliable data storage.
   - Hasura sits on top of PostgreSQL to provide a GraphQL API for accessing and modifying data.

3. **Authentication and Authorization**:
   - The current implementation uses a simple admin secret for securing the Hasura GraphQL Engine. For production use, consider implementing a more robust authentication and authorization mechanism.

4. **Transaction Handling**:
   - Transactions are handled optimistically with simple increment operations. In a real-world application, more sophisticated transaction management and error handling would be required.

5. **Frontend Design**:
   - A minimalistic design is used for the frontend to focus on functionality. This can be extended and styled according to specific requirements.

6. **Assumptions**:
   - The user IDs and initial balances are pre-seeded in the database.
   - The application runs in a local development environment. Adjustments would be needed for deployment to a production environment.
   - Error handling is basic and should be enhanced for production use to provide better user feedback and logging.

By following these instructions and understanding the design decisions, you should be able to set up and run the fintech platform locally. Further enhancements and customizations can be made based on specific requirements and use cases.
