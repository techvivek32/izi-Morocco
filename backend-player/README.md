# IZI Player Backend

Node.js backend API built with Express.js, TypeScript, and MongoDB.

## Features

- RESTful API with Express.js & TypeScript
- MongoDB database with Zod validation
- Authentication with JWT & Bcrypt
- Email uniqueness & Pincode validation

## Setup

1. **Install dependencies**

   ```bash
   yarn install
   ```

2. **Environment variables**

   Create `.env` file:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017
   JWT_SECRET=your-jwt-secret
   ```

3. **Start development server**
   ```bash
   yarn dev
   ```

## API Endpoints

### POST /auth/signup

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "pincode": "110001"
}
```

### POST /auth/login

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Project Structure

```
src/
├── config/          # Configuration
├── controllers/     # Route handlers
├── db/queries/      # Database queries
├── middlewares/     # Custom middlewares
├── routes/          # API routes
├── validators/      # Zod schemas
└── index.ts         # Entry point
```

## Scripts

- `yarn dev` - Development server
- `yarn build` - Build for production
- `yarn start` - Start production server

# IZIMorocco-player-backend
