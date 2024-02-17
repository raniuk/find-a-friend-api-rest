import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { ApplicationFactory } from "@/application/application-factory";
import { OrganizationNotFoundError } from "@/application/errors/organization-not-found-error";
import { PetNotFoundError } from "@/application/errors/pet-not-found-error";

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    age: z.string(),
    size: z.string(),
    about: z.string(),
    energyLevel: z.string(),
    independenceLevel: z.string(),
    environment: z.string(),
    image: z.string(),
  });

  const data = createPetBodySchema.parse(request.body);

  const createPetUseCase = ApplicationFactory.createPetUseCase();

  const organizationId = request.user.sub;

  try {
    const pet = await createPetUseCase.create({ ...data, organizationId });

    return reply.status(201).send(pet);
  } catch (error) {
    if (error instanceof OrganizationNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}

export async function getPetById(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamSchema = z.object({
    id: z.string(),
  });

  const { id } = getPetParamSchema.parse(request.params);

  const getPetUseCase = ApplicationFactory.getPetUseCase();

  try {
    const pet = await getPetUseCase.getById(id);

    return reply.status(200).send(pet);
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const seachPetBodySchema = z.object({
    city: z.string().min(1),
    age: z.string().optional(),
    size: z.string().optional(),
    energyLevel: z.string().optional(),
    independenceLevel: z.string().optional(),
    environment: z.string().optional(),
  });

  const { city, age, size, energyLevel, independenceLevel, environment } =
    seachPetBodySchema.parse(request.body);

  const searchPetsUseCase = ApplicationFactory.searchPetUseCase();

  try {
    const pets = await searchPetsUseCase.search(city, {
      age,
      size,
      energyLevel,
      independenceLevel,
      environment,
    });

    return reply.status(200).send({ pets });
  } catch (error) {
    throw error;
  }
}

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const deletePetParamSchema = z.object({ id: z.string().uuid() });

  const { id } = deletePetParamSchema.parse(request.params);

  const deletePetUseCase = ApplicationFactory.deletePetUseCase();

  try {
    await deletePetUseCase.delete(id);

    return reply.status(204).send();
  } catch (error) {
    throw error;
  }
}
