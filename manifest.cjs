const fs = require("fs")
const path = require("path")
const papaparse = require("papaparse")

const BASE = {
  games: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  points: 0,
  currentPoints: 0,
  minutes_played: 0,
  motm_votes: 0,
  goals: 0,
  assists: 0,
  clean_sheet: 0,
  yellow_card: 0,
  red_card: 0,
  own_goal: 0,
  penalty_save: 0,
  result: "-",
  points: 0,
}

const aggregateGamesOnPlayer = (games) => {
  const aggregated = {}
  games.forEach((game) => {
    if (!aggregated[game.player]) {
      aggregated[game.player] = { games: 0, wins: 0, losses: 0, draws: 0, currentPoints: 0 }
    }
    for (const key in game) {
      if (key === "result") {
        aggregated[game.player].games += 1
        if (game[key] === "w") {
          aggregated[game.player].wins += 1
        } else if (game[key] === "l") {
          aggregated[game.player].losses += 1
        } else {
          aggregated[game.player].draws += 1
        }
      } else if (key !== "player") {
        if (aggregated[game.player][key]) {
          aggregated[game.player][key] += parseFloat(game[key])
        } else {
          aggregated[game.player][key] = parseFloat(game[key])
        }
      }
    }
    aggregated[game.player].currentPoints = parseFloat(game.points)
  })
  return Object.keys(aggregated).map((player) => {
    return { player, ...aggregated[player] }
  })
}

// uses the team data to calculate the points for each team
// owner + 11 players + captain (so player is counted twice, points automatically doubled)
const calculatePointsForTeamsClub = (teams, players) => {
  const points = []
  const keys = Object.keys(teams[0])
  teams.forEach((team) => {
    points.push({
      name: team.name,
      owner: team.owner,
      points: keys.reduce((acc, key) => {
        const points = players.find((player) => player.player === team[key])?.points || 0
        return acc + points
      }, 0),
      currentPoints: keys.reduce((acc, key) => {
        const currentPoints = players.find((player) => player.player === team[key])?.currentPoints || 0
        return acc + currentPoints
      }, 0),
    })
  })
  return points
}

// same as above but don't include owner
const calculatePointsForTeamsFirsts = (teams, players) => {
  const points = []
  const keys = Object.keys(teams[0]).filter((key) => key !== "owner")
  teams.forEach((team) => {
    points.push({
      name: team.name,
      owner: team.owner,
      points: keys.reduce((acc, key) => {
        const points = players.find((player) => player.player === team[key])?.points || 0
        return acc + points
      }, 0),
      currentPoints: keys.reduce((acc, key) => {
        const currentPoints = players.find((player) => player.player === team[key])?.currentPoints || 0
        return acc + currentPoints
      }, 0),
    })
  })
  return points
}

const filterGameDataByPlayers = (gameData, players) => {
  const collected = []
  players.forEach((player) => {
    const found = gameData.find((game) => game.player === player.player)
    if (found) {
      collected.push({ ...found, position: player.position })
    } else {
      collected.push({ ...BASE, player: player.player, position: player.position })
    }
  })
  return collected
}

const getPath = (relativePath) => {
  return path.join(__dirname, relativePath)
}

const buildCachedDataFromSource = (source, pointsFn) => {
  const playersCsv = fs.readFileSync(getPath(`data/${source}/players.csv`), "utf8")
  const playersParsed = papaparse.parse(playersCsv, { header: true })
  const players = playersParsed.data

  const teamsCsv = fs.readFileSync(getPath(`data/${source}/teams.csv`), "utf8")
  const teamsParsed = papaparse.parse(teamsCsv, { header: true })
  const teams = teamsParsed.data

  const gameFiles = fs.readdirSync(getPath("data/games"))

  const games = []
  gameFiles.forEach((file) => {
    if (!file.includes(".csv")) {
      return
    }

    const gamesCsv = fs.readFileSync(path.join(getPath("data/games"), file), "utf8")
    const gamesParsed = papaparse.parse(gamesCsv, { header: true })
    const gamesAugmented = gamesParsed.data.map((game) => {
      return {
        ...game,
        date: file.replace(".csv", ""),
      }
    })
    games.push(...gamesAugmented)
  })

  const aggregatedGames = aggregateGamesOnPlayer(games)
  const aggregatedPlayers = filterGameDataByPlayers(aggregatedGames, players)
  aggregatedPlayers.sort((a, b) => b.points - a.points)
  aggregatedPlayers.sort((a, b) => {
    if (a.points === b.points) {
      return a.player.localeCompare(b.player)
    }
    return b.points - a.points
  })

  const summedTeams = pointsFn(teams, aggregatedPlayers)
  summedTeams.sort((a, b) => {
    if (a.points === b.points) {
      return a.owner.localeCompare(b.owner)
    }
    return b.points - a.points
  })

  fs.writeFileSync(getPath(`public/${source}_render_players.json`), JSON.stringify(aggregatedPlayers))
  fs.writeFileSync(getPath(`public/${source}_render_teams.json`), JSON.stringify(summedTeams))
  fs.writeFileSync(getPath(`public/last_updated.json`), JSON.stringify({ lastUpdated: new Date().toISOString() }))

  console.log("built data for", source)
}

buildCachedDataFromSource("firsts", calculatePointsForTeamsFirsts)
buildCachedDataFromSource("club", calculatePointsForTeamsClub)
