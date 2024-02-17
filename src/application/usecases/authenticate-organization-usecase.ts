import { compare } from "bcryptjs";

import { OrganizationDto } from "@/domain/models/organization-dto";
import { OrganizationRepository } from "@/domain/ports/driven/organization-repository";
import { AuthOrganization } from "@/domain/ports/driver/auth-organization";

import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

export class AuthenticateOrganizationUseCase implements AuthOrganization {
  constructor(private organizationRepository: OrganizationRepository) {}

  async auth(email: string, password: string): Promise<OrganizationDto> {
    const organization = await this.organizationRepository.findByEmail(email);

    if (!organization) {
      throw new InvalidCredentialsError();
    }

    const doestPasswordMatches = await compare(password, organization.password);

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      id: organization.id,
      name: organization.name,
      authorName: organization.author_name,
      email: organization.email,
      whatsapp: organization.whatsapp,
      cep: organization.cep,
      state: organization.state,
      city: organization.city,
      address: organization.address,
      latitude: Number(organization.latitude),
      longitude: Number(organization.longitude),
    };
  }
}
