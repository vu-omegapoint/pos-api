# PoS API README

This API has been created as a third laboratory work assignment for the Software Engineering Design and Architecture course. The contract which this API had to match was created by a separate team.

## Getting Started with Fastify

To learn more about Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).

### Available Scripts

In the project directory, you can run:

#### `npm run start`

Use `npm run start` to run the application in production mode. Open [`localhost:8080`](http://localhost:8080) to view it in the browser.

#### `npm run dev`

Use `npm run dev` to run the application in development mode with hot reload. Open [`localhost:8080`](http://localhost:8080) to view it in the browser.

#### `npm run lint`

Use `npm run lint` to check for linting mistakes. By using `npm run lint-fix` the issues that are possible to be tackled would be tweaked.

## Swagger

Once you run the server, swagger documentation can be accessed through [`localhost:8080/docs`](http://localhost:8080/docs).

For this swagger documentation we are using fastify plugins [`@fastify/fastify-swagger`](https://github.com/fastify/fastify-swagger) and [`@fastify/fastify-swagger-ui`](https://github.com/fastify/fastify-swagger-ui).
