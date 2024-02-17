import { hash } from "bcryptjs";

import { OrganizationRepository } from "@/domain/ports/driven/organization-repository";
import { CreateOrganization } from "@/domain/ports/driver/create-organization";

import { OrganizationDto } from "@/domain/models/organization-dto";

import { OrganizationEmailAlreadyExistsError } from "../errors/organization-email-already-exists-error";
import { PasswordIsRequiredError } from "../errors/password-is-required-error";

export class CreateOrganizationUseCase implements CreateOrganization {
  constructor(private organizationRepository: OrganizationRepository) {}

  async create(data: OrganizationDto): Promise<OrganizationDto> {
    if (!data.password) throw new PasswordIsRequiredError();

    const organizationResult = await this.organizationRepository.findByEmail(
      data.email
    );

    if (organizationResult) throw new OrganizationEmailAlreadyExistsError();

    const passwordHash = await hash(data.password, 8);

    const organization = await this.organizationRepository.create({
      name: data.name,
      author_name: data.authorName,
      email: data.email,
      whatsapp: data.whatsapp,
      password: passwordHash,
      cep: data.cep,
      state: data.state,
      city: data.city,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
    });

    return {
      id: organization.id,
      name: organization.name,
      email: organization.email,
      authorName: organization.author_name,
      whatsapp: organization.whatsapp,
      cep: organization.cep,
      state: organization.state,
      city: organization.city,
      address: data.address,
      latitude: Number(organization.latitude),
      longitude: Number(organization.longitude),
    };
  }
}
