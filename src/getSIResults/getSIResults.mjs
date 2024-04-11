// run: node getSIResults.mjs
// loops through all classes and donwloads results data
// creates CSV for import to Arbor

import fetch from "node-fetch"
import fs from "fs"

const outputFilePath = "results.csv"

// paste list of classes here from getH3
const classes = "M21E"

// index number gets added on in read loop
const urlbase = "https://www.sportident.co.uk/results/JK/2024/Day1/index_"

const classList = classes.split(",")

let runners = []

async function getClass(url, c, urlbase) {
  await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.text()
    })
    .then((data) => {
      // Assuming the fetched data is in a valid JSON format
      try {
        const jsonData = JSON.parse(data)

        jsonData.data.forEach((row) => {
          let runner = {}
          // just take digits from position field
          // converts 1st to 1 and covers various dsq/mp possibilities
          runner.position = row[0].replace(/\D/g, "")
          if (runner.position === "") {
            runner.position = 999
          }
          // strip HTML from mp/dsq/Strava links etc
          runner.name = row[3].replace(/<[^>]+>|&[^;]+;/g, "")
          runner.time = row[7].replace(/<[^>]+>|&[^;]+;/g, "")
          runner.club = row[4].replace(/<[^>]+>|&[^;]+;/g, "")
          runner.class = c
          runners.push(runner)
        })
      } catch (parseError) {
        console.error("Error parsing fetched data as JSON:", parseError)
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error)
    })
}

let index = -1
for (let c of classList) {
  index = index + 1
  const url = urlbase + index.toString() + ".txt"
  await getClass(url, c)
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
