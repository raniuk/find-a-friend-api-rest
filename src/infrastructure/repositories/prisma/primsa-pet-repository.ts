import { PetRepository } from "@/domain/ports/driven/pet-repository";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { SearchPetsParams } from "@/domain/models/search-pet-params";

export class PrismaPetRepository implements PetRepository {
  async search(city: string, params: SearchPetsParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energyLevel,
        organization: {
          city: {
            contains: city,
            mode: "insensitive",
          },
        },
      },
    });

    return pets;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findFirstOrThrow({
      where: {
        id,
      },
    });

    return pet;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async delete(id: string): Promise<void> {
    await prisma.pet.delete({ where: { id } });
  }
}
