import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";

import { fastify } from "fastify";
import { ZodError } from "zod";

import { env } from "./env";

import { organizationRoutes } from "./infrastructure/organization-routes";
import { petRoutes } from "./infrastructure/pet-routes";

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "7d",
  },
});

app.register(fastifyCookie);

app.register(organizationRoutes);
app.register(petRoutes);

app.get("/", (request, reply) => {
  reply.send("Find a friend API");
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(500).send(`Validation error ${error.message}`);
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to a external tool
  }

  return reply.status(500).send({ message: "Internal server error." });
});

export default app;
