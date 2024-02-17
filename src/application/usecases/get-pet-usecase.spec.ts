import { InMemoryOrganizationRepository } from "@/infrastructure/repositories/in-memory/in-memory-organization-repository";
import { InMemoryPetRepository } from "@/infrastructure/repositories/in-memory/in-memory-pet-repository";

import { PetNotFoundError } from "../errors/pet-not-found-error";

import { CreateOrganizationUseCase } from "./create-organization-usecase";
import { CreatePetUseCase } from "./create-pet-usecase";
import { GetPetUseCase } from "./get-pet-usecase";

describe("Get pet usecase", () => {
  let organizationRepository: InMemoryOrganizationRepository;
  let petRepository: InMemoryPetRepository;

  let createOrganizationUseCase: CreateOrganizationUseCase;
  let createPetUseCase: CreatePetUseCase;
  let sut: GetPetUseCase;

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();
    petRepository = new InMemoryPetRepository(organizationRepository);

    createOrganizationUseCase = new CreateOrganizationUseCase(
      organizationRepository
    );
    createPetUseCase = new CreatePetUseCase(
      organizationRepository,
      petRepository
    );
    sut = new GetPetUseCase(petRepository);
  });

  it("should be able to get a pet", async () => {
    const organization = await createOrganizationUseCase.create({
      name: "bestfriends",
      authorName: "Best Friends",
      email: "bestfriends@mail.com",
      password: "12345678",
      whatsapp: "999-777-4321",
      cep: "9999-777",
      state: "New York",
      city: "New York City",
      address: "NY 1000 Broadway",
      latitude: 40.81136424271872,
      longitude: -73.96013733702529,
    });

    const organizationId = String(organization.id);

    const newPet = await createPetUseCase.create({
      name: "Laso",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      age: "20",
      size: "small",
      energyLevel: "low",
      independenceLevel: "low",
      environment: "indoor",
      image: "laso.png",
      organizationId,
    });

    const petId = String(newPet.id);

    const pet = await sut.getById(petId);

    expect(pet).toEqual(newPet);
  });

  it("shouldn't be able to get a nonexisting pet", async () => {
    await expect(() => sut.getById("invalid-petId")).rejects.toBeInstanceOf(
      PetNotFoundError
    );
  });
});
