const fs = require("fs");
const path = require("path");
const papaparse = require("papaparse");

const directoryPath = path.join(__dirname, "public/data/games");

const manifestPath = path.join(__dirname, "public/cache");

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error accessing the directory:", err);
    return;
  }

  const data = [];
  files.map((file) => {
    const csv = fs.readFileSync(path.join(directoryPath, file), "utf8");
    const parsed = papaparse.parse(csv, { header: true });
    data.push(parsed.data);
  });

  const merged = papaparse.unparse(
    data.flat(1).filter((row) => row["game_id"] !== ""),
  );

  fs.writeFile(path.join(manifestPath, "cache.csv"), merged, (error) => {
    if (error) {
      console.error("Error writing the merged file:", error);
      return;
    }
    console.log("Files have been merged successfully.");
  });
});
