const express = require("express");
const fs = require("fs-extra");

const app = express();
const PORT = 3000;
const outputDir = "./static/output/";
fs.ensureDirSync(outputDir);

app.get("/api/listImages", (req, res) => {
	const images = fs.readdirSync("./static/images/");
	res.setHeader('Content-Type', 'application/json');
	res.json(images);
});

app.get("/api/label", (req, res) => {
	const label = req.query.label;
	const image = req.query.image;

	fs.ensureDirSync(outputDir + label);
	fs.moveSync(`./static/images/${image}`, `${outputDir}${label}/${image}`);

	res.setHeader('Content-Type', 'application/json');
	res.json({ "success": true });
});

app.get("/api/undo", (req, res) => {
	const label = req.query.label;
	const image = req.query.image;

	fs.moveSync(`${outputDir}${label}/${image}`, `./static/images/${image}`);

	res.setHeader('Content-Type', 'application/json');
	res.json({ "success": true });
});

app.use(express.static("static"));
app.listen(PORT);

console.log(`Running on port ${PORT}!`);