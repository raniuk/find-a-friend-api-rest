import { InMemoryOrganizationRepository } from "@/infrastructure/repositories/in-memory/in-memory-organization-repository";
import { InMemoryPetRepository } from "@/infrastructure/repositories/in-memory/in-memory-pet-repository";

import { CreateOrganizationUseCase } from "./create-organization-usecase";
import { CreatePetUseCase } from "./create-pet-usecase";
import { SearchPetsUseCase } from "./search-pets-usecase";

describe("Search pets usecase", () => {
  let organizationRepository: InMemoryOrganizationRepository;
  let petRepository: InMemoryPetRepository;

  let createOrganizationUseCase: CreateOrganizationUseCase;
  let createPetUseCase: CreatePetUseCase;
  let sut: SearchPetsUseCase;

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
    sut = new SearchPetsUseCase(petRepository);
  });

  it("should be able to search pets by city", async () => {
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

    await createPetUseCase.create({
      name: "Laso",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      age: "2",
      size: "small",
      energyLevel: "low",
      independenceLevel: "low",
      environment: "indoor",
      image: "laso.png",
      organizationId: String(organization.id),
    });

    const pet = await createPetUseCase.create({
      name: "Daru",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      age: "2",
      size: "small",
      energyLevel: "low",
      independenceLevel: "low",
      environment: "indoor",
      image: "daru.png",
      organizationId: String(organization.id),
    });

    const pets = await sut.search(organization.city, {});

    expect(pets).toHaveLength(2);
  });

  it("should be able to search pets by city and age", async () => {
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

    await createPetUseCase.create({
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

    const pet = await createPetUseCase.create({
      name: "Daru",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      age: "2",
      size: "small",
      energyLevel: "low",
      independenceLevel: "low",
      environment: "indoor",
      image: "daru.png",
      organizationId,
    });

    const pets = await sut.search(organization.city, { age: "2" });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and size", async () => {
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

    await createPetUseCase.create({
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

    const pet = await createPetUseCase.create({
      name: "Daru",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      age: "1",
      size: "medium",
      energyLevel: "low",
      independenceLevel: "low",
      environment: "indoor",
      image: "daru.png",
      organizationId,
    });

    const pets = await sut.search(organization.city, { size: "small" });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and energy level", async () => {
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

    await createPetUseCase.create({
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

    const pet = await createPetUseCase.create({
      name: "Daru",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      age: "1",
      size: "medium",
      energyLevel: "high",
      independenceLevel: "low",
      environment: "indoor",
      image: "daru.png",
      organizationId,
    });

    const pets = await sut.search(organization.city, { energyLevel: "high" });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and environment", async () => {
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

    await createPetUseCase.create({
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

    const pet = await createPetUseCase.create({
      name: "Daru",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      age: "1",
      size: "medium",
      energyLevel: "high",
      independenceLevel: "low",
      environment: "outdoor",
      image: "daru.png",
      organizationId,
    });

    const pets = await sut.search(organization.city, { environment: "indoor" });

    expect(pets).toHaveLength(1);
  });
});
