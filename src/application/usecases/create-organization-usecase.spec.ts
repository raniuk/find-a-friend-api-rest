import { compare, hash } from "bcryptjs";

import { InMemoryOrganizationRepository } from "@/infrastructure/repositories/in-memory/in-memory-organization-repository";

import { OrganizationEmailAlreadyExistsError } from "../errors/organization-email-already-exists-error";
import { CreateOrganizationUseCase } from "./create-organization-usecase";

describe("Create organization usecase", () => {
  let organizationRepository: InMemoryOrganizationRepository;
  let sut: CreateOrganizationUseCase;

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new CreateOrganizationUseCase(organizationRepository);
  });

  it("should be able to create a organization", async () => {
    const organization = await sut.create({
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

    expect(organizationRepository.organizations).toHaveLength(1);
    expect(organization.id).toEqual(expect.any(String));
  });

  it("shouldn't be able to create a organization with an already used email", async () => {
    const data = {
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
    };

    await sut.create(data);

    await expect(() => sut.create(data)).rejects.toBeInstanceOf(
      OrganizationEmailAlreadyExistsError
    );
  });

  it("should hash password upon creation", async () => {
    const password = "123456";

    const passwordHash = await hash(password, 8);

    await sut.create({
      name: "bestfriends",
      authorName: "Best Friends",
      email: "bestfriends@mail.com",
      password,
      whatsapp: "999-777-4321",
      cep: "9999-777",
      state: "New York",
      city: "New York City",
      address: "NY 1000 Broadway",
      latitude: 40.81136424271872,
      longitude: -73.96013733702529,
    });

    const paswordCompare = await compare(password, passwordHash);

    expect(paswordCompare).toBe(true);
  });
});
