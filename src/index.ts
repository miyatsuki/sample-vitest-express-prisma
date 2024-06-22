import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("hello express\n");
});

app.get("/users", async (req, res) => {
	const users = await prisma.user.findMany();
	res.json({ users });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`REST API server ready at: http://localhost:${PORT}`);
});

export default app;