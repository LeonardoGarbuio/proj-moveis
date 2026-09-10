import { test, expect } from "@playwright/test";
import { buildChecklist, buildMessage } from "../src/contact";

test("Priorities and comparison questions reach the final message without inventing unchecked answers", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page
    .getByRole("button", { name: "Explorar ferragens", exact: true })
    .click();
  await expect(page.locator(".detail-body h3")).toHaveText(
    "Você vai usar muito mais do que fotografar.",
  );
  await page
    .getByRole("button", { name: "Isso importa no meu projeto", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Adicionado às minhas prioridades" }),
  ).toHaveAttribute("aria-pressed", "true");
  const material = page
    .locator(".quote-row")
    .filter({ hasText: "Materiais e espessuras" });
  await material.getByRole("button", { name: "Quero confirmar" }).click();
  const fittings = page
    .locator(".quote-row")
    .filter({ hasText: "Ferragens e mecanismos" });
  await fittings.getByRole("button", { name: "Está claro" }).click();
  await expect(page.locator(".review-count strong")).toHaveText("02");
  await expect(page.locator(".quote-result h3")).toHaveText(
    "1 ponto para esclarecer.",
  );
  await page.getByRole("button", { name: "Copiar meu roteiro" }).click();
  const checklist = await page.evaluate(() => navigator.clipboard.readText());
  expect(checklist).toContain("QUERO CONFIRMAR — Materiais e espessuras");
  expect(checklist).toContain("AINDA NÃO REVI — Instalação e pós-venda");
  await page.locator("#seu-projeto").scrollIntoViewIfNeeded();
  await expect(page.locator(".personal-brief")).toContainText(
    "Ter praticidade ao abrir portas e gavetas",
  );
  await page.getByRole("button", { name: "Cozinha", exact: true }).click();
  await page.getByLabel("Em qual cidade?").fill("Flores da Cunha, RS");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByRole("button", { name: "Ver minha mensagem" }).click();
  const message = await page.getByLabel("Mensagem para copiar").inputValue();
  expect(message).toContain(
    "O que é importante para mim:\n• Ter praticidade ao abrir portas e gavetas",
  );
  expect(message).toContain("Quais materiais e espessuras estão previstos");
  expect(message).toContain(
    "Itens que marquei como claros na minha comparação: Ferragens e mecanismos",
  );
  expect(message).not.toContain("A proposta inclui instalação");
  await page
    .getByRole("button", {
      name: "Remover prioridade: Ter praticidade ao abrir portas e gavetas",
    })
    .click();
  await expect(page.getByLabel("Mensagem para copiar")).not.toContainText(
    "O que é importante para mim:",
  );
});

test("Checklist is usable with keyboard and every response stays editable", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const first = page.locator(".quote-row").first();
  const confirm = first.getByRole("button", { name: "Quero confirmar" });
  await confirm.focus();
  await page.keyboard.press("Enter");
  await expect(confirm).toHaveAttribute("aria-pressed", "true");
  await first.getByRole("button", { name: "Está claro" }).click();
  await expect(confirm).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator(".quote-result h3")).toHaveText(
    "Bom começo. Continue conferindo.",
  );
});

test("Clipboard fallback presents a selectable full checklist", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("Unavailable")) },
      configurable: true,
    }),
  );
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Copiar meu roteiro" }).click();
  await expect(page.getByLabel("Roteiro para copiar")).toBeVisible();
  await expect(page.getByLabel("Roteiro para copiar")).toContainText(
    "MEU ROTEIRO PARA COMPARAR",
  );
});

test("A complete self-check never certifies supplier quality", () => {
  const text = buildChecklist({
    material: "clear",
    projeto: "clear",
    ferragens: "clear",
    acabamento: "clear",
    montagem: "clear",
  });
  expect(text).toContain("não avalia fornecedores nem certifica");
  const message = buildMessage(
    {
      environment: "Sala",
      city: "Caxias do Sul",
      measures: "Ainda não sei",
      blueprint: "Ainda não sei",
      timing: "Ainda não sei",
      budget: "",
    },
    { priorities: [], checks: {} },
  );
  expect(message).not.toContain("Quero esclarecer antes de comparar propostas");
  expect(message).not.toContain("Itens que marquei como claros");
});
