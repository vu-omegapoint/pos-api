# PoS API README

This API has been created as a third laboratory work assignment for the Software Engineering Design and Architecture course. The contract which this API had to match was created by a separate team.

## Getting Started

### Initial setup

1. Run `npm install` to install all packages.
1. Run `npx prisma migrate dev` to create local database file up to the latest migration.
1. Tweak `.env` file if any adjustments of the preconfigured settings are wanted.

### Available Scripts

In the project directory, the following scripts are available:

#### `npm run start`

Use `npm run start` to run the application in production mode. Open [`localhost:8080`](http://localhost:8080) to view it in the browser.

Before running this script, make sure to have the application built:

- Use `npm run build` to compile the solution to the out dir.
- To remove any previously compiled contents, use `npm run clean`.

#### `npm run dev`

Use `npm run dev` to run the application in development mode with hot reload. Open [`localhost:8080`](http://localhost:8080) to view it in the browser.

#### `npm run lint`

Use `npm run lint` to check for linting mistakes.
By using `npm run lint:fix` the issues that are possible to be fixed automatically would be addressed.

## Fastify

This project uses [`fastify`](https://fastify.dev). To learn more about this framework, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).

## Swagger

Once you run the server, swagger documentation can be accessed through [`localhost:8080/swagger`](http://localhost:8080/swagger).

For this swagger documentation we are using fastify plugins [`@fastify/fastify-swagger`](https://github.com/fastify/fastify-swagger) and [`@fastify/fastify-swagger-ui`](https://github.com/fastify/fastify-swagger-ui).

## Prisma

The project uses [`@prisma/client`](https://www.prisma.io) as an ORM solution. It uses SQLite as the database provider. More related information can be found inside the [Prisma README](./prisma/README.md) file.
