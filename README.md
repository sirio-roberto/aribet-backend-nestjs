# Aribet - NestJS backend

## Project Overview

This NestJS app serves as a backend for managing bets and users. It includes authentication, authorization, and features related to betting.

## Getting Started

1. Clone the Repository:

```
git clone git@github.com:sirio-roberto/aribet-backend-nestjs.git
cd aribet-backend-nestjs
```

2. Install Dependencies:

```
npm install
```

3. Configuration:

- Set up the environment variables, if required.
- Ensure your Prisma database connection is configured.

## Usage

### Authentication Endpoints

`POST /auth/signin`

- Sign in with existing user credentials.
- Example:

```
curl -X POST -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "yourpassword"}' http://localhost:3000/auth/signin
```

`POST /auth/signup`

- Create a new user account.
- Example:

```
curl -X POST -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com", "password": "yourpassword", "confirmPassword": "yourpassword"}' http://localhost:3000/auth/signup
```

### Bets Endpoints

`POST /bets`

- Create a new bet (requires authentication).
- Example:

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"time": "2023-11-26T12:30:00", "description": "Bet description"}' http://localhost:3000/bets
```

`GET /bets/today/all`

- Get all bets for the current day (requires authentication).
- Example:

```
curl -H "Authorization: Bearer <token>" http://localhost:3000/bets/today/all
```

### Users Endpoints

`POST /users`

- Create a new user account (admin only).
- Example:

```
curl -X POST -H "Content-Type: application/json" -d '{"name": "Admin User", "email": "admin@example.com", "password": "yourpassword", "confirmPassword": "yourpassword"}' http://localhost:3000/users
```

`GET /users`

- Get all users (admin only).
- Example:

```
curl -H "Authorization: Bearer <admin-token>" http://localhost:3000/users
```

## Configuration

- Ensure the Prisma database connection is correctly configured.
- Set up any necessary environment variables.

## Project Structure

The project is structured as follows:

- `src/auth`: Authentication-related files.
- `src/bets`: Files related to managing bets.
- `src/results`: Files related to result management.
- `src/users`: Files related to user management.
- `src/prisma`: Prisma service for database interactions.

## Dependencies

- `@nestjs/jwt`, `bcrypt`, `class-validator`: Authentication and validation libraries.
- `@prisma/client`: Prisma client for database operations.

## Scripts

- `npm start`: Start the NestJS application.

## Database Setup

- Ensure Prisma is configured and the database is set up.
- Run migrations if required.
