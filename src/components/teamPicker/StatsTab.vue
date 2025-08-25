<template>
  <div class="container">
    <div class="actions">
      <Select 
        v-model="selectedPosition" 
        :options="positions" 
        :allowEmpty="false"
      />
      <Select 
        v-model="selectedTeam" 
        :options="teams" 
        :allowEmpty="false"
      />
      <div class="show-extended">
        <p>All data</p>
        <ToggleSwitch v-model="isExtended"/>
      </div>
    </div>

    <template v-if="!loading">
      <Table
        v-if="shouldMount(isExtended, 'playersExtended')"
        :key="`extended-${selectedPosition}-${selectedTeam}-${filteredPlayers.length}`"
        :data="filteredPlayers"
        :columns="PLAYER_COLUMNS"
        :tableHeight="tableHeight"
        :display="isExtended"
        :sortable="true"
      />
      <Table
        v-if="shouldMount(!isExtended, 'playersDefault')"
        :key="`default-${selectedPosition}-${selectedTeam}-${filteredPlayers.length}`"
        :data="filteredPlayers"
        :columns="DEFAULT_PLAYER_COLUMNS"
        :tableHeight="tableHeight"
        :display="!isExtended"
        :sortable="false"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Table from '../Table.vue'
import Select from 'primevue/select'
import ToggleSwitch from 'primevue/toggleswitch'

const props = defineProps(['players'])
const route = useRoute()
const router = useRouter()

// Fix 1: Use simple arrays like Main.vue for proper "All" display
const positions = ['All', 'GK', 'DEF', 'MID', 'FOR']
const teams = ['All', '1', '2', '3', '4', 'New']

// Initialize from URL query parameters or defaults
const selectedPosition = ref(route.query.position || positions[0])
const selectedTeam = ref(route.query.team || teams[0]) 
const isExtended = ref(route.query.extended === 'true' || false)
const loading = ref(false)

// Fix 2: Make tableHeight reactive
const tableHeight = ref(400) // Start with reasonable default
let mounted = []
let resizeObserver = null

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
    default: false,
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

const DEFAULT_PLAYER_COLUMNS = PLAYER_COLUMNS.filter((column) => column.default)

const shouldMount = (condition, identifier) => {
  if (condition || mounted.includes(identifier)) {
    if (!mounted.includes(identifier)) {
      mounted.push(identifier)
    }
    return true
  }
  return false
}

const filteredPlayers = computed(() => {
  // Fix 1: Handle "All" values properly
  const positionFilter = selectedPosition.value === 'All' ? null : selectedPosition.value
  const teamFilter = selectedTeam.value === 'All' ? null : (selectedTeam.value === 'New' ? 'NEW' : selectedTeam.value)
  
  if (!props.players || props.players.length === 0) {
    return []
  }

  let filtered = [...props.players]

  // Filter by position
  if (positionFilter) {
    filtered = filtered.filter(player => player.position === positionFilter)
  }

  // Filter by team
  if (teamFilter) {
    filtered = filtered.filter(player => player.team === teamFilter)
  }

  // Transform data to match expected format
  return filtered.map(player => ({
    ...player,
    playerName: player.playerName?.replace('?', '') || '',
    position: player.position || '',
    team: player.team || '',
    price: player.price || '£0',
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

// Fix 2: More robust height calculation
const getTableHeight = () => {
  try {
    const container = document.querySelector(".container")
    const actions = document.querySelector(".actions")
    
    if (!container || !actions) {
      return 400 // fallback
    }
    
    const containerRect = container.getBoundingClientRect()
    const actionsRect = actions.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    
    // Calculate available space from bottom of actions to bottom of viewport
    const availableHeight = viewportHeight - actionsRect.bottom - 32 // 32px padding
    
    // Ensure minimum height
    return Math.max(300, Math.min(availableHeight, 800))
  } catch (error) {
    console.warn('Error calculating table height:', error)
    return 400
  }
}

// Fix 2: Better height management with ResizeObserver
const updateTableHeight = () => {
  const newHeight = getTableHeight()
  if (newHeight !== tableHeight.value) {
    tableHeight.value = newHeight
  }
}

// Watch for filter changes and update URL
watch([selectedPosition, selectedTeam, isExtended], () => {
  const currentQuery = { ...route.query }
  
  // Update filter parameters
  if (selectedPosition.value !== positions[0]) {
    currentQuery.position = selectedPosition.value
  } else {
    delete currentQuery.position
  }
  
  if (selectedTeam.value !== teams[0]) {
    currentQuery.team = selectedTeam.value
  } else {
    delete currentQuery.team
  }
  
  if (isExtended.value) {
    currentQuery.extended = 'true'
  } else {
    delete currentQuery.extended
  }
  
  router.push({ 
    path: '/team-picker', 
    query: currentQuery
  })
})

// Also watch for changes in the filtered data length
watch(() => filteredPlayers.value.length, async () => {
  await nextTick()
  setTimeout(() => {
    updateTableHeight()
  }, 50)
})

onMounted(async () => {
  // Wait for DOM to be fully ready
  await nextTick()
  
  // Initial height calculation
  setTimeout(() => {
    updateTableHeight()
  }, 100) // Small delay to ensure DOM is settled
  
  // Use ResizeObserver for better height tracking
  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      updateTableHeight()
    })
    
    const container = document.querySelector(".container")
    if (container) {
      resizeObserver.observe(container)
    }
  }
  
  // Fallback to resize listener
  window.addEventListener('resize', updateTableHeight)
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  window.removeEventListener('resize', updateTableHeight)
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
}

.actions {
  display: flex;
  width: 100%;
  height: 2.5rem;
  margin-left: 3rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 12px;
  }
}

.show-extended {
  display: flex;
  gap: 1rem;
  align-items: center;
}

::v-deep .p-disabled.p-select {
  border-color: var(--p-select-disabled-background);
}

::v-deep .p-disabled .p-select-dropdown-icon {
  color: var(--p-select-disabled-color);
}

::v-deep .p-select-label {
  padding: 0.25rem;
  padding-left: 0.5rem;
}
</style> 