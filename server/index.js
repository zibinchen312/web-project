import express from "express";
import morgan from "morgan";
import parser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "vite";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === "production";

app.use(morgan("dev"));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
// app.use("/assets", express.static(path.join(__dirname, "../assets")));

if (!isProd) {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);

  app.get("/*splat", async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const html = await vite.transformIndexHtml(
        url,
        fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8")
      );
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err) {
      vite.ssrFixStacktrace(err);
      next(err);
    }
  });
} else {
  app.use(express.static(path.join(__dirname, "../dist")));

  app.get("/", async (req, res, next) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });

  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });
}

app.listen(port, () => console.log(`Server listening on port ${port}`));
