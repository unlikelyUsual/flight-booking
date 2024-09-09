# Flight Booking Node App

This is an application developed using TypeScript version 5.5.4. It requires Node.js to run and uses
NPM (Node package manager) for package management.

## Tech Stack

- TypeScript
- Express
- Redis
- Passport and passport-jwt
- bcrypt
- pg and postgres
- Drizzle kit
- Zod
- Cors
- Faker

## Backend Security:

Security is an important aspect of our application, for this:

- **bcrypt**: We use bcrypt to hash passwords, a well-tested library to ensure the safety of user
  passwords.
- **Passport for Authentication**: To make sure only allowed users can access certain routes.
- **jsonwebtoken**: We use the jsonwebtoken library to create JWTs (Json Web Tokens) for a secure
  way of transmitting information.
- **Helmet**: We use the Helmet middleware to secure Express apps by setting various HTTP headers.
- **Rate Limiting**: This ensures a certain mount of request can be made from an IP, and it's useful
  to defend against brute-force attacks.
- **express-validator for Validation**: Validation of data before it reaches your server is very
  important to prevent malicious data entering your app and could potentially crash or worse, allow
  a data breach.

## Installation

`npm install`

## Running the application

1. Start the docker container for redis, postgres
   `npm start`

2. Run the drizzle migration and push to db
   `npm run generate` &
   `npm run migrate`

3. Seed the database
   `npm run seed`

4. Run the server
   `npm run dev`
