import { InMemoryOrganizationRepository } from "@/infrastructure/repositories/in-memory/in-memory-organization-repository";
import { InMemoryPetRepository } from "@/infrastructure/repositories/in-memory/in-memory-pet-repository";

import { OrganizationNotFoundError } from "../errors/organization-not-found-error";

import { CreateOrganizationUseCase } from "./create-organization-usecase";
import { CreatePetUseCase } from "./create-pet-usecase";

describe("Create pet usecase", () => {
  let organizationRepository: InMemoryOrganizationRepository;
  let createOrganizationUseCase: CreateOrganizationUseCase;
  let petRepository: InMemoryPetRepository;
  let sut: CreatePetUseCase;

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();
    petRepository = new InMemoryPetRepository(organizationRepository);
    createOrganizationUseCase = new CreateOrganizationUseCase(
      organizationRepository
    );
    sut = new CreatePetUseCase(organizationRepository, petRepository);
  });

  it("shouldn't be able to create a pet with a nonexisting organization", async () => {
    const data = {
      name: "Laso",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      age: "1",
      size: "small",
      energyLevel: "low",
      independenceLevel: "low",
      environment: "indoor",
      image: "laso.png",
      organizationId: "invalid-organizarionId",
    };

    await expect(() => sut.create(data)).rejects.toBeInstanceOf(
      OrganizationNotFoundError
    );
  });

  it("should be able to create a pet", async () => {
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

    const pet = await sut.create({
      name: "Laso",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      age: "1",
      size: "small",
      energyLevel: "low",
      independenceLevel: "low",
      environment: "indoor",
      image: "laso.png",
      organizationId,
    });

    expect(petRepository.pets).toHaveLength(1);
    expect(pet.id).toEqual(expect.any(String));
    expect(pet.organizationId).toEqual(organization.id);
  });
});
