import { test, expect } from "@playwright/test";

for (const width of [360, 390, 430, 1440]) {
  test(`Interior views open, switch and close at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page
      .getByRole("button", { name: "Explorar material", exact: true })
      .click();
    const overlay = page.locator(".interior-overlay");
    await expect(overlay).toHaveClass(/is-ready/);
    await expect(overlay.locator(".interior-render img")).toHaveAttribute(
      "src",
      "/images/interiors/material.jpg",
    );
    await expect(overlay).toContainText("SIMULAÇÃO COM IA");
    await expect(
      page.getByRole("button", { name: "Voltar", exact: true }),
    ).toBeFocused();
    for (const [label, id] of [
      ["Projeto", "projeto"],
      ["Acabamento", "acabamento"],
      ["Ferragens", "ferragens"],
      ["Montagem", "montagem"],
    ]) {
      await page
        .getByRole("button", { name: "Voltar", exact: true })
        .click();
      await page
        .getByRole("button", {
          name: `Explorar ${label.toLowerCase()}`,
          exact: true,
        })
        .click();
      await expect(overlay).toHaveClass(/is-ready/);
      await expect(overlay.locator(".interior-render img")).toHaveAttribute(
        "src",
        `/images/interiors/${id}.jpg`,
      );
      expect(
        await overlay
          .locator(".interior-render img")
          .evaluate((img: HTMLImageElement) => img.naturalWidth),
      ).toBeGreaterThan(0);
    }
    await expect(overlay).toHaveClass(/is-ready/);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page
      .locator(".explorer-visual")
      .screenshot({ path: `test-results/interior-${width}.png` });
    await page
      .getByRole("button", { name: "Voltar", exact: true })
      .click();
    await expect(overlay).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Explorar montagem", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(overlay).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(overlay).toHaveCount(0);
  });
}

test("Missing view can retry and still return to the original", async ({
  page,
}) => {
  let failed = true;
  await page.route("**/images/interiors/material.jpg", (route) =>
    failed ? route.abort() : route.continue(),
  );
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page
    .getByRole("button", { name: "Explorar material", exact: true })
    .click();
  await expect(
    page.locator(".interior-overlay").getByRole("alert"),
  ).toContainText("Não foi possível carregar");
  failed = false;
  await page.getByRole("button", { name: "Tentar novamente" }).click();
  await expect(page.locator(".interior-overlay")).toHaveClass(/is-ready/);
  await page
    .getByRole("button", { name: "Voltar", exact: true })
    .click();
  await expect(page.locator(".interior-overlay")).toHaveCount(0);
});

test("Reduced motion removes the opening animation", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page
    .getByRole("button", { name: "Explorar projeto", exact: true })
    .click();
  await expect(page.locator(".interior-overlay")).toHaveClass(/is-ready/);
  expect(
    await page
      .locator(".interior-render img")
      .evaluate((img) => getComputedStyle(img).animationName),
  ).toBe("none");
});
