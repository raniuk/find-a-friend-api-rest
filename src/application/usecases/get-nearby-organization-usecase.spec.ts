import { InMemoryOrganizationRepository } from "@/infrastructure/repositories/in-memory/in-memory-organization-repository";
import { CreateOrganizationUseCase } from "./create-organization-usecase";
import { GetNearbyOrganizationsUseCase } from "./get-nearby-organization-usecase";

describe("Get nearby organizations usecase", () => {
  let organizationRepository: InMemoryOrganizationRepository;

  let createOrganizationUseCase: CreateOrganizationUseCase;
  let sut: GetNearbyOrganizationsUseCase;

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();

    createOrganizationUseCase = new CreateOrganizationUseCase(
      organizationRepository
    );
    sut = new GetNearbyOrganizationsUseCase(organizationRepository);
  });

  it("should be able to get nearby organizations", async () => {
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

    const nearbyOrganizations = await sut.getNearby({
      latitude: organization.latitude,
      longitude: organization.longitude,
    });

    expect(nearbyOrganizations).toEqual([organization]);
  });
});
