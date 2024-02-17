import { PetRepository } from "@/domain/ports/driven/pet-repository";

import { PetDto } from "@/domain/models/pet-dto";
import { GetPet } from "@/domain/ports/driver/get-pet";

import { PetNotFoundError } from "../errors/pet-not-found-error";

export class GetPetUseCase implements GetPet {
  constructor(private petRepository: PetRepository) {}

  async getById(id: string): Promise<PetDto> {
    const pet = await this.petRepository.findById(id);

    if (!pet) throw new PetNotFoundError();

    return {
      id: pet.id,
      name: pet.name,
      about: pet.about,
      age: pet.age,
      size: pet.size,
      energyLevel: pet.energy_level,
      independenceLevel: pet.independence_level,
      environment: pet.environment,
      image: pet.image,
      available: pet.available || undefined,
      organizationId: pet.organization_id,
    };
  }
}
