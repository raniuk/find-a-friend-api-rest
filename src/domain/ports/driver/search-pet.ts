import { PetDto } from "@/domain/models/pet-dto";
import { SearchPetsParams } from "@/domain/models/search-pet-params";


export interface SearchPet {
  search(city: string, data: SearchPetsParams): Promise<Array<PetDto>>;
}
