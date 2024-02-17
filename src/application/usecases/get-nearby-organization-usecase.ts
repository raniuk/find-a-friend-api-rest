import { OrganizationRepository } from "@/domain/ports/driven/organization-repository";

import { GetNearbyOrganization } from "@/domain/ports/driver/get-nearby-organization";

import { NearbyOrganizationParams } from "@/domain/models/nearby-organization-params";
import { OrganizationDto } from "@/domain/models/organization-dto";

export class GetNearbyOrganizationsUseCase implements GetNearbyOrganization {
  constructor(private organizationRepository: OrganizationRepository) {}

  async getNearby({
    latitude,
    longitude,
  }: NearbyOrganizationParams): Promise<Array<OrganizationDto>> {
    let organizations: OrganizationDto[] = [];

    const organizationsResult =
      await this.organizationRepository.findManyNearby({
        latitude,
        longitude,
      });

    organizationsResult.forEach((organization) => {
      organizations.push({
        id: organization.id,
        name: organization.name,
        authorName: organization.author_name,
        email: organization.email,
        password: undefined,
        whatsapp: organization.whatsapp,
        cep: organization.cep,
        state: organization.state,
        city: organization.city,
        address: organization.address,

        latitude: Number(organization.latitude),
        longitude: Number(organization.longitude),
      });
    });

    return organizations;
  }
}
