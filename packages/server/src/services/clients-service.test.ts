import { describe, it, expect, vi, beforeEach } from "vitest";
import { ClientsService } from "./clients-service";

const mockRepository = {
  findByCpf: vi.fn(),
  findById: vi.fn(),
  findAll: vi.fn(),
  insert: vi.fn(),
  remove: vi.fn(),
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

  describe("list", () => {
    it("should return paginated clients", async () => {
      const clients = [{ id: 1, name: "John" }];
      mockRepository.findAll.mockResolvedValue(clients);

      const result = await service.list({ page: 1, limit: 10 });
      expect(result).toEqual(clients);
      expect(mockRepository.findAll).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
    });
  });

  describe("remove", () => {
    it("should remove an existing client", async () => {
      mockRepository.findById.mockResolvedValue({ id: 1 });
      mockRepository.remove.mockResolvedValue(1);

      const result = await service.remove({ id: 1 });
      expect(result).toBe(1);
    });

    it("should throw if client not found", async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.remove({ id: 999 })).rejects.toThrow(
        "Client not found",
      );
    });
  });
});
