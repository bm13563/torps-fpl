const fs = require("fs")
const path = require("path")
const papaparse = require("papaparse")

const PLAYERS_BASE = {
  "Position": "",
  "Team": "",
  "Price": "",
  "Player": "",
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
  "Games": 0,
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
  let data = []
  
  // Check if player_scores.csv exists (for 24/25 season)
  const scoresPath = getPath(`${sourcePath}/player_scores.csv`)
  if (fs.existsSync(scoresPath)) {
    const snapshot = fs.readFileSync(scoresPath, "utf8")
    const snapshotParsed = papaparse.parse(snapshot, { header: false, delimiter: "," })

    const transposed = transpose(snapshotParsed.data)
    const headers = transposed.shift();
    transposed.forEach(row => {
      const player = {}
      for (let i = 0; i < headers.length; i++) {
        if (row[i] !== undefined) {
          player[headers[i]] = row[i]
        }
      }
      player.Games = parseInt(player.Wins) + parseInt(player.Draws) + parseInt(player.Losses)
      data.push({...PLAYERS_BASE, ...player})
    })
  }

  data.sort((a, b) => {
    if (a['Points'] === b['Points']) {
      return a.Player.localeCompare(b.Player)
    }
    return b['Points'] - a['Points']
  })

  fs.writeFileSync(getPath(`public/${outputName}_render_players.json`), JSON.stringify(data))
}

const buildTeamDataFromSource = (sourcePath, outputName) => {

  let data = []
  
  // Check if team_scores.csv exists (for 24/25 season)
  const scoresPath = getPath(`${sourcePath}/team_scores.csv`)
  if (fs.existsSync(scoresPath)) {
    const snapshot = fs.readFileSync(scoresPath, "utf8")
    const snapshotParsed = papaparse.parse(snapshot, { header: true, delimiter: "," })
    snapshotParsed.data.forEach(team => {
      if (team['Team Name'] === '') {
        return
      }
      team = {
        name: team['Team Name'],
        owner: team['Team Owner'],
        'Total Points': team['Total Points'],
        'GW Points': team['Last GW Points'],
      }
      data.push({...TEAMS_BASE, ...team})
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
    const parsed = papaparse.parse(playerPickerData, { header: false, delimiter: "," })
    const tsvData = parsed.data.map(row => row.join("\t")).join("\n")
    fs.writeFileSync(getPath(`public/player_picker.csv`), tsvData)
  } else {
    console.warn(`player_picker.csv not found in ${sourcePath}`)
  }
}

// Generate data for 24/25 season (completed season)
buildPlayerDataFromSource("data/24_25", "24_25")
buildTeamDataFromSource("data/24_25", "24_25")

// Generate data for 25/26 season (current season)
buildPlayerDataFromSource("data/25_26", "25_26")
buildTeamDataFromSource("data/25_26", "25_26")

// Copy player picker file for team builder
copyPlayerPickerFile("data/25_26")

fs.writeFileSync(getPath(`public/last_updated.json`), JSON.stringify({ lastUpdated: new Date().toISOString() }))
