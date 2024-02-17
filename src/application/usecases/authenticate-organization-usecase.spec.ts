import { InMemoryOrganizationRepository } from "@/infrastructure/repositories/in-memory/in-memory-organization-repository";

import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

import { AuthenticateOrganizationUseCase } from "./authenticate-organization-usecase";
import { CreateOrganizationUseCase } from "./create-organization-usecase";

describe("Authenticate organization usecase", () => {
  let organizationRepository: InMemoryOrganizationRepository;

  let createOrganizationUseCase: CreateOrganizationUseCase;
  let sut: AuthenticateOrganizationUseCase;

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();

    createOrganizationUseCase = new CreateOrganizationUseCase(
      organizationRepository
    );
    sut = new AuthenticateOrganizationUseCase(organizationRepository);
  });

  it("should be able to authenticate an organization", async () => {
    const password = "123456";

    const organization = await createOrganizationUseCase.create({
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

    const organizationAuthenticated = await sut.auth(
      organization.email,
      password
    );

    expect(organizationAuthenticated).toEqual(organization);
  });

  it("shouldn't be able to authenticate with wrong email", async () => {
    const emailFake = "example@mail.com";
    const password = "123456";

    await createOrganizationUseCase.create({
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

    await expect(() => sut.auth(emailFake, password)).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });

  it("shouldn't be able to authenticate with wrong password", async () => {
    const passwordFake = "12345678";

    const organization = await createOrganizationUseCase.create({
      name: "bestfriends",
      authorName: "Best Friends",
      email: "bestfriends@mail.com",
      password: "123456",
      whatsapp: "999-777-4321",
      cep: "9999-777",
      state: "New York",
      city: "New York City",
      address: "NY 1000 Broadway",
      latitude: 40.81136424271872,
      longitude: -73.96013733702529,
    });

    await expect(() =>
      sut.auth(organization.email, passwordFake)
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
