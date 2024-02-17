import { OrganizationDto } from "@/domain/models/organization-dto";

export interface CreateOrganization {
  create(data: OrganizationDto): Promise<OrganizationDto>;
}
