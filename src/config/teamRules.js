// Team Builder Rules Configuration
// This file defines the rules for building a fantasy team
// Modify these values to change the team building constraints

export const TEAM_RULES = {
  // Budget
  maxBudget: 100,
  
  // Team composition
  totalPlayers: 11,
  
  // Formation constraints
  defenders: { min: 3, max: 5 },
  midfielders: { min: 3, max: 5 },
  attackers: { min: 1, max: 3 },
  
  // Team distribution
  minPlayersFromEachTeam: 1, // Must have at least 1 from each team
  maxPlayersFromSingleTeam: 5, // Can't have more than 5 from one team
  totalTeamsInLeague: 4, // Total number of teams to pick from
  
  // New player requirement
  requireNewPlayer: false, // Set to true to require at least 1 new player
  minNewPlayers: 0, // Minimum number of new players required (only enforced if requireNewPlayer is true)
  
  // Captain and 12th man
  captainMultiplier: 2, // Captain gets 2x points
}

// Generate display text for rules based on config
export const getRulesText = () => {
  const rules = TEAM_RULES
  
  return {
    teamSelection: [
      `Pick ${rules.totalPlayers} players from a £${rules.maxBudget} budget`,
      ...(rules.requireNewPlayer ? [`At least ${rules.minNewPlayers} NEW player${rules.minNewPlayers > 1 ? 's' : ''} required`] : []),
      `At least ${rules.minPlayersFromEachTeam} player from each team (1, 2, 3, 4)`,
      `No more than ${rules.maxPlayersFromSingleTeam} players from a single team`,
      'You cannot pick yourself'
    ],
    captainAndTwelfthMan: [
      `Pick a captain who scores ${rules.captainMultiplier}x points`,
      'Cannot captain yourself/12th man',
      'You are your team\'s 12th man (free)',
      'If not playing, pick a NEW player as 12th man'
    ]
  }
}

