import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ClientForm } from "./client-form";
import { Toaster } from "sonner";

const fetchSpy = vi.spyOn(globalThis, "fetch");

interface ColorSelectorProps {
  value?: number;
  onChange: (id: number) => void;
  error?: string;
}

vi.mock("./color-selector", () => ({
  ColorSelector: ({ onChange, error }: ColorSelectorProps) => (
    <div data-testid="color-selector">
      <button
        type="button"
        data-testid="color-option-1"
        onClick={() => onChange(1)}
      >
        Vermelho
      </button>
      <button
        type="button"
        data-testid="color-option-2"
        onClick={() => onChange(2)}
      >
        Laranja
      </button>
      {error && <span data-testid="color-error">{error}</span>}
    </div>
  ),
}));

function renderForm() {
  return render(
    <>
      <ClientForm />
      <Toaster />
    </>,
  );
}

describe("ClientForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all form fields", () => {
    renderForm();

    expect(
      screen.getByPlaceholderText("Ex: João da Silva"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("000.000.000-00")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("joaosilva@email.com"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("color-selector")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("...")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
    expect(screen.getByText("Limpar")).toBeInTheDocument();
  });

  it("should show validation errors on empty submit", async () => {
    renderForm();

    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(
        screen.getByText("Nome deve ter mais que 3 caracteres."),
      ).toBeInTheDocument();
    });
  });

  it("should apply CPF mask while typing", () => {
    renderForm();

    const cpfInput = screen.getByPlaceholderText("000.000.000-00");
    fireEvent.change(cpfInput, { target: { value: "12345678901" } });

    expect(cpfInput).toHaveValue("123.456.789-01");
  });

  it("should submit successfully with valid data", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1 }),
    } as Response);

    renderForm();

    fireEvent.change(screen.getByPlaceholderText("Ex: João da Silva"), {
      target: { value: "João da Silva" },
    });
    fireEvent.change(screen.getByPlaceholderText("000.000.000-00"), {
      target: { value: "12345678901" },
    });
    fireEvent.change(screen.getByPlaceholderText("joaosilva@email.com"), {
      target: { value: "joao@email.com" },
    });
    fireEvent.click(screen.getByTestId("color-option-1"));
    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        "http://localhost:3001/v1/clients",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      );
    });
  });

  it("should show error when CPF already exists", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: async () => ({ message: "CPF already exists" }),
    } as Response);

    renderForm();

    fireEvent.change(screen.getByPlaceholderText("Ex: João da Silva"), {
      target: { value: "João da Silva" },
    });
    fireEvent.change(screen.getByPlaceholderText("000.000.000-00"), {
      target: { value: "12345678901" },
    });
    fireEvent.change(screen.getByPlaceholderText("joaosilva@email.com"), {
      target: { value: "joao@email.com" },
    });
    fireEvent.click(screen.getByTestId("color-option-1"));
    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(screen.getByText("CPF já está em uso")).toBeInTheDocument();
    });
  });

  it("should show error when email already exists", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: async () => ({ message: "Email already exists" }),
    } as Response);

    renderForm();

    fireEvent.change(screen.getByPlaceholderText("Ex: João da Silva"), {
      target: { value: "João da Silva" },
    });
    fireEvent.change(screen.getByPlaceholderText("000.000.000-00"), {
      target: { value: "12345678901" },
    });
    fireEvent.change(screen.getByPlaceholderText("joaosilva@email.com"), {
      target: { value: "joao@email.com" },
    });
    fireEvent.click(screen.getByTestId("color-option-1"));
    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(screen.getByText("E-mail já está em uso")).toBeInTheDocument();
    });
  });

  it("should reset form when clicking Limpar", async () => {
    renderForm();

    const nameInput = screen.getByPlaceholderText("Ex: João da Silva");
    fireEvent.change(nameInput, { target: { value: "Teste" } });

    fireEvent.click(screen.getByText("Limpar"));

    await waitFor(() => {
      expect(nameInput).toHaveValue("");
    });
  });
});
