export class PasswordIsRequiredError extends Error {
  constructor() {
    super("Password is required");
  }
}
