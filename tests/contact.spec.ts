import { test, expect } from "@playwright/test";
import { buildMessage, whatsappLink } from "../src/contact";
test("Contact URL preserves accents, line breaks and optional investment", () => {
  const message = buildMessage({
    environment: "Cozinha",
    city: "  São José, SC  ",
    measures: "Ainda não sei",
    blueprint: "Tenho referências ou imagem de IA",
    timing: "Ainda não sei",
    budget: "",
  });
  const url = new URL(whatsappLink("+55 (11) 99999-0000", message));
  expect(url.origin).toBe("https://wa.me");
  expect(url.pathname).toBe("/5511999990000");
  expect(url.searchParams.get("text")).toBe(message);
  expect(message).toContain("Cidade: São José, SC\n");
  expect(message).toContain("Prefiro conversar sobre isso");
  expect(whatsappLink("", message)).toBe("");
  expect(whatsappLink("123", message)).toBe("");
});
