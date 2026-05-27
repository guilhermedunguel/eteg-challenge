import { ClientForm } from "./components/ui/client-form";

export default function App() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:flex md:sticky md:top-0 md:h-screen flex-2 items-center justify-center bg-blue-950 bg-[url('/etag-background.webp')] bg-center">
        <img
          className="w-46"
          src="/eteg-logo.svg"
          alt="Logo da Eteg escrita em branco, 'technology aparece escrito abaixo.'"
        />
      </div>
      <aside className="flex flex-1 flex-col items-center justify-between gap-6 px-6 py-8">
        <ClientForm />
        <span className="text-sm text-neutral-600">
          feito com 💙 por{" "}
          <a
            className="underline text-blue-600"
            href="https://guilhermedunguel.com/"
            target="_blank"
          >
            Guilherme Dunguel
          </a>
        </span>
      </aside>
    </main>
  );
}
