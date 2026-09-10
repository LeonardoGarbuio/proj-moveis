import { details, quoteItems, type QuoteChecks } from "./config";
export type Answers = {
  environment: string;
  city: string;
  measures: string;
  blueprint: string;
  timing: string;
  budget: string;
};
export type ValueBrief = { priorities: string[]; checks: QuoteChecks };
export function buildMessage(
  a: Answers,
  brief: ValueBrief = { priorities: [], checks: {} },
) {
  const priorities = brief.priorities.length
    ? `\n\n*O que é importante para mim:*\n${brief.priorities.map((p) => `- ${p}`).join("\n")}`
    : "";
  const pending = quoteItems.filter(
    (item) => brief.checks[item.id] === "confirm",
  );
  const clear = quoteItems.filter((item) => brief.checks[item.id] === "clear");
  const questions = pending.length
    ? `\n\n*Quero esclarecer antes de comparar propostas:*\n${pending.map((item) => `- ${details.find((d) => d.id === item.id)!.question}`).join("\n")}`
    : "";
  const checked = clear.length
    ? `\n\n*Itens que marquei como claros:* ${clear.map((i) => i.title).join("; ")}.`
    : "";
  return `Olá! Vim pelo site da *Proj'Móveis* e quero entender as escolhas para o meu projeto de móveis sob medida.\n\n*Ambiente:* ${a.environment}\n*Cidade:* ${a.city.trim()}\n*Medidas:* ${a.measures}\n*Projeto/planta:* ${a.blueprint}\n*Previsão:* ${a.timing}\n*Investimento:* ${a.budget.trim() || "Prefiro conversar sobre isso"}${priorities}${questions}${checked}\n\nPosso compartilhar fotos e referências por aqui.`;
}
export function buildChecklist(checks: QuoteChecks) {
  return `MEU ROTEIRO PARA COMPARAR MÓVEIS SOB MEDIDA\n\n${quoteItems
    .map((item) => {
      const state = checks[item.id];
      return `${state === "clear" ? "CLARO NA MINHA PROPOSTA" : state === "confirm" ? "QUERO CONFIRMAR" : "AINDA NÃO REVI"} — ${item.title}\n${details.find((d) => d.id === item.id)!.question}`;
    })
    .join(
      "\n\n",
    )}\n\nCompare especificações e serviços junto com o valor final. Este roteiro não avalia fornecedores nem certifica a qualidade de uma proposta.`;
}
export function whatsappLink(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  return /^\d{10,15}$/.test(digits)
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : "";
}
