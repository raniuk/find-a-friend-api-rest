import { NearbyOrganizationParams } from "@/domain/models/nearby-organization-params";

import { Organization, Prisma } from "@prisma/client";

export interface OrganizationRepository {
  findById(id: string): Promise<Organization | null>;
  findByEmail(email: string): Promise<Organization | null>;
  findManyNearby(
    params: NearbyOrganizationParams
  ): Promise<Array<Organization>>;
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
  delete(id: string): Promise<void>;
}
