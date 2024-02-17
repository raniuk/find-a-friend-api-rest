import { OrganizationRepository } from "@/domain/ports/driven/organization-repository";
import { PetRepository } from "@/domain/ports/driven/pet-repository";

import { PetDto } from "@/domain/models/pet-dto";
import { CreatePet } from "@/domain/ports/driver/create-pet";

import { OrganizationNotFoundError } from "../errors/organization-not-found-error";

export class CreatePetUseCase implements CreatePet {
  constructor(
    private organizationRepository: OrganizationRepository,
    private petRepository: PetRepository
  ) {}

  async create(data: PetDto): Promise<PetDto> {
    const organizationId = String(data.organizationId);

    const organization = await this.organizationRepository.findById(
      organizationId
    );

    if (!organization) {
      throw new OrganizationNotFoundError();
    }

    const pet = await this.petRepository.create({
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energyLevel,
      independence_level: data.independenceLevel,
      environment: data.environment,
      image: data.image,
      organization_id: organization.id,
    });

    return {
      id: pet.id,
      name: pet.name,
      age: pet.age,
      size: pet.size,
      about: pet.about,
      environment: pet.environment,
      energyLevel: pet.energy_level,
      independenceLevel: pet.independence_level,
      image: pet.image,
      available: pet.available || undefined,
      organizationId: pet.organization_id,
    };
  }
}
