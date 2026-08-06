# ⚡ Relish — Express & MongoDB REST API Backend

The server-side REST API for **Relish**, built with **Node.js**, **Express**, **MongoDB Atlas**, **JWT**, and **Stripe API**.

## 🚀 Key Features

- **Food Management API**: Add, list, and remove food items with Multer file storage.
- **User Authentication**: Secure signup and login endpoints using Bcrypt password hashing & JWT token issuance.
- **Cart API**: Persist and manage cart data tied to authenticated user IDs in MongoDB.
- **Order Pipeline & Stripe Integration**: Generate Stripe checkout session URLs, handle payment callbacks, and update order statuses.

## ⚙️ Environment Configuration

Refer to `.env.example`:
```env
PORT=5000
MONGODB_PASSWORD=your_mongodb_password
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

## 💻 Development & Execution

```bash
# Install dependencies
npm install

# Start backend server
npm start
```
