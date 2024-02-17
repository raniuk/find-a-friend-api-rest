import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/middlewares/verify-jwt";

import {
  createPet,
  deletePet,
  getPetById,
  searchPets,
} from "./controllers/pet-controller";

export async function petRoutes(app: FastifyInstance) {
  app.post("/organizations/pets", { onRequest: [verifyJwt] }, createPet);
  app.post("/pets", searchPets);
  app.get("/pets/:id", getPetById);
  app.delete("/pets/:id", deletePet);
}
