import { SearchPetsParams } from "@/domain/models/search-pet-params";
import { Pet, Prisma } from "@prisma/client";

export interface PetRepository {
  search(city: string, params: SearchPetsParams): Promise<Array<Pet>>;
  findById(id: string): Promise<Pet | null>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  delete(id: string): Promise<void>;
}
