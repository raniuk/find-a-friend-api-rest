export interface DeleteOrganization {
  delete(id: string): Promise<void>;
}
