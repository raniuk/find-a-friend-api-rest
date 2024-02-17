import { PetRepository } from "@/domain/ports/driven/pet-repository";

import { DeletePet } from "@/domain/ports/driver/delete-pet";

import { PetNotFoundError } from "../errors/pet-not-found-error";

export class DeletePetUseCase implements DeletePet {
  constructor(private petRepository: PetRepository) {}

  async delete(id: string): Promise<void> {
    const petResult = await this.petRepository.findById(id);

    if (!petResult) throw new PetNotFoundError();

    await this.petRepository.delete(id);
  }
}
