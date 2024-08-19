const fs = require("fs")
const path = require("path")
const papaparse = require("papaparse")

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

const calculatePointsForTeams = (teams, players) => {
  const points = []
  const keys = Object.keys(teams[0]).filter((key) => key !== "owner")
  teams.forEach((team) => {
    points.push({
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

const filterDataByPlayerNames = (data, playerNames) => {
  return data.filter((player) => playerNames.includes(player.player))
}

const getPath = (relativePath) => {
  return path.join(__dirname, relativePath)
}

const buildCachedDataFromSource = (source) => {
  const playersCsv = fs.readFileSync(getPath(`data/${source}/players.csv`), "utf8")
  const playersParsed = papaparse.parse(playersCsv, { header: true })
  const players = playersParsed.data

  const teamsCsv = fs.readFileSync(getPath(`data/${source}/teams.csv`), "utf8")
  const teamsParsed = papaparse.parse(teamsCsv, { header: true })
  const teams = teamsParsed.data

  const gameFiles = fs.readdirSync(getPath("data/games"))

  const games = []
  gameFiles.forEach((file) => {
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
  const playerNames = players.map((player) => player.player)
  const aggregatedPlayers = filterDataByPlayerNames(aggregatedGames, playerNames)
  aggregatedPlayers.sort((a, b) => b.points - a.points)

  const summedTeams = calculatePointsForTeams(teams, aggregatedPlayers)
  summedTeams.sort((a, b) => b.points - a.points)

  
  fs.writeFileSync(getPath(`public/${source}_render_players.json`), JSON.stringify(aggregatedPlayers));
  fs.writeFileSync(getPath(`public/${source}_render_teams.json`), JSON.stringify(summedTeams));

  console.log("built date for", source)
}

buildCachedDataFromSource("firsts")
