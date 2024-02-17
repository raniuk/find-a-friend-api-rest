export class OrganizationDto {
  readonly id?: string;
  password?: string;

  constructor(
    id: string,
    readonly name: string,
    readonly email: string,
    password: string,
    readonly authorName: string,
    readonly whatsapp: string,
    readonly cep: string,
    readonly state: string,
    readonly city: string,
    readonly address: string,

    readonly latitude: number,
    readonly longitude: number
  ) {
    this.id = id;
    this.password = password;
  }
}
