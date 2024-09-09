# Project title

This is an application developed using TypeScript version 5.5.4. It requires Node.js to run and uses
NPM (Node package manager) for package management.

Also, this application uses middleware functions, which are functions that have access to the
request object (req), the response object (res), and the next function in the application’s
request-response cycle. These functions are used for performing operations on the incoming requests
before they get to the intended routes. Express.js has a built-in middleware for handling static
files like images, CSS files, and JavaScript files. We also use multipart middleware for handling
file uploads.

## Tech Stack

- TypeScript:
  TypeScript is a statically compiled language to write clear and simple JavaScript code. It is a
  strict syntactical superset of JavaScript which adds optional static typing.

- Express:
  Express is a minimal and flexible Node.js web application framework that provides robust set of
  features for web and mobile applications.

- Redis:
  Redis is an open-source, in-memory data structure store, used as a database, cache, and message
  broker.

- dotenv:
  An npm package used to load environment variables from a .env file.

- Passport and passport-jwt:
  Passport is authentication middleware for Node.js that can be used for authenticating requests.
  Passport-jwt is a passport strategy for authenticating with a JSON Web Token.

- bcrypt:
  Bcrypt is a password hashing function which helps in securely storing passwords that can't be
  reverse engineered.

- jsonwebtoken:
  It is used to create access tokens for an application.

- pg and postgres:
  It is used for PostgreSQL database connections in JavaScript and TypeScript applications.

- Drizzle kit:
  Drizzle kit is a collection of useful tools to make your development easier.

- Zod:
  Zod is a TypeScript-first schema declaration and validation library.

- Cors:
  It is a package for providing a middleware that can be used to enable CORS with various options.

- Faker:
  This library generates massive amounts of fake data in Node.js and the browser.


## Middleware:

- **express.json()**: This is a built-in middleware function in Express. It parses incoming requests
  with JSON payloads and is based on body-parser.
- **express.urlencoded()**: This middleware function also comes with Express. It parses incoming
  requests with urlencoded payloads.
- **CORS (Cross-Origin Resource Sharing)**: It is used to provide or restrict domain access to
  certain parts of the webpages.
- **Passport**: A middleware that implements authentication strategies. In this application we use
  JWT based authentication strategy.

## Security:

Security is an important aspect of our application, for this:

- **bcrypt**: We use bcrypt to hash passwords, a well-tested library to ensure the safety of user
  passwords.
- **Passport for Authentication**: To make sure only allowed users can access certain routes.
- **jsonwebtoken**: We use the jsonwebtoken library to create JWTs (Json Web Tokens) for a secure
  way of transmitting information.
- **Helmet**: We use the Helmet middleware to secure Express apps by setting various HTTP headers.
- **Rate Limiting**: This ensures a certain mount of request can be made from an IP, and it's useful
  to defend against brute-force attacks.
- ** express-validator for Validation**: Validation of data before it reaches your server is very
  important to prevent malicious data entering your app and could potentially crash or worse, allow
  a data breach.


## Tables Structure

Please specify the structure of your tables, e.g:

- Users:
    - id: (string) unique id of the user
    - firstName: (string) first name
    - lastName: (string) last name
    - email: (string) email address
    - password: (string) user password, hashed with bcypt
    - Role: (string) User role array


## Installation

`npm install`

## Running the application

`npm start`

## Scripts

- `npm start` Run the application
- `npm test` Run all tests

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull
requests to us.

## License

Please provide information about the license here.