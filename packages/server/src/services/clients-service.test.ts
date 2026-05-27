import { describe, it, expect, vi, beforeEach } from "vitest";
import { ClientsService } from "./clients-service";

const mockRepository = {
  findByCpf: vi.fn(),
  insert: vi.fn(),
};

const service = new ClientsService(mockRepository);

describe("ClientsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("create", () => {
    it("should create a client successfully", async () => {
      mockRepository.findByCpf.mockResolvedValue(null);
      mockRepository.insert.mockResolvedValue({ id: 1 });

      const client = {
        name: "John Doe",
        cpf: "12345678901",
        email: "john@email.com",
        favoriteColorId: 1,
        observations: "test",
      };

      const result = await service.create(client);
      expect(result).toEqual({ id: 1 });
      expect(mockRepository.findByCpf).toHaveBeenCalledWith({
        cpf: client.cpf,
      });
    });

    it("should throw if CPF already exists", async () => {
      mockRepository.findByCpf.mockResolvedValue({ id: 1, cpf: "12345678901" });

      const client = {
        name: "John Doe",
        cpf: "12345678901",
        email: "john@email.com",
        favoriteColorId: 1,
      };

      await expect(service.create(client)).rejects.toThrow(
        "CPF already exists",
      );
    });

    it("should throw on invalid data", async () => {
      const invalidClient = {
        name: "",
        cpf: "123",
        email: "not-an-email",
        favoriteColorId: 1,
      };

      await expect(service.create(invalidClient)).rejects.toThrow();
    });
  });
});
