import { PetDto } from "@/domain/models/pet-dto";
import { SearchPetsParams } from "@/domain/models/search-pet-params";

import { PetRepository } from "@/domain/ports/driven/pet-repository";
import { SearchPet } from "@/domain/ports/driver/search-pet";

export class SearchPetsUseCase implements SearchPet {
  constructor(private petRepository: PetRepository) {}

  async search(city: string, data: SearchPetsParams): Promise<Array<PetDto>> {
    let pets: PetDto[] = [];

    const petsResponse = await this.petRepository.search(city, {
      age: data.age,
      size: data.size,
      energyLevel: data.energyLevel,
      environment: data.environment,
    });

    petsResponse.forEach((pet) => {
      pets.push({
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
      });
    });

    return pets;
  }
}
