import { PetDto } from "@/domain/models/pet-dto";

export interface GetPet {
  getById(id: string): Promise<PetDto>;
}
