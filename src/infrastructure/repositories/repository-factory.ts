import { PrismaPetRepository } from "./prisma/primsa-pet-repository";
import { PrismaOrganizationRepository } from "./prisma/prisma-organization-repository";

export class RepositoryFactory {
  public static petRepository() {
    const petRepository = new PrismaPetRepository();

    return petRepository;
  }

  public static organizationRepository() {
    const orgRepository = new PrismaOrganizationRepository();

    return orgRepository;
  }
}
