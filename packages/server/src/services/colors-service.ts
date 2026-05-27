import { IColorsRepository } from "../repositories/colors-repository";

export class ColorsService {
  constructor(private repository: IColorsRepository) {}

  async list() {
    return await this.repository.findAll();
  }
}
