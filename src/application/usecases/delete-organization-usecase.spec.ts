import { InMemoryOrganizationRepository } from "@/infrastructure/repositories/in-memory/in-memory-organization-repository";

import { CreateOrganizationUseCase } from "./create-organization-usecase";
import { DeleteOrganizationUseCase } from "./delete-organization-usecase";

describe("Delete organization usecase", () => {
  let organizationRepository: InMemoryOrganizationRepository;

  let createOrganizationUseCase: CreateOrganizationUseCase;
  let sut: DeleteOrganizationUseCase;

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();

    createOrganizationUseCase = new CreateOrganizationUseCase(
      organizationRepository
    );
    sut = new DeleteOrganizationUseCase(organizationRepository);
  });

  it("should be able to delete organization", async () => {
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

    expect(organizationRepository.organizations).toHaveLength(1);
    expect(organization.id).toEqual(expect.any(String));

    const organizarionId = String(organization.id);

    await sut.delete(organizarionId);

    expect(organizationRepository.organizations).toHaveLength(0);
  });
});
