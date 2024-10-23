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
  "Points": 0,
  "Total Points": 0,
}

const getPath = (relativePath) => {
  return path.join(__dirname, relativePath)
}

const buildPlayerDataFromSource = (source) => {
  const playersCsv = fs.readFileSync(getPath(`data/${source}/players.csv`), "utf8")
  const playersParsed = papaparse.parse(playersCsv, { header: true })

  const snapshot = fs.readFileSync(getPath(`data/${source}/player_scores.csv`), "utf8")
  const snapshotParsed = papaparse.parse(snapshot, { header: true })

  const data = []
  playersParsed.data.forEach((player) => {
    const found = snapshotParsed.data.find((snap) => snap.Player === player.player)
    console.log(found)
    if (found) {
      data.push({ ...player, ...PLAYERS_BASE, ...found, games: parseInt(found.Wins) + parseInt(found.Losses) + parseInt(found.Draws) })
    } else {
      data.push({ ...player, ...PLAYERS_BASE })
    }
  })

  data.sort((a, b) => {
    if (a['Points'] === b['Points']) {
      return a.Player.localeCompare(b.Player)
    }
    return b['Points'] - a['Points']
  })

  fs.writeFileSync(getPath(`public/${source}_render_players.json`), JSON.stringify(data))
}

const buildTeamDataFromSource = (source) => {
  const teamsCsv = fs.readFileSync(getPath(`data/${source}/teams.csv`), "utf8")
  const teamsParsed = papaparse.parse(teamsCsv, { header: true })

  const snapshot = fs.readFileSync(getPath(`data/${source}/team_scores.csv`), "utf8")
  const snapshotParsed = papaparse.parse(snapshot, { header: true })

  const data = []
  teamsParsed.data.forEach((team) => {
    const found = snapshotParsed.data.find((snap) => snap['Team Owner'] === team.owner)
    if (found) {
      data.push({ ...team, ...found })
    } else {
      data.push({ ...team, ...TEAMS_BASE })
    }
  })

  data.sort((a, b) => {
    if (a['Total Points'] === b['Total Points']) {
      return a.owner.localeCompare(b['Team Owner'])
    }
    return b['Total Points'] - a['Total Points']
  })

  data.forEach((team, index) => {
    team.rank = index + 1
  })

  fs.writeFileSync(getPath(`public/${source}_render_teams.json`), JSON.stringify(data))
}

buildPlayerDataFromSource("club")
buildPlayerDataFromSource("firsts")
buildTeamDataFromSource("club")
buildTeamDataFromSource("firsts")
fs.writeFileSync(getPath(`public/last_updated.json`), JSON.stringify({ lastUpdated: new Date().toISOString() }))
