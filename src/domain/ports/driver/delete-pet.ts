export interface DeletePet {
  delete(id: string): Promise<void>;
}
