const fs = require("fs");
const path = require("path");
const prompt = require("prompt-sync")({ sigint: true });
const { spawnSync } = require("child_process");

// Load sites
const sites = JSON.parse(
  fs.readFileSync("./mongo/test2.sites.json", "utf8")
);

// Get regions
const regions = [
  ...new Set(
    sites
      .map(s => s.region?.trim())
      .filter(r => r && r !== ".")
  )
].sort();

// ======================
// REGION SELECT
// ======================
console.log("\nAvailable Regions:");
regions.forEach((r, i) => {
  console.log(`${i + 1}. ${r}`);
});

const regionChoice = Number(prompt("\nSelect Region: "));
const selectedRegion = regions[regionChoice - 1];

if (!selectedRegion) {
  console.log("Invalid region.");
  process.exit(1);
}

// ======================
// SITE SELECT
// ======================
const regionSites = sites.filter(
  s => s.region?.trim() === selectedRegion
);

console.log(`\nSites in ${selectedRegion}:`);
regionSites.forEach((s, i) => {
  console.log(`${i + 1}. ${s.siteName}`);
});

const siteChoice = Number(prompt("\nSelect Site: "));
const selectedSite = regionSites[siteChoice - 1];

if (!selectedSite) {
  console.log("Invalid site.");
  process.exit(1);
}

// ======================
// SCRIPT SELECT (NEW)
// ======================

// region code = first part before space OR full folder name
const regionCode = selectedRegion.split(" ")[0];

// scripts folder per region
const scriptFolder = path.join(__dirname, "scripts");

// get scripts
const scripts = fs
  .readdirSync(scriptFolder)
  .filter(f => f.endsWith(".js"));

if (scripts.length === 0) {
  console.log("No scripts available.");
  process.exit(1);
}

console.log("\nAvailable Scripts:");
scripts.forEach((s, i) => {
  console.log(`${i + 1}. ${s}`);
});

const scriptChoice = Number(prompt("\nSelect Script: "));
const selectedScript = scripts[scriptChoice - 1];

if (!selectedScript) {
  console.log("Invalid script selection.");
  process.exit(1);
}

// ======================
// EXECUTE SELECTED SCRIPT
// ======================

const scriptPath = path.join(scriptFolder, selectedScript);

console.log("\nSelected Site:");
console.log(selectedSite);

console.log("\nRunning Script:", selectedScript);

spawnSync(
  "node",
  [scriptPath, JSON.stringify(selectedSite)],
  { stdio: "inherit" }
);