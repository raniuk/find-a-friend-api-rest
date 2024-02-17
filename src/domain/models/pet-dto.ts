export class PetDto {
  id?: string;
  available?: boolean;

  constructor(
    id: string,
    readonly name: string,
    readonly age: string,
    readonly size: string,
    readonly about: string,
    readonly energyLevel: string,
    readonly independenceLevel: string,
    readonly environment: string,
    readonly image: string,
    available: boolean,
    readonly organizationId: string
  ) {
    this.id = id;
    this.available = available;
  }
}
