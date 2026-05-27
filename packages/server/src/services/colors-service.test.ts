import { it, expect, describe, vi } from "vitest";
import { ColorsService } from "./colors-service";

const mockRepository = {
  findAll: vi.fn(),
};

const service = new ColorsService(mockRepository);

describe("ColorsService", () => {
  it("should return all colors", async () => {
    const colors = [
      { id: 1, name: "Vermelho", hex: "#ef4444" },
      { id: 2, name: "Laranja", hex: "#f97316" },
    ];
    mockRepository.findAll.mockResolvedValue(colors);

    const result = await service.list();
    expect(result).toEqual(colors);
  });
});
