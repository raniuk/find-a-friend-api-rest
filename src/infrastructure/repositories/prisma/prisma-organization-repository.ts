import { OrganizationRepository } from "@/domain/ports/driven/organization-repository";

import { prisma } from "@/lib/prisma";
import { Organization, Prisma } from "@prisma/client";

import { NearbyOrganizationParams } from "@/domain/models/nearby-organization-params";

export class PrismaOrganizationRepository implements OrganizationRepository {
  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: { id },
    });

    return organization;
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: { email },
    });

    return organization;
  }

  async findManyNearby({ latitude, longitude }: NearbyOrganizationParams) {
    const organizations = await prisma.$queryRaw<Organization[]>`
    SELECT * from organizations
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
  `;

    return organizations;
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await prisma.organization.create({ data });

    return organization;
  }

  async delete(id: string): Promise<void> {
    await prisma.organization.delete({ where: { id } });
  }
}
