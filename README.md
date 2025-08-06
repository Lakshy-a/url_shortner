# 🔗 URL Shortener - Backend API

A powerful and scalable URL shortening service built with **Node.js**, **Express**, and **MongoDB**. Transform long URLs into compact, shareable links with built-in analytics and robust error handling.

---

## ✨ Features

- **URL Shortening**: Convert any valid URL into a compact, shareable format
- **Smart Redirects**: Seamless redirection from short URLs to original destinations
- **Click Analytics**: Track and monitor click counts for each shortened URL
- **MongoDB Integration**: Persistent storage with MongoDB/Mongoose
- **Error Handling**: Comprehensive error management with custom middleware
- **Modular Architecture**: Clean separation of concerns with service/controller pattern
- **Environment Configuration**: Flexible configuration via environment variables

---

## 📁 Project Structure

```
url-shortener-backend/
├── controllers/
│   └── urlController.js          # Request handlers and business logic
├── models/
│   └── urlShortner.model.js      # MongoDB schema definitions
├── routes/
│   └── urlRoutes.js              # API route definitions
├── services/
│   └── createShortUrl.service.js # Core URL shortening logic
├── middlewares/
│   └── errorHandler.js           # Global error handling middleware
├── utils/
│   ├── AppError.js               # Custom error class
│   └── catchAsync.js             # Async error wrapper utility
├── .env                          # Environment variables
├── app.js                        # Express app configuration
├── server.js                     # Server startup and database connection
└── package.json                  # Project dependencies and scripts
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM for MongoDB |
| **dotenv** | Environment variable management |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/url-shortener-backend.git
cd url-shortener-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/urlshortener

# Application
APP_URL=http://localhost:5000
```

> **Note**: For production, replace `MONGODB_URI` with your MongoDB Atlas connection string.

---

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
*Runs with nodemon for auto-reload on file changes*

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 🔸 Create Short URL
**POST** `/api/create`

Creates a shortened version of the provided URL.

**Request Body:**
```json
{
  "url": "https://www.example.com/very/long/url/that/needs/shortening"
}
```

**Response:**
```json
{
    "shortUrl": "http://localhost:5000/ume4NyP"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid URL provided
- `500` - Internal server error

---

#### 🔸 Redirect to Original URL
**GET** `/:shortUrlId`

Redirects to the original URL and increments the click counter.

**Example:**
```http
GET http://localhost:5000/pbGsC3x
```

**Behavior:**
- Redirects user to the original URL (302 redirect)
- Increments the `clicks` counter in the database
- Returns 404 if short URL doesn't exist

---

## 🗄️ Database Schema

### URL Document Structure
```javascript
{
  _id: ObjectId,
  completeUrl: String,    // Original long URL
  short_url: String,       // Generated short code
  clicks: Number,         // Number of times accessed
  createdAt: Date,        // Timestamp of creation
  updatedAt: Date         // Last modified timestamp
}
```

**Example Document:**
```json
{
  "_id": "64e8a76f1234567890abcdef",
  "completeUrl": "https://www.example.com/long-url",
  "shortUrl": "pbGsC3x",
  "clicks": 15,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T14:22:00.000Z"
}
```

---

## 🛡️ Error Handling

The application implements a comprehensive error handling system:

### Custom Error Classes
- **AppError**: Custom error class for operational errors
- **catchAsync**: Wrapper for async functions to eliminate try/catch repetition

### Error Response Format
```json
{
  "success": false,
  "error": {
    "message": "URL not found",
    "statusCode": 404
  }
}
```

### Common Error Scenarios
- Invalid URL format
- Short URL not found
- Database connection issues
- Server errors

---

## 🧪 Testing

You can test the API using tools like Postman, curl, or any HTTP client.

### Example with curl:
```bash
# Create short URL
curl -X POST http://localhost:5000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.google.com"}'

# Test redirect (replace 'abc123' with actual short code)
curl -L http://localhost:5000/abc123
```

---

## 📊 Performance Considerations

- **Error Boundaries**: Proper error handling prevents crashes
- **Async Operations**: Non-blocking I/O for better performance

---

## 🔧 Development

### Project Scripts
```bash
npm run dev     # Development with nodemon
npm start       # Production server
```

### Code Style
- Follow Node.js best practices
- Use async/await for asynchronous operations
- Implement proper error handling
- Maintain separation of concerns

---

- [ ] User authentication and URL management
- [ ] Custom short URL aliases
- [ ] Advanced analytics dashboard
- [ ] Rate limiting and abuse prevention
- [ ] API key authentication
- [ ] Bulk URL shortening
- [ ] QR code generation
- [ ] URL expiration dates

---
