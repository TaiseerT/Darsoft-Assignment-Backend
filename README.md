# Darsoft-Assignment-Backend

# Overview:

This is the Darsoft Backend Assignment, which includes a set of APIs for user management,
address management, and a realtime news updates.

# Installation:

To install the project, follow these steps:

1. Clone the repository:
   git clone git@github.com:TaiseerT/Darsoft-Assignment-Backend.git
2. Navigate to the project directory:
   cd darsoft-assignment-backend
3. Install dependencies:
   npm install

# Configuration:

Create a .env file containing the following environment variables:
PORT = 4000
DB_URL = mongodb://localhost:27017/your-db-name
ACCESS_TOKEN = Generate a random access token using this command in your cli:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
DB_NAME = your-db-name

# Running the Server:

To start the server, run:
npm run dev
Ensure that Redis is running before starting the server.

# API Endpoints

Refer to the Postman collection attached in the email for detailed endpoint usage.
IMPORTANT: Authentication is required for most APIs. Include the token in the request headers.

# Running the APIs:

To run the APIs, send requests to
http://localhost:4000/api/endpoint.

**User APIs**:

1. Create User(Post): http://localhost:4000/api/users/create-user
2. Login(Post): http://localhost:4000/api/users/login
3. Update User(Patch): http://localhost:4000/api/users/update-user

**Address APIs**:

1. Create Address(Post): http://localhost:4000/api/address/create-address
2. Get User Addresses(Get): http://localhost:4000/api/address/get-addresses
3. Delete Address(Delete): http://localhost:4000/api/address/:addressId/delete-address

**News APIs**:

1. Show News(Get): http://localhost:4000/api/news
2. Create News(Post): http://localhost:4000/api/news/create-news
3. Update News(Patch): http://localhost:4000/api/news/:newsId/update-news
4. Delete News(Delete): http://localhost:4000/api/news/:newsId/delete-news

# Database Seeding:

To initialize the database with the admin account, please follow these steps:

1. Change directory to the seeders folder:
   cd seeders
2. Execute the admin seeder script:
   node admin.seeder.js
   Upon successful execution, you should see the following message in the console:
   Connected to database
   This indicates that the admin account has been successfully seeded into the database.

# Admin Credentials:

full_name: Mohammad Taiseer Tello
email: taiseertello@gmail.com
password: 123456789

# Testing

A Postman collection is included for testing the APIs. Ensure to import it into your Postman application.

# Error Handling

Error responses and field validations are implemented to guide users through correct API usage.
