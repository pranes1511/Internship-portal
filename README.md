# Student Internship Portal — InternSphere

A full-stack web application that helps students explore internship opportunities and submit applications online.

## Features

- Browse available internships
- View internship details
- Submit internship applications
- View submitted applications
- Store application data in MongoDB

## Technology Stack

- **Frontend:** React.js, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Routing:** React Router
- **Version Control:** Git and GitHub

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB connection string

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pranes1511/Internship-portal.git
   cd Internship-portal
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd client
   npm install
   cd ..
   ```

4. Configure your environment variables in a local `.env` file using the variable names required by the backend. Never commit real credentials.

5. Start the application:

   ```bash
   npm run dev
   ```

## Project Structure

- `client/` — React frontend
- `routes/` — API routes
- `models/` — MongoDB models
- `index.js` — Express server

## Purpose

This project demonstrates full-stack web development, REST API integration, database operations, and frontend-backend communication.
