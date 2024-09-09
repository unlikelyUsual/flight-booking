# Flight Booking Node App

This is an application developed using TypeScript version 5.5.4. It requires Node.js to run and uses
NPM (Node package manager) for package management.

### Completion

1. Backend : ✅
2. Frontend : 50 %

## Tech Stack

- Server : Node runtime with express server : Node.js is excellent for flight booking apps due to its non-blocking, asynchronous architecture, which efficiently handles high concurrency and real-time data updates
- Database : Postgres : For handling scale due to its advanced indexing and query optimization features. Its support for complex queries and transactions, combined with robust data integrity and replication capabilities, make it well-suited for high-traffic and large-scale applications.
- Front End : ReactJS with Vite: React with Vite offers rapid development and build times due to Vite's lightning-fast hot module replacement and optimized bundling.

## Backend Security:

Security is an important aspect of our application, for this:

- **bcrypt**: Password encryption.
- **Passport for Authentication**: Role based authentication
- **jsonwebtoken**: JWT token creation and verification
- **Helmet**: Secure Express apps by setting various HTTP headers.
- **Rate Limiting**: Defend against brute-force attacks
- **Cors**: Allowing know origins.

## Installation

`npm install`

## Running the application

1. Use the .env.example file as .env to run locally

2. Start the docker container for redis, postgres
   `docker-compose up -d`

3. Run the drizzle migration and push to db
   `npm run generate` &
   `npm run migrate`

4. Seed the database
   `npm run seed`

5. Run the server
   `npm run dev`

6. Run the frontend
   `cd client && npm run dev`
