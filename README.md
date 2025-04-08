# 📡 Feedback Server API

This is a backend server built with **Node.js**, **Express**, and **MongoDB** (using **Mongoose**) that handles feedback submission and retrieval with pagination support.

---

## 🚀 Features

- Add feedback (name, email, feedback text)
- Get paginated feedback list
- Structured success and error responses
- MongoDB connection via Mongoose
- Custom pagination utility
- Environment-based configuration

---

## 🏗️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **Vite** (for frontend if needed separately)
- **dotenv** for environment variables

---

## 🧪 API Endpoints

### `GET /api/feedback`

Fetch all feedback entries with pagination.

**Query Params**:

| Param     | Type   | Default | Description           |
|-----------|--------|---------|-----------------------|
| `page`    | Number | `0`     | Page number (0-based) |
| `perPage` | Number | `10`    | Items per page        |

**Response**:
```json
{
  "status": "success",
  "code": 200,
  "message": "Successfully",
  "data": [ ...feedbackList ],
  "page": 0,
  "per_page": 10,
  "total": 35,
  "total_pages": 4
}
```


- git clone https://github.com/dan1sh15/Feedback-controller-backend.git
- cd Feedback-controller-backend
- npm install

```
├── model/
│   └── Feedback.js         # Mongoose schema for feedback
├── utils/
│   ├── handlePagination.js # Pagination logic
│   └── responseTemplates.js # Unified success/error responses
├── controller/
│   └── feedbackController.js
├── routes/
│   └── feedbackRoutes.js
├── config/
│   └── connectDB.js        # MongoDB connection logic
├── index.js               # Entry point
└── .env                    # Environment variables

```
