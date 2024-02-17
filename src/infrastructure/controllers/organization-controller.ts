import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { ApplicationFactory } from "@/application/application-factory";

import { InvalidCredentialsError } from "@/application/errors/invalid-credentials-error";
import { OrganizationEmailAlreadyExistsError } from "@/application/errors/organization-email-already-exists-error";

export async function createOrganization(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    authorName: z.string(),
    email: z.string(),
    password: z.string(),
    whatsapp: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  });

  const data = createOrganizationBodySchema.parse(request.body);

  const createOrganizationUseCase =
    ApplicationFactory.createOrganizationUseCase();

  try {
    const organization = await createOrganizationUseCase.create(data);

    return reply.status(201).send(organization);
  } catch (error) {
    if (error instanceof OrganizationEmailAlreadyExistsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}

export async function getNearbyOrganizations(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const nearbyOrganizationBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const query = nearbyOrganizationBodySchema.parse(request.query);

  const fetchNearbyUseCase = ApplicationFactory.nearbyOrganizationsUseCase();

  try {
    const organizations = await fetchNearbyUseCase.getNearby({
      latitude: query.latitude,
      longitude: query.longitude,
    });

    return reply.status(200).send({ organizations });
  } catch (error) {
    throw error;
  }
}

export async function deleteOrganization(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteOrganizationParamSchema = z.object({ id: z.string().uuid() });

  const { id } = deleteOrganizationParamSchema.parse(request.params);

  const deleteOrganizationUseCase =
    ApplicationFactory.deleteOrganizationUseCase();

  try {
    await deleteOrganizationUseCase.delete(id);

    return reply.status(204).send();
  } catch (error) {
    throw error;
  }
}

export async function authOrganization(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const data = authBodySchema.parse(request.body);

  const authenticateOrgUseCase = ApplicationFactory.authOrganizationUseCase();

  try {
    const organization = await authenticateOrgUseCase.auth(
      data.email,
      data.password
    );

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      }
    );

    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
