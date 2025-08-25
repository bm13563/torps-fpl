const fs = require("fs")
const path = require("path")
const papaparse = require("papaparse")

const PLAYERS_BASE = {
  "Points": 0, 
  "Minutes Played": 0, 
  "MOTM Votes": 0, 
  "Goals": 0, 
  "Assists": 0, 
  "Clean Sheet": 0, 
  "Yellow Cards": 0, 
  "Red Cards": 0, 
  "Own Goals": 0, 
  "Penalty Saves": 0, 
  "Wins": 0, 
  "Draws": 0, 
  "Losses": 0, 
  "GW Points": 0,
}

const TEAMS_BASE = {
  "rank": "",
  "name": "",
  "owner": "",
  "GW Points": 0,
  "Total Points": 0,
}

const transpose = (a) => {
  return Object.keys(a[0]).map(function(c) {
      return a.map(function(r) { return r[c]; });
  });
}

const getPath = (relativePath) => {
  return path.join(__dirname, relativePath)
}

const buildPlayerDataFromSource = (sourcePath, outputName) => {
  const playersCsv = fs.readFileSync(getPath(`${sourcePath}/players.csv`), "utf8")
  const playersParsed = papaparse.parse(playersCsv, { header: true, delimiter: "," })

  let data = []
  
  // Check if player_scores.csv exists (for 24/25 season)
  const scoresPath = getPath(`${sourcePath}/player_scores.csv`)
  if (fs.existsSync(scoresPath)) {
    const snapshot = fs.readFileSync(scoresPath, "utf8")
    const snapshotParsed = papaparse.parse(snapshot, { header: false, delimiter: "	" })

    const transposed = transpose(snapshotParsed.data)
    const headers = transposed.shift();
    const res = transposed.map(row => row.reduce((acc, col, ind) => {acc[headers[ind]] = col; return acc}, {}))

    playersParsed.data.forEach((player) => {
      const found = res.find((snap) => snap.Player === player.player)
      if (found) {
        data.push({ ...player, ...PLAYERS_BASE, ...found, games: parseInt(found.Wins) + parseInt(found.Losses) + parseInt(found.Draws) })
      } else {
        data.push({ ...player, ...PLAYERS_BASE })
      }
    })
  } else {
    // For 25/26 season - no scores yet, everyone starts at 0
    playersParsed.data.forEach((player) => {
      data.push({ ...player, ...PLAYERS_BASE })
    })
  }

  data.sort((a, b) => {
    if (a['Points'] === b['Points']) {
      return a.player.localeCompare(b.player)
    }
    return b['Points'] - a['Points']
  })

  fs.writeFileSync(getPath(`public/${outputName}_render_players.json`), JSON.stringify(data))
}

const buildTeamDataFromSource = (sourcePath, outputName) => {
  const teamsCsv = fs.readFileSync(getPath(`${sourcePath}/teams.csv`), "utf8")
  const teamsParsed = papaparse.parse(teamsCsv, { header: true, delimiter: "," })

  let data = []
  
  // Check if the CSV file is empty or has no valid data
  if (!teamsParsed.data || teamsParsed.data.length === 0 || 
      (teamsParsed.data.length === 1 && !teamsParsed.data[0].name)) {
    // Return empty array for empty teams file
    fs.writeFileSync(getPath(`public/${outputName}_render_teams.json`), JSON.stringify([]))
    return
  }
  
  // Check if team_scores.csv exists (for 24/25 season)
  const scoresPath = getPath(`${sourcePath}/team_scores.csv`)
  if (fs.existsSync(scoresPath)) {
    const snapshot = fs.readFileSync(scoresPath, "utf8")
    const snapshotParsed = papaparse.parse(snapshot, { header: true, delimiter: "	" })

    teamsParsed.data.forEach((team) => {
      const found = snapshotParsed.data.find((snap) => snap['Team Owner'] === team.owner)
      if (found) {
        data.push({ ...team, ...found })
      } else {
        data.push({ ...team, ...TEAMS_BASE })
      }
    })
  } else {
    // For 25/26 season - no scores yet, everyone starts at 0
    teamsParsed.data.forEach((team) => {
      data.push({ ...team, ...TEAMS_BASE })
    })
  }

  data.sort((a, b) => {
    if (a['Total Points'] === b['Total Points']) {
      return a.owner.localeCompare(b.owner)
    }
    return b['Total Points'] - a['Total Points']
  })

  data.forEach((team, index) => {
    team.rank = index + 1
  })

  fs.writeFileSync(getPath(`public/${outputName}_render_teams.json`), JSON.stringify(data))
}

const copyPlayerPickerFile = (sourcePath) => {
  const playerPickerPath = getPath(`${sourcePath}/player_picker.csv`)
  if (fs.existsSync(playerPickerPath)) {
    const playerPickerData = fs.readFileSync(playerPickerPath, "utf8")
    fs.writeFileSync(getPath(`public/player_picker.csv`), playerPickerData)
    console.log('Copied player_picker.csv to public directory')
  } else {
    console.warn(`player_picker.csv not found in ${sourcePath}`)
  }
}

// Generate data for 24/25 season (last season with actual data)
buildPlayerDataFromSource("data/24_25/club", "24_25")
buildTeamDataFromSource("data/24_25/club", "24_25")

// Generate data for 25/26 season (current season with zero data)
buildPlayerDataFromSource("data/24_25/25_26", "25_26")
buildTeamDataFromSource("data/24_25/25_26", "25_26")

// Copy player picker file for team builder
copyPlayerPickerFile("data/24_25/25_26")

fs.writeFileSync(getPath(`public/last_updated.json`), JSON.stringify({ lastUpdated: new Date().toISOString() }))
