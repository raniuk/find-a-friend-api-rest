import { NearbyOrganizationParams } from "@/domain/models/nearby-organization-params";
import { OrganizationDto } from "@/domain/models/organization-dto";

export interface GetNearbyOrganization {
  getNearby({
    latitude,
    longitude,
  }: NearbyOrganizationParams): Promise<Array<OrganizationDto>>;
}
