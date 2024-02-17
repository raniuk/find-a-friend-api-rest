import { InMemoryOrganizationRepository } from "@/infrastructure/repositories/in-memory/in-memory-organization-repository";
import { InMemoryPetRepository } from "@/infrastructure/repositories/in-memory/in-memory-pet-repository";

import { CreateOrganizationUseCase } from "./create-organization-usecase";
import { CreatePetUseCase } from "./create-pet-usecase";
import { DeletePetUseCase } from "./delete-pet-usecase";

describe("Delete pet usecase", () => {
  let organizationRepository: InMemoryOrganizationRepository;

  let createOrganizationUseCase: CreateOrganizationUseCase;
  let petRepository: InMemoryPetRepository;

  let createPetUseCase: CreatePetUseCase;
  let sut: DeletePetUseCase;

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
    sut = new DeletePetUseCase(petRepository);
  });

  it("should be able to delete pet", async () => {
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

    const pet = await createPetUseCase.create({
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

    const petId = String(pet.id);

    await sut.delete(petId);

    expect(petRepository.pets).toHaveLength(0);
  });
});
