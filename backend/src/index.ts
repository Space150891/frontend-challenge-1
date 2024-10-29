import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { parseAndValidateCsvFile } from "./utils/parseAndValidateCsvFile.js";
import * as fs from "fs";
import path from "path";
import { v7 as uuid } from "uuid";
import { formatReports } from "./utils/formatReports.js";
import { cors } from "hono/cors";

const FILES_DIRECTORY = "./uploads";
const checkOrCreateUploadsDirectory = () => {
  if (!fs.existsSync(FILES_DIRECTORY)) {
    fs.mkdirSync(FILES_DIRECTORY);
  }
};

const app = new Hono();

app.use(cors());

app.get("/", (context) => {
  return context.text("Hello Hono!");
});

app.post("/mrf/upload", async (context) => {
  const formData = await context.req.formData();
  const csvFile = formData.get("file") as File;

  if (!csvFile) {
    throw new HTTPException(400, { message: "File not provided." });
  }

  const { validationError, parsedFile } = await parseAndValidateCsvFile(csvFile);

  if (!parsedFile || validationError) {
    throw new HTTPException(400, { message: validationError || "File validation failed." });
  }

  checkOrCreateUploadsDirectory();

  const formattedJsonFiles = formatReports(parsedFile);
  const writeOperations = formattedJsonFiles.map(async (report) => {
    return await fs.promises.writeFile(path.join(FILES_DIRECTORY, csvFile.name + "_" + uuid() + ".json"), JSON.stringify(report));
  });

  await Promise.all(writeOperations);
  return context.text("Created", 201);
});

app.get("/mrf/list", async (context) => {
  checkOrCreateUploadsDirectory();

  const allFiles = fs.readdirSync(FILES_DIRECTORY);
  const readFilesRequests = allFiles.map(async (filePath) => {
    const content = JSON.parse((await fs.promises.readFile(path.join(FILES_DIRECTORY, filePath))).toString());
    return { name: filePath, content };
  });
  const files = await Promise.all(readFilesRequests);

  console.log({ files });

  return context.json(files);
});

serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
