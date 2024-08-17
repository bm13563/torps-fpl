import Papa from "papaparse";

const getData = (path) => {
  path = import.meta.env.VITE_FILE_ROOT + path;
  return new Promise((resolve, reject) => {
    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            resolve(results.data);
          },
          error: (error) => {
            reject(error);
          },
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPlayers = (source) => {
  return getData(`data/${source}/players.csv`);
};

export const getTeams = (source) => {
  return getData(`data/${source}/teams.csv`);
};

export const getGames = async () => {
  return await getData("cache/cache.csv");
};

export const aggregateGamesOnPlayer = (games) => {
  const aggregated = {};
  games.forEach((game) => {
    if (!aggregated[game.player]) {
      aggregated[game.player] = { games: 0, wins: 0, losses: 0, draws: 0 };
    }
    for (const key in game) {
      if (key === "result") {
        aggregated[game.player].games += 1;
        if (game[key] === "w") {
          aggregated[game.player].wins += 1;
        } else if (game[key] === "l") {
          aggregated[game.player].losses += 1;
        } else {
          aggregated[game.player].draws += 1;
        }
      } else if (key !== "player") {
        if (aggregated[game.player][key]) {
          aggregated[game.player][key] += parseFloat(game[key]);
        } else {
          aggregated[game.player][key] = parseFloat(game[key]);
        }
      }
    }
  });
  return Object.keys(aggregated).map((player) => {
    return { player, ...aggregated[player] };
  });
};

export const filterDataByPlayerNames = (data, playerNames) => {
  return data.filter((player) => playerNames.includes(player.player));
};

export const calculatePointsForTeams = (teams, players) => {
  const points = [];
  const keys = Object.keys(teams[0]).filter((key) => key !== "owner");
  teams.forEach((team) => {
    points.push({
      owner: team.owner,
      points: keys.reduce((acc, key) => {
        const points =
          players.find((player) => player.player === team[key])?.points || 0;
        return acc + points;
      }, 0),
    });
  });
  return points;
};
