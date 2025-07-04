const express = require("express");
const app = express();
const morgan = require("morgan");
const parser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 4000;
const { createServer } = require("vite");
require("dotenv").config();

const isProd = process.env.NODE_ENV === "production";

// Middleware
app.use(morgan("dev"));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Static asset path
app.use("/assets", express.static(path.join(__dirname, "../assets")));

async function startServer() {
  if (!isProd) {
    // 💡 Vite in development (middleware mode)
    const vite = await createServer({
      server: { middlewareMode: "html" },
      appType: "custom",
    });

    // Use Vite's dev middleware
    app.use(vite.middlewares);

    // In dev, manually send index.html using Vite's HTML transform
    app.get("*", async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const html = await vite.transformIndexHtml(url, 
          // Load from the root (Vite expects index.html here)
          require('fs').readFileSync(path.resolve(__dirname, "../index.html"), "utf-8")
        );
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (err) {
        vite.ssrFixStacktrace(err);
        next(err);
      }
    });
  } else {
    // ✅ In production: serve built Vite files
    app.use(express.static(path.join(__dirname, "../dist")));

    // Fallback for SPA
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../dist/index.html"));
    });
  }

  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

startServer();
