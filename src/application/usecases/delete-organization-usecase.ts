import { OrganizationRepository } from "@/domain/ports/driven/organization-repository";
import { DeleteOrganization } from "@/domain/ports/driver/delete-organization";

import { OrganizationNotFoundError } from "../errors/organization-not-found-error";

export class DeleteOrganizationUseCase implements DeleteOrganization {
  constructor(private organizationRepository: OrganizationRepository) {}

  async delete(id: string): Promise<void> {
    const organizationResult = await this.organizationRepository.findById(id);

    if (!organizationResult) throw new OrganizationNotFoundError();

    await this.organizationRepository.delete(id);
  }
}
