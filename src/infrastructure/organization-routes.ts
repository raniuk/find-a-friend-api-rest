import { FastifyInstance } from "fastify";

import {
  authOrganization,
  createOrganization,
  deleteOrganization,
  getNearbyOrganizations,
} from "./controllers/organization-controller";

export async function organizationRoutes(app: FastifyInstance) {
  app.post("/organizations", createOrganization);
  app.get("/organizations/nearby", getNearbyOrganizations);
  app.post("/organizations/authenticate", authOrganization);
  app.delete("/organizations/:id", deleteOrganization);
}
