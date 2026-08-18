# Northline Roofing & Exteriors — Config-Driven Roof Estimator

A full-stack roofing estimate application built for Northline Roofing & Exteriors.

The application has two surfaces:

1. A public, mobile-friendly estimator for homeowners.
2. A protected owner/admin panel for managing estimator configuration and viewing captured leads.

The estimator is configuration-driven. Questions, labels, options, pricing rates, and multipliers are stored in the database.

## Features

### Public Estimator

- Multi-step roofing estimate flow
- Roof area input with validation
- Material selection
- Roof pitch selection
- Existing roofing layer selection
- Number of stories selection
- Contact information capture
- Server-side estimate calculation
- Estimate range shown to the homeowner
- Lead stored with the answers used to generate the estimate


### Owner Panel

- Protected admin login
- View current estimator configuration
- Edit business information
- Edit question labels
- Enable/disable estimator questions
- Edit pricing modifiers



## Tech Stack

### Frontend

- React
- JavaScript
- CSS


### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication

### Running Locally

Prerequisites

Install:

- Node.js 18+
- npm
- MongoDB Atlas account or a local MongoDB instance
- Git


## 1. Clone the repository
git clone 
cd wantace-roof-estimator
## 2. Install backend dependencies
cd Server
npm install
## 3. Configure backend environment variables




ADMIN_EMAIL=admin@northline.com
ADMIN_PASSWORD= Admin@12345



## 4. Seed the database

From the Server directory:

npm run seed

The seed process creates the initial estimator configuration and admin account.

## 5. Start the backend
npm run dev

The API should be available at:

http://localhost:5000

## 6. Install frontend dependencies

Open another terminal:

cd client
npm install

## 7. Start the frontend
npm run dev

The frontend should be available at:

http://localhost:5173
API Endpoints
Public configuration
GET /api/config

Returns the active estimator configuration.

## Admin login
POST /api/auth/login

## Test Credentials

Admin panel:

URL:
http://localhost:5173/admin/login


Email:
admin@northline.com


Password: 
Admin@12345



