import Papa from "papaparse"

const getData = (path) => {
  return new Promise((resolve, reject) => {
    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.text()
      })
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            resolve(results.data)
          },
          error: (error) => {
            reject(error)
          },
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getPlayers = (source) => {
  return getData(`/data/${source}/players.csv`)
}

export const getTeams = (source) => {
  return getData(`/data/${source}/teams.csv`)
}

export const getGames = async () => {
  const files = await getData("/manifest.csv")
  const gamesPromises = files.map((file) => {
    return getData(`/data/games/${file.file_name}`)
  })

  const games = await Promise.all(gamesPromises)

  return games
}

export const aggregateGamesOnPlayer = (data) => {
  const agg = data.reduce((acc, week) => {
    week.forEach((player) => {
      if (!acc[player.player]) {
        acc[player.player] = { wins: 0, losses: 0, draws: 0 }
      }
      for (const key in player) {
        if (key === "result") {
          if (player[key] === "w") {
            acc[player.player].wins += 1
          } else if (player[key] === "l") {
            acc[player.player].losses += 1
          } else {
            acc[player.player].draws += 1
          }
        } else if (key !== "player") {
          if (acc[player.player][key]) {
            acc[player.player][key] += parseFloat(player[key])
          } else {
            acc[player.player][key] = parseFloat(player[key])
          }
        }
      }
    })
    return acc
  }, {})
  return Object.keys(agg).map((player) => {
    return { player, ...agg[player] }
  })
}

export const filterDataByPlayerNames = (data, playerNames) => {
  return data.filter(player => playerNames.includes(player.player))
}

export const calculatePointsForTeams = (teams, players) => {
  const points = []
  const keys = Object.keys(teams[0]).filter(key => key !== "owner")
  teams.forEach(team => {
    points.push({
      owner: team.owner,
      points: keys.reduce((acc, key) => {
        const points = players.find(player => player.player === team[key])?.points || 0
        return acc + points
      }, 0)
    })
  })
  return points
}