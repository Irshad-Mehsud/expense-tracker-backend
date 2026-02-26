# Expense Tracker API Documentation for Frontend

Base URL: `http://localhost:5000/api`

> **Note on Authentication:** For routes that require authentication, you must include the JWT token in the `Authorization` header as a Bearer token:
> `Authorization: Bearer <your_jwt_token>`

---

## 1. Authentication & Users (`/api/auth`)

### Register a New User
- **Endpoint:** `POST /auth/register`
- **Description:** Creates a new user account.
- **Request Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```

### Login User
- **Endpoint:** `POST /auth/login`
- **Description:** Authenticates a user and returns a token.
- **Request Body (JSON):**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Expected Response:** Should return user details and a JWT token.

### Get Current User
- **Endpoint:** `GET /auth/me`
- **Description:** Fetches the profile of the currently logged-in user.
- **Headers Required:** `Authorization: Bearer <token>`

### Get All Users
- **Endpoint:** `GET /auth/`
- **Description:** Fetches a list of all users.
- **Headers Required:** `Authorization: Bearer <token>`

### Update User
- **Endpoint:** `PUT /auth/:id`
- **Description:** Updates a user's information by their ID.
- **URL Parameters:** `id` (User ID)
- **Request Body (JSON):** Fields to update (e.g., `name`, `email`, `profilePicture`).

### Delete User
- **Endpoint:** `DELETE /auth/:id`
- **Description:** Deletes a user account by their ID.
- **URL Parameters:** `id` (User ID)

---


## 2. Expenses API (`/api/expenses`)

### Create Expense
- **Method:** `POST`
- **Endpoint:** `/expenses/`
- **Description:** Add a new expense for the authenticated user.
- **Request Body:**
  ```json
  {
    "title": "Groceries",
    "amount": 150.50,
    "category": "Food",
    "date": "2026-02-23",
    "description": "Weekly grocery shopping"
  }
  ```
- **Response:**
  - `201 Created` with created expense object.

### Get All Expenses
- **Method:** `GET`
- **Endpoint:** `/expenses/`
- **Description:** Get all expenses for the authenticated user. Supports optional query params:
  - `category` (string)
  - `startDate` (ISO date string)
  - `endDate` (ISO date string)
- **Response:**
  - `200 OK` with array of expense objects.

### Get Expense Statistics
- **Method:** `GET`
- **Endpoint:** `/expenses/stats`
- **Description:** Get aggregated statistics for the user's expenses (e.g., total spent, spending by category).
- **Response:**
  - `200 OK` with stats object.

### Get Single Expense
- **Method:** `GET`
- **Endpoint:** `/expenses/:id`
- **Description:** Get details of a specific expense by its ID.
- **URL Params:**
  - `id` (Expense ID)
- **Response:**
  - `200 OK` with expense object, or `404 Not Found` if not found.

### Update Expense
- **Method:** `PUT`
- **Endpoint:** `/expenses/:id`
- **Description:** Update an existing expense by its ID.
- **URL Params:**
  - `id` (Expense ID)
- **Request Body:** Fields to update (e.g., `amount`, `title`, `category`).
- **Response:**
  - `200 OK` with updated expense object, or `404 Not Found` if not found.

### Delete Expense
- **Method:** `DELETE`
- **Endpoint:** `/expenses/:id`
- **Description:** Delete an expense by its ID.
- **URL Params:**
  - `id` (Expense ID)
- **Response:**
  - `200 OK` on success, or `404 Not Found` if not found.

### Upload Expense Receipt
- **Method:** `POST`
- **Endpoint:** `/expenses/:id/receipt`
- **Description:** Upload a receipt image for a specific expense.
- **URL Params:**
  - `id` (Expense ID)
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `receipt` (File)
- **Response:**
  - `200 OK` with receipt upload result.

---

## 3. Incomes API (`/api/incomes`)

### Create Income
- **Method:** `POST`
- **Endpoint:** `/incomes/`
- **Description:** Add a new income for the authenticated user.
- **Request Body:**
  ```json
  {
    "title": "Salary",
    "amount": 3000.00,
    "category": "Job",
    "date": "2026-02-23",
    "description": "Monthly salary"
  }
  ```
- **Response:**
  - `201 Created` with created income object.

### Get All Incomes
- **Method:** `GET`
- **Endpoint:** `/incomes/`
- **Description:** Get all incomes for the authenticated user. Supports optional query params:
  - `category` (string)
  - `startDate` (ISO date string)
  - `endDate` (ISO date string)
- **Response:**
  - `200 OK` with array of income objects.

### Get Income Statistics
- **Method:** `GET`
- **Endpoint:** `/incomes/stats`
- **Description:** Get aggregated statistics for the user's incomes (e.g., total earned, earnings by category).
- **Response:**
  - `200 OK` with stats object.

### Get Single Income
- **Method:** `GET`
- **Endpoint:** `/incomes/:id`
- **Description:** Get details of a specific income by its ID.
- **URL Params:**
  - `id` (Income ID)
- **Response:**
  - `200 OK` with income object, or `404 Not Found` if not found.

### Update Income
- **Method:** `PUT`
- **Endpoint:** `/incomes/:id`
- **Description:** Update an existing income by its ID.
- **URL Params:**
  - `id` (Income ID)
- **Request Body:** Fields to update (e.g., `amount`, `title`, `category`).
- **Response:**
  - `200 OK` with updated income object, or `404 Not Found` if not found.

### Delete Income
- **Method:** `DELETE`
- **Endpoint:** `/incomes/:id`
- **Description:** Delete an income by its ID.
- **URL Params:**
  - `id` (Income ID)
- **Response:**
  - `200 OK` on success, or `404 Not Found` if not found.

---

## 4. General Uploads (`/api/upload`)

### Upload an Image
- **Method:** `POST`
- **Endpoint:** `/upload/`
- **Description:** Upload a general image (e.g., profile picture) to Cloudinary.
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `image` (File)
- **Response:**
  - `200 OK` with the Cloudinary URL of the uploaded image.

---

## Example Axios Implementation (Frontend)

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to automatically attach the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// Example: Login
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Example: Create Expense
export const createExpense = async (expenseData) => {
  const response = await api.post('/expenses', expenseData);
  return response.data;
};

// Example: Upload Receipt (Multipart Form Data)
export const uploadReceipt = async (expenseId, file) => {
  const formData = new FormData();
  formData.append('receipt', file);
  
  const response = await api.post(\`/expenses/\${expenseId}/receipt\`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
```