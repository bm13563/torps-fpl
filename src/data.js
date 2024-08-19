const getData = (path) => {
  path = import.meta.env.VITE_FILE_ROOT + path;
  return new Promise((resolve, reject) => {
    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        resolve(jsonData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export const getPlayers = (source) => {
  return getData(`${source}_render_players.json`);
};

export const getTeams = (source) => {
  return getData(`${source}_render_teams.json`);
};

export const getLastUpdated = () => {
  return getData("last_updated.json")
}
