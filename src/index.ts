import fastify from "fastify";

const server = fastify();

server.get("/", (_request, _reply) => {
  return "Hello there! 👋";
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Started server at ${address}`);
});
