import z from "zod";
import { Input } from "../primitives/input";
import { TextArea } from "../primitives/text-area";
import { Button } from "../primitives/button";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cpfApplyMask } from "../../utils/masks";
import { Suspense } from "react";
import { ColorSelector } from "./color-selector";
import { ErrorBoundary } from "./error-boundary";

const createClientFormSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter mais que 3 caracteres.")
    .max(255, "Nome deve ter menos que 255 caracteres."),
  cpf: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .pipe(z.string().length(11, "CPF deve ter 11 caracteres.")),
  email: z.email("Insira um e-mail válido."),
  color: z.number("Escolha uma cor."),
  obs: z
    .string()
    .max(1000, "Descrição deve ter menos que 1000 caracteres.")
    .optional(),
});

type createClientFormData = z.infer<typeof createClientFormSchema>;

export function ClientForm() {
  const { register, handleSubmit, setValue, control, formState } =
    useForm<createClientFormData>({
      resolver: zodResolver(createClientFormSchema),
      mode: "onChange",
    });

  const selectedColor = useWatch({ control, name: "color" });

  async function onSubmit(data: createClientFormData) {
    console.log(data);
  }

  return (
    <form
      className="flex w-full flex-col gap-8"
      onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
    >
      <header className="flex flex-col">
        <h1 className="text-neutral-700 font-medium text-2xl">
          Cadastro de cliente
        </h1>
        <h2 className="text-neutral-500 text-lg">
          Preencha o formulário abaixo para cadastrar clientes.
        </h2>
      </header>
      <div className="flex w-full flex-col gap-6">
        <Input
          label="Nome completo"
          required
          max={255}
          min={3}
          placeholder="Ex: João da Silva"
          error={formState.errors.name?.message}
          {...register("name")}
        />
        <Input
          label="CPF"
          required
          maxLength={14}
          placeholder="000.000.000-00"
          error={formState.errors.cpf?.message}
          {...register("cpf", {
            onChange: (e) => {
              const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
              e.target.value = cpfApplyMask(raw);
            },
          })}
        />
        <Input
          label="E-mail"
          required
          max={255}
          placeholder="joaosilva@email.com"
          error={formState.errors.email?.message}
          {...register("email")}
        />
        <ErrorBoundary
          fallback={
            <p className="text-sm text-red-500">Erro ao carregar cores.</p>
          }
        >
          <Suspense
            fallback={
              <p className="text-sm text-gray-400">Carregando cores...</p>
            }
          >
            <ColorSelector
              value={selectedColor}
              onChange={(id) =>
                setValue("color", id, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={formState.errors.color?.message}
            />
          </Suspense>
        </ErrorBoundary>
        <TextArea
          label="Observações"
          placeholder="..."
          maxLength={1000}
          {...register("obs")}
        />
        <div className="flex flex-row gap-2">
          <Button
            type="button"
            disabled={!formState.isDirty}
            variant="secondary"
          >
            Limpar
          </Button>
          <Button type="submit">Cadastrar</Button>
        </div>
      </div>
    </form>
  );
}
