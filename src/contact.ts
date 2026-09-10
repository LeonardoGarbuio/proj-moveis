export type Answers = { environment: string; city: string; measures: string; blueprint: string; timing: string; budget: string };
export function buildMessage(a: Answers) {
  return `Olá! Quero conversar sobre meu projeto de móveis planejados.\n\nAmbiente: ${a.environment}\nCidade: ${a.city.trim()}\nMedidas: ${a.measures}\nProjeto/planta: ${a.blueprint}\nPrevisão: ${a.timing}\nInvestimento aproximado: ${a.budget.trim() || 'Prefiro conversar sobre isso'}\n\nPosso compartilhar fotos e referências por aqui.`;
}
export function whatsappLink(number: string, message: string) {
  const digits = number.replace(/\D/g, '');
  return /^\d{10,15}$/.test(digits) ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : '';
}
