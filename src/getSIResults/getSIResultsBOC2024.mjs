// run: node getSIResults.mjs
// loops through all classes and donwloads results data
// this version assumes all results are in getData function included as script in HTML
// creates CSV for import to Arbor

import fetch from "node-fetch"
import fs from "fs"

const outputFilePath = "results.csv"

// paste list of classes here from getH3
const classes =
  "M10A, M10B,M12A,M12B,M14A,M14B,M16A,M16B,M18E,M18L,M18S,M20E,M20L,M20S,M21E,M21L,M21S,M21V,M35L,M35S,M40L,M40S,M45L,M45S,M50L,M50S,M55L,M55S,M60L,M60S,M65L,M65S,M70L,M70S,M75L,M75S,M80,M85,M90,M95,W10A,W10B,W12A,W12B,W14A,W14B,W16A,W16B,W18E,W18L,W18S,W20E,W20L,W20S,W21E,W21L,W21S,W21V,W35L,W35S,W40L,W40S,W45L,W45S,W50L,W50S,W55L,W55S,W60L,W60S,W65L,W65S,W70L,W70S,W75,W80,W85,W90,W95,'Light Green',Orange,Yellow,White"

// index number gets added on in read loop
const urlbase =
  "https://www.mdoc.org.uk/results-archive/2024/2024-04-13-BOC_2024/index.html"

const classList = classes.split(",")

let runners = []

function getClass(url, c, index) {
  let data = getData(index)
data.forEach((row) => {
          let runner = {}
          // just take digits from position field
          // converts 1st to 1 and covers various dsq/mp possibilities
          runner.position = row[0].replace(/\D/g, "")
          if (runner.position === "") {
            runner.position = 999
          }
          // strip HTML from mp/dsq/Strava links etc
          runner.name = row[3].replace(/<[^>]+>|&[^;]+;/g, "")
          runner.time = row[6].replace(/<[^>]+>|&[^;]+;/g, "")
          runner.club = row[4].replace(/<[^>]+>|&[^;]+;/g, "")
          runner.class = c
          runners.push(runner)
        })
  }

let index = -1
for (let c of classList) {
  index = index + 1
  const url = urlbase + index.toString() + ".txt"
  getClass(url, c, index)
}

let text = ""
for (let row of runners) {
  text +=
    row.position +
    "," +
    row.name +
    "," +
    row.club +
    "," +
    row.class +
    "," +
    row.time +
    "\n"
}

fs.writeFile(outputFilePath, text, (err) => {
  if (err) {
    console.error("Error writing to file:", err)
  } else {
    console.log(`Result saved as ${outputFilePath}`)
  }
})

// paste in function getData(tableNumber) from script in <head> here