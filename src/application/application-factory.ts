import { RepositoryFactory } from "@/infrastructure/repositories/repository-factory";

import { AuthenticateOrganizationUseCase } from "./usecases/authenticate-organization-usecase";
import { CreateOrganizationUseCase } from "./usecases/create-organization-usecase";
import { DeleteOrganizationUseCase } from "./usecases/delete-organization-usecase";
import { GetNearbyOrganizationsUseCase } from "./usecases/get-nearby-organization-usecase";

import { CreatePetUseCase } from "./usecases/create-pet-usecase";
import { DeletePetUseCase } from "./usecases/delete-pet-usecase";
import { GetPetUseCase } from "./usecases/get-pet-usecase";
import { SearchPetsUseCase } from "./usecases/search-pets-usecase";

export class ApplicationFactory {
  private static organizationRepository =
    RepositoryFactory.organizationRepository();
  private static petRepository = RepositoryFactory.petRepository();

  public static createPetUseCase() {
    const createPetUseCase = new CreatePetUseCase(
      this.organizationRepository,
      this.petRepository
    );

    return createPetUseCase;
  }

  public static getPetUseCase() {
    const getPetUseCase = new GetPetUseCase(this.petRepository);

    return getPetUseCase;
  }

  public static searchPetUseCase() {
    const searchPetsUseCase = new SearchPetsUseCase(this.petRepository);

    return searchPetsUseCase;
  }

  public static deletePetUseCase() {
    const deletePetUseCase = new DeletePetUseCase(this.petRepository);

    return deletePetUseCase;
  }

  public static createOrganizationUseCase() {
    const createOrganizationUseCase = new CreateOrganizationUseCase(
      this.organizationRepository
    );

    return createOrganizationUseCase;
  }

  public static nearbyOrganizationsUseCase() {
    const nearbyOrganizationsUseCase = new GetNearbyOrganizationsUseCase(
      this.organizationRepository
    );

    return nearbyOrganizationsUseCase;
  }

  public static deleteOrganizationUseCase() {
    const deleteOrganizationUseCase = new DeleteOrganizationUseCase(
      this.organizationRepository
    );

    return deleteOrganizationUseCase;
  }

  public static authOrganizationUseCase() {
    const authOrganizationUseCase = new AuthenticateOrganizationUseCase(
      this.organizationRepository
    );

    return authOrganizationUseCase;
  }
}
