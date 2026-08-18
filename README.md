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

