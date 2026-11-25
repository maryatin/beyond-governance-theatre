import http from "node:http";
import { INDICATORS, evaluateOrganizationHealth } from "../../packages/rubric-engine/src/index.js";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "GET" && req.url === "/api/indicators") {
    res.writeHead(200);
    return res.end(JSON.stringify({ count: INDICATORS.length, indicators: INDICATORS }));
  }

  if (req.method === "POST" && (req.url === "/api/audit" || req.url === "/api/github-webhook")) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const payload = body ? JSON.parse(body) : {};
      const report = evaluateOrganizationHealth(payload);
      const prGatePassed = !report.isGovernanceTheatre && report.healthScore >= 60;
      res.writeHead(200);
      res.end(JSON.stringify({ status: "ok", prGatePassed, report }));
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(4000, () => console.log("BGT RegTech API running on http://localhost:4000"));
