import { PetDto } from "@/domain/models/pet-dto";

export interface CreatePet {
  create(data: PetDto): Promise<PetDto>;
}
