// to run: node getH3.js
// extracts Class details from the index page
// assuming classes stay as H3 headings...

const https = require("https")
const fs = require("fs")

const url =
  "https://www.mdoc.org.uk/results-archive/2024/2024-04-13-BOC_2024/index.html"
const outputFilePath = "h3_items.txt"

https
  .get(url, (response) => {
    let data = ""

    response.on("data", (chunk) => {
      data += chunk
    })

    response.on("end", () => {
      // Extract all <h3> items using regular expression
      let h3Items = data.match(/<h3[^>]*>(.*?)<\/h3>/g)

      let list = ""
      h3Items.forEach((h3) => {
        list += h3.replace(/<[^>]+>|&[^;]+;/g, "")
        list += ","
      })

      if (h3Items) {
        fs.writeFile(outputFilePath, h3Items.join("\n"), (err) => {
          if (err) {
            console.error("Error writing to file:", err)
          } else {
            console.log(`H3 items saved to ${outputFilePath}`)
          }
        })
      } else {
        console.error("No <h3> items found in the HTML content.")
      }
    })
  })
  .on("error", (err) => {
    console.error("Error fetching data:", err)
  })
