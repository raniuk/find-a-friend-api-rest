import { randomUUID } from "node:crypto";

import { OrganizationRepository } from "@/domain/ports/driven/organization-repository";

import { Organization, Prisma } from "@prisma/client";

import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { Decimal } from "@prisma/client/runtime/library";

import { NearbyOrganizationParams } from "@/domain/models/nearby-organization-params";

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public organizations: Organization[] = [];

  async findById(id: string) {
    return (
      this.organizations.find((organization) => organization.id === id) || null
    );
  }

  async findByEmail(email: string) {
    return (
      this.organizations.find((organization) => organization.email === email) ||
      null
    );
  }

  async findManyNearby(params: NearbyOrganizationParams) {
    return this.organizations.filter((organization) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: organization.latitude.toNumber(),
          longitude: organization.longitude.toNumber(),
        }
      );

      return distance < 10;
    });
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    };

    this.organizations.push(organization);

    return organization;
  }

  async delete(id: string) {
    const findIndex = this.organizations.findIndex(
      (organization) => organization.id == id
    );

    if (findIndex != -1) {
      this.organizations.splice(findIndex, 1);
    }
  }
}
