import { Input } from "./components/input";

export default function App() {
  return (
    <form className="">
      <Input label="Nome completo" required placeholder="Ex: João da Silva" />
      <Input label="CPF" required placeholder="000.000.000-00" />
      <Input label="E-mail" required placeholder="000.000.000-00" />
    </form>
  );
}
