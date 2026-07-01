const fs = require("fs");
const path = require("path");

const scriptsDir = path.join(__dirname, "scripts");

const files = fs.readdirSync(scriptsDir);

files.forEach(file => {
  if (!file.endsWith("r.js")) return;

  const filePath = path.join(scriptsDir, file);

  const source = fs.readFileSync(filePath, "utf8");

  const outputName = file.replace("r.js", ".js");

  const outputPath = path.join(scriptsDir, outputName);

  fs.writeFileSync(outputPath, source, "utf8");

  console.log(`✓ ${file} -> ${outputName}`);
});

// files.forEach(file => {
//   if (file.endsWith("r.js")) return;

//   const filePath = path.join(scriptsDir, file);
//   fs.unlinkSync(filePath)

//   console.log(`❌ ${file} -> deleted`);
// });
