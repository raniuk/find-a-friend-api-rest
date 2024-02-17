import { randomUUID } from "node:crypto";

import { SearchPetsParams } from "@/domain/models/search-pet-params";
import { PetRepository } from "@/domain/ports/driven/pet-repository";
import { Pet, Prisma } from "@prisma/client";

import { InMemoryOrganizationRepository } from "./in-memory-organization-repository";

export class InMemoryPetRepository implements PetRepository {
  public pets: Pet[] = [];

  constructor(private organizationRepository: InMemoryOrganizationRepository) {}

  async search(city: string, params: SearchPetsParams) {
    const organizationsByCity =
      this.organizationRepository.organizations.filter(
        (org) => org.city === city
      );

    const pets = this.pets
      .filter((item) =>
        organizationsByCity.some((org) => org.id === item.organization_id)
      )
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energyLevel ? item.energy_level === params.energyLevel : true
      )
      .filter((item) =>
        params.independenceLevel
          ? item.independence_level === params.independenceLevel
          : true
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true
      );

    return pets;
  }

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id) ?? null;

    return pet;
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      ...data,
      available: data.available || true,
      organization_id: data.organization_id,
    };

    this.pets.push(pet);

    return pet;
  }

  async delete(id: string) {
    const findIndex = this.pets.findIndex((pet) => pet.id == id);

    if (findIndex != -1) {
      this.pets.splice(findIndex, 1);
    }
  }
}
