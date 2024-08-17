const fs = require("fs")
const path = require("path")

const directoryPath = path.join(__dirname, "public/data/games")

const manifestPath = path.join(__dirname, "public")

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error accessing the directory:", err)
    return
  }

  const manifest = "file_name\n" + files.join("\n")

  fs.writeFile(path.join(manifestPath, "manifest.csv"), manifest, (error) => {
    if (error) {
      console.error("Error writing the manifest file:", error)
      return
    }
    console.log("File manifest has been created successfully.")
  })
})
