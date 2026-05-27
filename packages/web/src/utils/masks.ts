export function cpfApplyMask(value: string) {
  const raw = value.replace(/\D/g, "").slice(0, 11);
  return raw
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
