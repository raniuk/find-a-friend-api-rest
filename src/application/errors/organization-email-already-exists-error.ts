export class OrganizationEmailAlreadyExistsError extends Error {
  constructor() {
    super("Organization email already exists");
  }
}
