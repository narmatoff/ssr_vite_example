import fs from "node:fs/promises";
import express from "express";
import compression from "compression";

(async () => {
  // окружение
  const isProduction: boolean = true; // определяем окружение
  const port: number = 3000;
  const base: string = "/";

  // забираем html в landingHtml
  let landingHtml: string = "";
  if (isProduction) {
    landingHtml = await fs.readFile("./dist/client/index.html", "utf-8");
  }

  const app = express();

  let vite;

  if (!isProduction) {
    const { createServer } = await import("vite");
    vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom",
      base,
    });
    app.use(vite.middlewares);
  } else {
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(base, sirv("./dist/client", { extensions: [] }));
  }

  // обрабатываем все маршруты
  app.use(/.*/, async (req, res) => {
    try {
      const url: string = req.originalUrl.replace(base, "");

      let htmlTemplate: string;
      let render: (url: string) => Promise<{ head?: string; html?: string }>;

      if (!isProduction) {
        htmlTemplate = await fs.readFile("./index.html", "utf-8");
        htmlTemplate = await vite!.transformIndexHtml(url, htmlTemplate);
        render = (await vite!.ssrLoadModule("./src/entry-server.ts")).render;
      } else {
        landingHtml = await fs.readFile("./dist/client/index.html", "utf-8");
        htmlTemplate = landingHtml;
        render = (await import("./dist/server/entry-server.js")).render;
      }

      const rendered = await render(url);

      // собираем шаблон и отдаем клиенту
      const html: string = htmlTemplate
        .replace(`<!--app-head-->`, rendered.head ?? "")
        .replace(`<!--app-html-->`, rendered.html ?? "");

      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e as Error);
      console.error((e as Error).stack);
      res.status(500).end((e as Error).stack);
    }
  });

  // Start http server
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
})();
