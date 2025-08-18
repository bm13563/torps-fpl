<template>
  <div class="stats-container">
    <div class="stats-header">
      <h2>Player Statistics - 24/25 Season</h2>
      <p>Use these stats to help pick your team for 25/26</p>
    </div>

    <div class="filters">
      <div class="filter-group">
        <label>Filter by Position:</label>
        <Select 
          v-model="selectedPosition" 
          :options="positions" 
          placeholder="All Positions"
          :clearable="true"
        />
      </div>
      <div class="filter-group">
        <label>Filter by Team:</label>
        <Select 
          v-model="selectedTeam" 
          :options="teams" 
          placeholder="All Teams"
          :clearable="true"
        />
      </div>
      <div class="filter-group">
        <label>Sort by:</label>
        <Select 
          v-model="sortBy" 
          :options="sortOptions" 
          placeholder="Total Points"
        />
      </div>
    </div>

    <div class="stats-table-container">
      <Table 
        :data="filteredPlayers" 
        :columns="PLAYER_COLUMNS"
        :tableHeight="tableHeight"
        :display="true"
        :sortable="true"
      />
    </div>

    <div class="stats-legend">
      <h3>Legend</h3>
      <div class="legend-items">
        <span class="legend-item">PPG = Points Per Game</span>
        <span class="legend-item">MOTM = Man of the Match votes</span>
        <span class="legend-item">CS = Clean Sheets</span>
        <span class="legend-item">YC = Yellow Cards</span>
        <span class="legend-item">RC = Red Cards</span>
        <span class="legend-item">⚠️ = Poor availability in first half</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Table from '../Table.vue'
import Select from 'primevue/select'

const props = defineProps(['players'])

const selectedPosition = ref(null)
const selectedTeam = ref(null)
const sortBy = ref('totalPoints')
const tableHeight = ref(500)

const positions = ['GK', 'DEF', 'MID', 'FOR']
const teams = ['1', '2', '3', '4', 'NEW']
const sortOptions = [
  { label: 'Total Points', value: 'totalPoints' },
  { label: 'Points Per Game', value: 'pointsPerGame' },
  { label: 'Price', value: 'price' },
  { label: 'Goals', value: 'goals' },
  { label: 'Assists', value: 'assists' },
  { label: 'MOTM Votes', value: 'motmVotes' }
]

// Column definitions matching the main page structure
const PLAYER_COLUMNS = [
  {
    field: "playerName",
    header: "Player",
    default: true,
  },
  {
    field: "position",
    header: "Position",
    default: true,
  },
  {
    field: "team",
    header: "Team",
    default: true,
  },
  {
    field: "price",
    header: "Price",
    default: true,
  },
  {
    field: "totalPoints",
    header: "Total Pts",
    default: true,
  },
  {
    field: "pointsPerGame",
    header: "PPG",
    default: true,
  },
  {
    field: "gamesPlayed",
    header: "Games",
    default: false,
  },
  {
    field: "goals",
    header: "Goals",
    default: false,
  },
  {
    field: "assists",
    header: "Assists",
    default: false,
  },
  {
    field: "motmVotes",
    header: "MOTM",
    default: false,
  },
  {
    field: "cleanSheets",
    header: "CS",
    default: false,
  },
  {
    field: "yellowCards",
    header: "YC",
    default: false,
  },
  {
    field: "redCards",
    header: "RC",
    default: false,
  },
]

const filteredPlayers = computed(() => {
  let filtered = [...props.players]

  if (selectedPosition.value) {
    filtered = filtered.filter(p => p.position === selectedPosition.value)
  }

  if (selectedTeam.value) {
    filtered = filtered.filter(p => p.team === selectedTeam.value)
  }

  // Sort by selected field
  filtered.sort((a, b) => {
    const aVal = parseFloat(a[sortBy.value]?.toString().replace('£', '') || '0')
    const bVal = parseFloat(b[sortBy.value]?.toString().replace('£', '') || '0')
    
    if (sortBy.value === 'price') {
      return aVal - bVal // Ascending for price
    }
    return bVal - aVal // Descending for stats
  })

  // Transform data to match expected format and add visual indicators
  return filtered.map(player => ({
    ...player,
    playerName: player.playerName + (player.playerName.includes('?') ? ' ⚠️' : ''),
    position: player.position,
    team: player.team,
    price: player.price,
    totalPoints: player.totalPoints || '0',
    pointsPerGame: player.pointsPerGame || '0.0',
    gamesPlayed: player.gamesPlayed || '0',
    goals: player.goals || '0',
    assists: player.assists || '0',
    motmVotes: player.motmVotes || '0',
    cleanSheets: player.cleanSheets || '0',
    yellowCards: player.yellowCards || '0',
    redCards: player.redCards || '0'
  }))
})

onMounted(() => {
  // Set table height similar to main page
  const getTableHeight = () => {
    const windowHeight = window.innerHeight
    return Math.max(400, windowHeight - 400) // Leave space for header and filters
  }
  
  tableHeight.value = getTableHeight()
  
  // Update on resize
  window.addEventListener('resize', () => {
    tableHeight.value = getTableHeight()
  })
})
</script>

<style scoped>
.stats-container {
  padding: 1rem;
}

.stats-header {
  text-align: center;
  margin-bottom: 2rem;
}

.stats-header h2 {
  margin: 0 0 0.5rem 0;
  color: var(--p-text-color);
}

.stats-header p {
  color: var(--p-text-muted-color);
  margin: 0;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
}

.filter-group label {
  font-size: 0.9rem;
  color: var(--p-text-color);
  font-weight: 500;
}

.stats-table-container {
  margin-bottom: 1.5rem;
}

.stats-legend {
  background: var(--p-surface-50);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--p-surface-200);
}

.stats-legend h3 {
  margin: 0 0 1rem 0;
  color: var(--p-text-color);
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.legend-item {
  font-size: 0.9rem;
  color: var(--p-text-muted-color);
  background: var(--p-content-background);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid var(--p-surface-200);
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }
  
  .filter-group {
    min-width: auto;
  }
  
  .legend-items {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style> 