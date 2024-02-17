import { OrganizationDto } from "@/domain/models/organization-dto";

export interface AuthOrganization {
  auth(email: string, password: string): Promise<OrganizationDto>;
}
