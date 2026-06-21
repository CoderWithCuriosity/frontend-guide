const fs = require("fs");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");

const scriptsDir = path.join(__dirname, "scripts");

const files = fs.readdirSync(scriptsDir);

files.forEach(file => {
  if (!file.endsWith("r.js")) return;

  const filePath = path.join(scriptsDir, file);

  const source = fs.readFileSync(filePath, "utf8");

  const obfuscated = JavaScriptObfuscator.obfuscate(source, {
    compact: true,

    controlFlowFlattening: true,
    deadCodeInjection: true,

    // strings protection (good balance)
    stringArray: true,
    stringArrayEncoding: ["base64"],
    stringArrayThreshold: 0.6,

    // naming
    identifierNamesGenerator: "hexadecimal",

    // keep output stable & safe
    disableConsoleOutput: true
  });

  const outputName = file.replace("r.js", ".js");

  const outputPath = path.join(scriptsDir, outputName);

  fs.writeFileSync(outputPath, obfuscated.getObfuscatedCode(), "utf8");

  console.log(`✓ ${file} -> ${outputName}`);
});
